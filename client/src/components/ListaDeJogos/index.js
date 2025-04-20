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

function ListaDeJogos(props) {
  const jogosParaExibir = props.jogos
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <ListaDeJogosContainer>
      {jogosParaExibir.map((jogo) => (
        <JogoRecomendado
          key={jogo.id}
          jogo={jogo}
        />
      ))}
    </ListaDeJogosContainer>
  );
}

export default ListaDeJogos;
