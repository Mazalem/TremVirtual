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
    const colecao = bd().collection("mundos_virtuais");
    await colecao.insertOne(dado);
  }

  async lista() {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    const mundos = await colecao.find({}).toArray();
    return mundos;
  }

  async consulta(id) {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    const mundo = await colecao.findOne({ _id: new ObjectId(id) });
    return mundo;
  }

  async getMundos(id) {
  await conexao_bd();
  const colecao = bd().collection("mundos_virtuais");
  const mundos = await colecao.find({ responsavelId: id }).toArray();
  return mundos;
}

  async update(id, dadoAtualizado) {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    await colecao.updateOne(
      { _id: new ObjectId(id) },
      { $set: dadoAtualizado }
    );
  }

  async delete(id) {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    await colecao.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = new APIModel();
