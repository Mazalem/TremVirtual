const API = require("../model/APIUsersModel");

exports.cria = async function (req, res) {
    var email = req.body.email;
    var liberado = await API.liberado(email);
    if(liberado) {
      var nome = req.body.nome;
      var senha = req.body.senha;
      var tipo = req.body.tipo;
      await API.cria({nome: nome, email: email, senha: senha, tipo: tipo});
      res.status(200).json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
    }else{
      res.status(500).json({ sucesso:false, mensagem: "E-mail já cadastrado!" });
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
  const {nome, email, senha, tipo} = req.body;
  const user = await API.update(req.session.usuario.id, {nome: nome, email: email, senha: senha, tipo: tipo});
  if(user) {
    req.session.usuario = {
      id: user._id,
      email: user.email,
      senha: user.senha,
      nome: user.nome,
      tipo: user.tipo
    };
    res.status(200).json({ success: true, mensagem: "Usuário editado com sucesso!"});
  }else {
    res.status(500).json({ success: false, mensagem: "Erro ao editar o usuário!"});
  }
}
  