import React from 'react';
import styled from 'styled-components';
import Jogo from '../Jogo';

const GaleriaContainer = styled.div`
  padding: 20px;
  position: relative;
  border: 1px solid #ccc;
  background-color: rgba(44, 37, 37, 0.42);
  margin-bottom: 10px; 
  width: 100%; 
  box-sizing: border-box;
`;

const Titulo = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-align: left;
  text-decoration: underline;
  transition: all 0.2s ease;

  a {
    color: #ffffff;
    text-decoration: none;
  }

  &:hover {
    font-size: 28px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const JogosContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-snap-type: x mandatory; 
  padding-bottom: 10px;

  & > div {
    scroll-snap-align: start;
  }

  @media (max-width: 600px) {
    flex-wrap: nowrap;
    & > div {
      flex: 0 0 100%; 
      max-width: 100%;
    }
  }

 @media (min-width: 601px) and (max-width: 1024px) {
  flex-wrap: nowrap;
  & > div {
    flex: 0 0 200px;
    max-width: 200px; 
  }
}


  @media (min-width: 1025px) {
    flex-wrap: wrap;
    & > div {
      flex: 1 1 calc(20% - 15px);
      max-width: calc(20% - 15px);
    }
  }
`;

function GaleriaDeJogos({ jogos, titulo, inicio, fim }) {
  const jogosLimitados = jogos.slice(inicio, fim);

  return (
    <GaleriaContainer>
      <Titulo>
        <a href="/">{titulo}</a>
      </Titulo>
      <JogosContainer>
        {jogosLimitados.map((jogo) => (
          <Jogo
            jogo={jogo}
          />
        ))}
      </JogosContainer>
    </GaleriaContainer>
  );
}

export default GaleriaDeJogos;