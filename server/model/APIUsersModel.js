const mongodb = require("mongodb");
const { ObjectId } = require('mongodb');
require('dotenv').config();

const ClienteMongo = mongodb.MongoClient;
var cliente;

async function conexao_bd(){
  if (!cliente)
    cliente = await ClienteMongo.connect(process.env.DB);
};

function bd(){
  return cliente.db("Trem_Virtual");
};

class APIModel {
  async close() {
    if (cliente) cliente.close();
    cliente = undefined;
  }

  async cria(dado) {
    await conexao_bd();
    const colecao = bd().collection("users");
    await colecao.insertOne(dado);
  }

  async lista() {
    await conexao_bd();
    const colecao = bd().collection("users");
    const mundos = await colecao.find({}).toArray();
    return mundos;
  }
  
  async consulta(id) {
    await conexao_bd();
    const colecao = bd().collection("users");
    const mundo = await colecao.findOne({ _id: new ObjectId(id) });
    return mundo;
  }

  async login(email, senha) {
    await conexao_bd();
    const colecao = bd().collection("users");
    const user = await colecao.findOne({ email: email, senha: senha });
    return user || false;
  }

  async liberado(email) {
    await conexao_bd();
    const colecao = bd().collection("users");
    const usuario = await colecao.findOne({ email: email });
    return usuario ? false : true;
  }

  async update(id, dadoAtualizado) {
    await conexao_bd();
    const colecao = bd().collection("users");
    await colecao.updateOne(
      { _id: new ObjectId(id) },
      { $set: dadoAtualizado }
    );
    const usuario = await colecao.findOne({ _id: new ObjectId(id) });
    return usuario;
}

  async delete(id) {
    await conexao_bd();
    const colecao = bd().collection("users");
    await colecao.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = new APIModel();
