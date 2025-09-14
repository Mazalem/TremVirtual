import React from 'react';
import JogoRecomendado from '../JogoRecomendado';
import styled from 'styled-components';

const ListaDeJogosContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border-left: 1px solid #ddd;
  background-color: #2c25256b;
  transition: transform 0.3s ease;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddd;
`;

function ListaDeJogos({ jogos = [], atual }) {
  const pool = jogos.sort(() => Math.random() - 0.5);
  const jogosParaExibir = [];

  for (let i = 0; i < pool.length && jogosParaExibir.length < 10; i++) {
    const jogo = pool[i];
    const jogoId = jogo._id ?? jogo.id;
    if (String(jogoId) !== String(atual)) {
      jogosParaExibir.push(jogo);
    }
  }

  return (
    <ListaDeJogosContainer>
      {jogosParaExibir.map((jogo) => (
        <JogoRecomendado
          key={jogo._id ?? jogo.id}
          jogo={jogo}
        />
      ))}
    </ListaDeJogosContainer>
  );
}

export default ListaDeJogos;
