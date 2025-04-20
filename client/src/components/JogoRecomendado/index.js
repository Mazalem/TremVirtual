import React from 'react';
import styled from 'styled-components';

const JogoRecomendadoContainer = styled.div`
  display: flex;
  color: white;
  margin-bottom: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;

  &:hover {
    transform: scale(1.05);
    border-width: 2px;
    background-color: #2c25256b;
  }
`;

const JogoRecomendadoThumbnail = styled.img`
  width: 120px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
`;

const JogoRecomendadoInfo = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const JogoRecomendadoTitle = styled.h4`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const JogoRecomendadoDeveloper = styled.p`
  font-size: 12px;
  color: #606060;
  margin: 0;
`;

const JogoRecomendadoLikes = styled.p`
  font-size: 12px;
  color: #606060;
  margin: 0;
`;

const JogoRecomendado = (props) => {
  const jogo = props.jogo;
  const url = process.env.REACT_APP_SERVIDOR;
  return (
    <a href={`${url}/jogo/${jogo._id}`}>
    <JogoRecomendadoContainer>
      <JogoRecomendadoThumbnail src={jogo.imagem} alt={jogo.titulo} />
      <JogoRecomendadoInfo>
        <JogoRecomendadoTitle>{jogo.titulo}</JogoRecomendadoTitle>
        <JogoRecomendadoDeveloper>{jogo.autor}</JogoRecomendadoDeveloper>
        <JogoRecomendadoLikes>{jogo.likes} likes</JogoRecomendadoLikes>
      </JogoRecomendadoInfo> 
    </JogoRecomendadoContainer>
    </a>
  );
};

export default JogoRecomendado;
