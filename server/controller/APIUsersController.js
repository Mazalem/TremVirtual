const API = require("../model/APIUsersModel");

exports.cria = async function (req, res) {
    try {
        var email = req.body.email;
        var liberado = await API.liberado(email);

        if (liberado) {
            var nome = req.body.nome;
            var senha = req.body.senha;
            var tipo = req.body.tipo;

            nome = nome
                .toLowerCase()
                .split(' ')
                .filter(p => p.trim() !== '')
                .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                .join(' ');

            await API.cria({
                nome: nome,
                email: email,
                senha: senha,
                tipo: tipo,
                likedMundos: [],
                alunosId: tipo === "Professor" ? [] : null,
                professorId: null
            });

            res.status(200).json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
        } else {
            res.status(500).json({ sucesso: false, mensagem: "E-mail já cadastrado!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ sucesso: false, mensagem: "Erro ao criar usuário" });
    }
};

exports.liberado = async function(req,res) {
  var email = req.params.email;
  var liberado = await API.liberado(email);
  var mensagem = "";
  if(!liberado) {
    mensagem = "E-mail já utilizado por outro usuário."
    res.json({liberado, mensagem});
  }else {
    res.json({liberado});
  }
}

exports.login = async function (req, res) {
  const { email, senha, manter } = req.body;
  const user = await API.login(email, senha);

  if (!user) {
    return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
  }

  const usuario = {
    id: user._id,
    email: user.email,
    senha: user.senha,
    nome: user.nome,
    tipo: user.tipo
  };

  req.session.usuario = usuario;

  if(manter) {
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };
    
    res.cookie('usuario', JSON.stringify(req.session.usuario), cookieOptions);  
  }

  return res.json({ sucesso: true, mensagem: 'Login feito com sucesso!' });
};

exports.logout = (req, res) => {
  if (req.session.usuario) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao deslogar' });
      }
      res.clearCookie('connect.sid');
      res.clearCookie('usuario', { path: '/' });
      res.json({ sucesso: true });
    });
  } else {
    res.clearCookie('usuario', { path: '/' });
    res.json({ sucesso: false, mensagem: 'Nenhuma sessão ativa' });
  }
};

exports.verificarLogin = (req, res) => {
  if (req.session.usuario) {
    return res.json({ logado: true, user: req.session.usuario });
  }

  const cookieUsuario = req.cookies.usuario;
  if (cookieUsuario) {
    try {
      const usuario = JSON.parse(cookieUsuario);
      const cookieMaxAge = req.cookies['usuario-max-age'];

      if (cookieMaxAge && new Date(cookieMaxAge) > new Date()) {
        req.session.usuario = usuario;
        return res.json({ logado: true, user: usuario });
      }
    } catch (e) {
      return res.json({ logado: false });
    }
  }

  res.json({ logado: false });
};

exports.autoLogin = function (req, res) {
  const cookie = req.cookies.usuario;

  if (!cookie) {
    return res.json({ sucesso: false });
  }

  try {
    const usuario = JSON.parse(cookie);
    req.session.usuario = usuario;
    return res.json({ sucesso: true });
  } catch {
    return res.json({ sucesso: false });
  }
};

exports.atualiza = async function (req, res) {
  let { nome, email, senha } = req.body;

  if (nome) {
      nome = nome
        .toLowerCase()
        .split(' ')
        .filter(p => p.trim() !== '')
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ');
    }

  const user = await API.update(req.session.usuario.id, { nome, email, senha });
  if (user) {
    req.session.usuario = {
      id: user._id,
      email: user.email,
      senha: user.senha,
      nome: user.nome,
      tipo: req.session.usuario.tipo
    };
    res.status(200).json({ success: true, mensagem: "Usuário editado com sucesso!" });
  } else {
    res.status(500).json({ success: false, mensagem: "Erro ao editar o usuário!" });
  }
};

