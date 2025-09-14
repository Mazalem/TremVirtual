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

  async edita(id, dadoAtualizado) {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    const resultado = await colecao.updateOne(
      { _id: new ObjectId(id) },
      { $set: dadoAtualizado }
    );
    return resultado;
  }

  async deleta(id) {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    const resultado = await colecao.deleteOne({ _id: new ObjectId(id) });
    return resultado;
  }
  
  async consulta(id) {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    const mundo = await colecao.findOne({ _id: new ObjectId(id) });
    return mundo;
  }

  async lista() {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    const mundos = await colecao.find({}).toArray();
    return mundos;
  }

  async mundosPorUsuario(id) {
  await conexao_bd();
  const colecao = bd().collection("mundos_virtuais");
  return colecao.find({ responsavelId: id }).toArray();
}

  async mundosFavoritos(userId) {
    await conexao_bd();
    const users = bd().collection("users");
    const usuario = await users.findOne({ _id: new ObjectId(userId) });
    if (!usuario?.likedMundos || usuario.likedMundos.length === 0) return [];

    const mundos = bd().collection("mundos_virtuais");
    return mundos.find({ _id: { $in: usuario.likedMundos.map(id => new ObjectId(id)) } }).toArray();
  }

  async buscarPublicos() {
    await conexao_bd();
    const colecao = bd().collection("mundos_virtuais");
    return colecao.find({ visibilidade: "publico" }).sort({ titulo: 1 }).toArray();
  }

  async toggleLike(mundoId, userId) {
    await conexao_bd();
    const mundos = bd().collection("mundos_virtuais");
    const users = bd().collection("users");

    const mundoObjectId = new ObjectId(mundoId);
    const userObjectId = new ObjectId(userId);

    const mundoIdStr = mundoId.toString();

    const usuario = await users.findOne({ _id: userObjectId });
    const jaCurtiu = usuario?.likedMundos?.includes(mundoIdStr);

    if (jaCurtiu) {
      await users.updateOne(
        { _id: userObjectId },
        { $pull: { likedMundos: mundoIdStr } }
      );

      await mundos.updateOne(
        { _id: mundoObjectId },
        { $inc: { likes: -1 } }
      );

      const mundo = await mundos.findOne({ _id: mundoObjectId });
      return { liked: false, likes: mundo.likes };

    } else {
      await users.updateOne(
        { _id: userObjectId },
        { $addToSet: { likedMundos: mundoIdStr } }
      );

      await mundos.updateOne(
        { _id: mundoObjectId },
        { $inc: { likes: 1 } }
      );

      const mundo = await mundos.findOne({ _id: mundoObjectId });
      return { liked: true, likes: mundo.likes };
    }
}

}

module.exports = new APIModel();
