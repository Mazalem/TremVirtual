const API = require("../model/APIMundosModel");
const APIModel = require("../model/APIMundosModel");
const AdmZip = require("adm-zip");
const path = require("path");
const fs = require("fs");
const Users = require("../model/APIUsersModel");
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

    const projectName = "project_" + responsavelId + "_" + Date.now();
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

exports.edita = async function (req, res) {
  try {
    const id = req.params.id;
    const mundo = await API.consulta(id);

    if (!mundo) {
      return res.status(404).send("Mundo não encontrado.");
    }

    const nome = req.body.nome;
    const autor = req.body.autor;
    const descricao = req.body.descricao;
    const responsavelId = req.body.responsavelId;
    const visibilidade = req.body.visibilidade;

    let src = mundo.src;
    let imagem = mundo.imagem;

    if (req.file) {
      const zipPath = req.file.path;

      if (mundo.src) {
        const pastaAntiga = path.join(
          __dirname,
          "..",
          "public",
          "projects",
          path.basename(path.dirname(mundo.src))
        );
        if (fs.existsSync(pastaAntiga)) {
          fs.rmSync(pastaAntiga, { recursive: true, force: true });
        }
      }

      const projectName = "project_" + responsavelId + "_" + Date.now();
      const extractPath = path.join(
        __dirname,
        "..",
        "public",
        "projects",
        projectName
      );

      fs.mkdirSync(extractPath, { recursive: true });
      const zip = new AdmZip(zipPath);
      zip.extractAllTo(extractPath, true);

      const extractedFolders = fs
        .readdirSync(extractPath)
        .filter((file) =>
          fs.statSync(path.join(extractPath, file)).isDirectory()
        );

      if (extractedFolders.length === 0) {
        return res.status(400).send("Nenhuma pasta encontrada dentro do ZIP.");
      }

      const projectFolder = extractedFolders[0];
      src = `${process.env.SERVIDOR}/projects/${projectName}/${projectFolder}/`;
      imagem = `${process.env.SERVIDOR}/projects/${projectName}/${projectFolder}/thumbnail.png`;

      fs.unlinkSync(zipPath);
    }

    await API.edita(id, {
      titulo: nome,
      autor,
      responsavelId,
      visibilidade,
      descricao,
      src,
      imagem,
      versao: (parseFloat(mundo.versao) + 0.1).toFixed(1),
      lancamento: obterDataAtualFormatada(),
    });

    res.status(200).json({ mensagem: "Mundo editado com sucesso!" });
  } catch (error) {
    res.status(500).send("Erro ao editar mundo: " + error.message);
  }
};

exports.exclui = async function (req, res) {
  const cookie = req.session.usuario;

  try {
    const id = req.params.id;
    const mundo = await API.consulta(id);
    
    if (!mundo) {
      return res.status(404).send("Mundo não encontrado.");
    }

    if (String(cookie.id) !== String(mundo.responsavelId)) {
      return res.status(401).json({ mensagem: "Não autorizado!" });
    }

    if (mundo.src) {
      const pasta = path.join(
        __dirname,
        "..",
        "public",
        "projects",
        path.basename(path.dirname(mundo.src))
      );
      if (fs.existsSync(pasta)) {
        fs.rmSync(pasta, { recursive: true, force: true });
      }
    }

    await API.deleta(id);
    res.status(200).json({ mensagem: "Mundo excluído com sucesso!" });
  } catch (error) {
    res.status(500).send("Erro ao excluir mundo: " + error.message);
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
  const { tipo, id } = req.params
  const q = req.query.q || ""
  try {
    let mundos = []
    if (tipo === "criados") {
      mundos = await APIModel.mundosPorUsuario(id)
    } else if (tipo === "favoritos") {
      mundos = await APIModel.mundosFavoritos(id)
    } else if (tipo === "turma") {
      const aluno = await Users.consulta(id)
      if (!aluno || aluno.tipo !== "Aluno" || !aluno.professorId) {
        return res.json({ mundos: [] })
      }
      mundos = await APIModel.mundosDoUsuarioCompleto(aluno.professorId)
    } else if (tipo === "todos") {
      mundos = await APIModel.buscarPublicos()
    }
    if (tipo === "todos") {
      res.json({ mundos, q })
    } else {
      res.json({ mundos })
    }
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar mundos" })
  }
}

exports.toggleLike = async function (req, res) {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: "userId é obrigatório" });

  try {
    const resultado = await API.toggleLike(id, userId);
    res.json(resultado);
  } catch (error) {
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
    res.status(500).json({ error: "Erro ao verificar curtida" });
  }
};

exports.consultaResponsavel = async function (req, res) {
  try {
    const mundo = await APIModel.consulta(req.params.id);
    if (!mundo) {
      return res.json({ responsavelId: null });
    }
    return res.json({ responsavelId: mundo.responsavelId || null });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao consultar responsável" });
  }
};
