const API = require("../model/APIMundosModel");
const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs");
const APIModel = require("../model/APIMundosModel");
require('dotenv').config();

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

function obterDataAtualFormatada() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

exports.cria = async function (req, res) {
    if (!req.file) {
        return res.status(400).send("Nenhum arquivo enviado.");
    }

    var nome = req.body.nome;
    var autor = req.body.autor;
    var descricao = req.body.descricao;
    var responsavelId = req.body.responsavelId;
    const zipPath = req.file.path;

    const projectName = "project_" + nome.replace(/\s+/g, '').toLowerCase() + "_" + autor.replace(/\s+/g, '').toLowerCase() + "_" + Date.now();
    const extractPath = path.join(__dirname, "..", "public", "projects", projectName);

    try {
        fs.mkdirSync(extractPath, { recursive: true });
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        const extractedFolders = fs.readdirSync(extractPath).filter(file => fs.statSync(path.join(extractPath, file)).isDirectory());

        if (extractedFolders.length === 0) {
            return res.status(400).send("Nenhuma pasta encontrada dentro do ZIP.");
        }

        const projectFolder = extractedFolders[0];

        await API.cria({
            titulo: nome,
            autor,
            responsavelId,
            descricao,
            src: `${process.env.SERVIDOR}/projects/${projectName}/${projectFolder}/`,
            imagem: `${process.env.SERVIDOR}/projects/${projectName}/${projectFolder}/thumbnail.png`,
            likes: 0,
            reproducoes: 0,
            versao: "1.0",
            lancamento: obterDataAtualFormatada()
        });

        fs.unlinkSync(zipPath);

        res.status(200).json({ mensagem: "Mundo criado com sucesso!" });
    } catch (error) {
        res.status(500).send("Erro ao processar o arquivo: " + error.message);
    }
};

exports.index = async function (req, res) {
    var mundos = await APIModel.lista();
    res.json(mundos);
};

exports.show = async function (req, res) {
    var mundo = await APIModel.consulta(req.params._id);
    res.json(mundo);
};

exports.getMundos = async function (req, res) {
    var mundos = await APIModel.getMundos(req.params._id);
    res.json(mundos);
};