exports.entrarTurma = async function (req, res) {
  const { idAluno, idProfessor } = req.params;

  try {
    const aluno = await API.consulta(idAluno);
    const professor = await API.consulta(idProfessor);

    if (!aluno || !professor) {
      return res.status(404).json({ sucesso: false, mensagem: "Aluno ou professor não encontrado!" });
    }

    if (aluno.tipo !== "Aluno" || professor.tipo !== "Professor") {
      return res.status(400).json({ sucesso: false, mensagem: "Tipos de usuário inválidos!" });
    }

    await API.update(idAluno, { professorId: idProfessor });
    await API.pushAluno(idProfessor, idAluno);

    res.json({ sucesso: true, mensagem: "Aluno entrou na turma com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucesso: false, mensagem: "Erro ao entrar na turma" });
  }
};

exports.sairTurma = async function (req, res) {
  const { idAluno, idProfessor } = req.params;

  try {
    const aluno = await API.consulta(idAluno);
    const professor = await API.consulta(idProfessor);

    if (!aluno || !professor) {
      return res.status(404).json({ sucesso: false, mensagem: "Aluno ou professor não encontrado!" });
    }

    if (aluno.tipo !== "Aluno" || professor.tipo !== "Professor") {
      return res.status(400).json({ sucesso: false, mensagem: "Tipos de usuário inválidos!" });
    }

    await API.update(idAluno, { professorId: null });
    await API.pullAluno(idProfessor, idAluno);

    res.json({ sucesso: true, mensagem: "Aluno saiu da turma com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucesso: false, mensagem: "Erro ao sair da turma" });
  }
};

exports.verificarTurma = async function (req, res) {
  const { idAluno } = req.params;

  try {
    const aluno = await API.consulta(idAluno);

    if (!aluno) {
      return res.status(404).json({ sucesso: false, mensagem: "Aluno não encontrado!" });
    }

    if (aluno.tipo !== "Aluno") {
      return res.status(400).json({ sucesso: false, mensagem: "Usuário não é um aluno!" });
    }

    if (aluno.professorId) {
      const professor = await API.consulta(aluno.professorId);
      return res.json({ sucesso: true, professor: professor });
    }

    return res.json({ sucesso: true, professor: null });
  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: "Erro ao verificar turma do aluno" });
  }
};


exports.listarAlunos = async function (req, res) {
  const { idProfessor } = req.params;

  try {
    const professor = await API.consulta(idProfessor);

    if (!professor) {
      return res.status(404).json({ sucesso: false, mensagem: "Professor não encontrado!" });
    }

    if (professor.tipo !== "Professor") {
      return res.status(400).json({ sucesso: false, mensagem: "Usuário não é um professor!" });
    }

    if (!professor.alunosId || professor.alunosId.length === 0) {
      return res.json({ sucesso: true, alunos: [] });
    }

    const alunos = await API.consultaVarios(professor.alunosId);
    return res.json({ sucesso: true, alunos: alunos });
  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: "Erro ao listar alunos do professor" });
  }
};

exports.retirarAluno = async function (req, res) {
  const { idAluno, idProfessor } = req.params;

  try {
    const aluno = await API.consulta(idAluno);
    const professor = await API.consulta(idProfessor);

    if (!aluno || !professor) {
      return res.status(404).json({ sucesso: false, mensagem: "Aluno ou professor não encontrado!" });
    }

    if (aluno.tipo !== "Aluno" || professor.tipo !== "Professor") {
      return res.status(400).json({ sucesso: false, mensagem: "Tipos de usuário inválidos!" });
    }

    if (aluno.professorId !== idProfessor) {
      return res.status(400).json({ sucesso: false, mensagem: "Esse aluno não pertence a esse professor!" });
    }

    await API.pullAluno(idProfessor, idAluno);
    await API.update(idAluno, { professorId: null });

    res.json({ sucesso: true, mensagem: "Aluno removido da turma com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucesso: false, mensagem: "Erro ao retirar aluno da turma" });
  }
};

  