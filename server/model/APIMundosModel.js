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
    await conexao_bd()
    const colecao = bd().collection("mundos_virtuais")
    const mundo = await colecao.findOne({_id: new ObjectId(id)});
    return mundo
  }
    
  /*
  async altera(dado) {
    await conexao_bd();
    const colecao = bd().collection("clima");
    await colecao.updateOne(
      { dia: dado.dia, mes: dado.mes, ano: dado.ano },
      {
        $set: {
          temperatura: dado.temperatura,
          umidade: dado.umidade,
          chuva: dado.chuva
        },
      }
    );
  }

  async deleta(dia, mes, ano) {
    await conexao_bd();
    const colecao = bd().collection("clima");
    const clima = await colecao.findOne({ dia: dia, mes: mes, ano: ano });
    if (!clima) {
      throw new Error(`Não existe a clima para essa data`);
    } else {
      await colecao.findOneAndDelete({ dia: dia, mes: mes, ano: ano });
    }
  }

  async lista(mes, ano) {
    await conexao_bd();
    const colecao = bd().collection("clima");
    const climas = await colecao.find({mes: mes, ano: ano}).project({_id: 0, dia: 1, temperatura:1, umidade: 1, chuva:1}).toArray();
    return climas;
  }*/
}
module.exports = new APIModel();
