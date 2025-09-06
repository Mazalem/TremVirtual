const API = require("../model/APIMundosModel");
const APIModel = require("../model/APIMundosModel");
const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs");
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
    var visibilidade = req.body.visibilidade;
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
            visibilidade,
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

exports.listaFiltrada = async function (req, res) {
  const { tipo, id, pag } = req.params;
  let mundos = [];

  try {
    if (tipo === "criados") {
      mundos = await APIModel.mundosPorUsuario(id);
    } else if (tipo === "favoritos") {
      mundos = await APIModel.mundosFavoritos(id);
    } else if (tipo === "todos") {
      const q = req.query.q;
      mundos = await APIModel.buscarPublicosPorTitulo(q);
    }

    const page = parseInt(pag) || 1;
    const limit = 30;
    const totalPaginas = Math.ceil(mundos.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    res.json({
      dados: mundos.slice(startIndex, endIndex),
      totalPaginas
    });
  } catch (err) {
    console.error("Erro em listaFiltrada:", err);
    res.status(500).json({ error: "Erro ao buscar mundos" });
  }
};

exports.toggleLike = async function (req, res) {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

  try {
    const resultado = await API.toggleLike(id, userId);
    res.json(resultado);
  } catch (error) {
    console.error("Erro no toggleLike:", error);
    res.status(500).json({ error: "Erro ao curtir/descurtir mundo" });
  }
};

exports.isLiked = async function (req, res) {
  const { id } = req.params;
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

  try {
    const users = require("../model/APIUsersModel");
    const usuario = await users.consulta(userId);

    const mundos = require("../model/APIMundosModel");
    const mundo = await mundos.consulta(id);

    const jaCurtiu = usuario?.likedMundos?.includes(id);

    res.json({ liked: jaCurtiu, likes: mundo.likes });
  } catch (error) {
    console.error("Erro no isLiked:", error);
    res.status(500).json({ error: "Erro ao verificar curtida" });
  }
};


