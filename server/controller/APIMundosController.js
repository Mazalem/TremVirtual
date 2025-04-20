const API = require("../model/APIMundosModel");
const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const APIModel = require("../model/APIMundosModel");
const PROJECTS_DIR = path.join(__dirname, "..", "projects");
require('dotenv').config();

if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR);
}

function getAvailablePort(startPort, callback) {
    const net = require("net");
    const server = net.createServer();
    server.unref();
    server.on("error", () => getAvailablePort(startPort + 1, callback));
    server.listen(startPort, () => {
        const port = server.address().port;
        server.close(() => callback(port));
    });
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
    const zipPath = req.file.path;
    const projectName = "project_" + nome.replace(/\s+/g, '').toLowerCase() + "_" + autor.replace(/\s+/g, '').toLowerCase() + "_" + Date.now();
    const extractPath = path.join(PROJECTS_DIR, projectName);
  
    try {
      fs.mkdirSync(extractPath);
      const zip = new AdmZip(zipPath);
      zip.extractAllTo(extractPath, true);
  
      const extractedFolders = fs.readdirSync(extractPath).filter(file => fs.statSync(path.join(extractPath, file)).isDirectory());
  
      if (extractedFolders.length === 0) {
        return res.status(400).send("Nenhuma pasta encontrada dentro do ZIP.");
      }
  
      const projectFolder = extractedFolders[0];
  
      const dockerfileContent = `
        FROM node:18
        WORKDIR /app
        COPY . .
        RUN npm install -g http-server
        EXPOSE 3000
        CMD ["http-server", "./${projectFolder}", "-p", "3000"]
      `;
      fs.writeFileSync(path.join(extractPath, "Dockerfile"), dockerfileContent);
  
      getAvailablePort(3001, async (availablePort) => {
        const imageName = `image_${projectName}`;
        const containerName = `container_${projectName}`;
        const buildCmd = `docker build -t ${imageName} "${extractPath}"`;
        const runCmd = `docker run -d --name ${containerName} -p ${availablePort}:3000 ${imageName}`;
  
        exec(buildCmd, (err, stdout, stderr) => {
          if (err) {
            console.error("Erro ao criar imagem Docker:", stderr);
            return res.status(500).send("Erro ao criar o container.");
          }
  
          exec(runCmd, async (err, stdout, stderr) => {
            if (err) {
              console.error("Erro ao rodar container:", stderr);
              return res.status(500).send("Erro ao rodar o container.");
            }
  
            try {
              await API.cria({
                titulo: nome,
                autor,
                descricao,
                src: process.env.SERVIDOR+`${availablePort}/`,
                imagem: process.env.SERVIDOR+`${availablePort}/thumbnail.png`,
                likes: 0,
                reproducoes: 0,
                versao: "1.0",
                lancamento: obterDataAtualFormatada()
              });
  
              fs.unlinkSync(zipPath);
  
              res.status(200).json({ mensagem: "Mundo criado com sucesso!" });
            } catch (apiError) {
              console.error("Erro ao salvar no banco:", apiError);
              res.status(500).send("Erro ao salvar no banco.");
            }
          });
        });
      });
    } catch (error) {
      res.status(500).send("Erro ao processar o arquivo: " + error.message);
    }
  };
  

exports.index = async function name(req, res) {
    var mundos = await APIModel.lista();
    res.json(mundos);
}

exports.show = async function name(req, res) {
    var mundo = await APIModel.consulta(req.params._id);
    res.json(mundo);
}
