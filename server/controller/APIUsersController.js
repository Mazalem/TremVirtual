const API = require("../model/APIUsersModel");

exports.cria = async function (req, res) {
    var email = req.body.email;
    var liberado = await API.liberado(email);
    if(liberado) {
      var nome = req.body.nome;
      var senha = req.body.senha;
      var tipo = req.body.tipo;
      await API.cria({nome: nome, email: email, senha: senha, tipo: tipo});
      res.status(200).json({ sucesso: true, mensagem: "Usuário criado com sucesso!" });
    }else{
      res.status(500).json({ sucesso:false, mensagem: "E-mail já cadastrado!" });
    }
}

exports.login = async function (req, res) {
  const { email, senha } = req.body;
  const user = await API.login(email, senha);
  if (!user) {
    return res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
  }
  req.session.usuario = {
    id: user._id,
    email: user.email,
    nome: user.nome,
    tipo: user.tipo
  };
  return res.json({ sucesso: true, mensagem: 'Login bem-sucedido' });
};

exports.logout = (req, res) => {
  if (req.session.usuario) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao deslogar' });
      }
      res.clearCookie('connect.sid');
      res.json({ sucesso: true });
    });
  } else {
    res.json({ sucesso: false, mensagem: 'Nenhuma sessão ativa' });
  }
};

exports.verificarLogin = (req, res) => {
  if (req.session.usuario) {
    res.json({ logado: true, user: req.session.usuario});
  } else {
    res.json({ logado: false });
  }
};
  