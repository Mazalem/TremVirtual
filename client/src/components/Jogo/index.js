import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const JogoContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(37, 31, 31, 0.7);
  cursor: pointer;
  color: white;
  overflow: hidden;
  height: 330px;
  box-sizing: border-box;
  position: relative;
  margin-top: 10px;
  flex: 1 1 auto;
  transform: ${(props) => (props.show ? 'scale(1.05)' : 'scale(1)')};
  transition: transform 0.3s ease-in-out;
  width: 200px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const JogoImagem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const JogoInfo = styled.div`
  padding: 10px;
  text-align: center;
  background-color: #483d3d;
  color: white;
  height: 150px;
  align-items: center;
  flex-direction: column;
  display: block;
  justify-content: center;

  h3,
  p,
  span {
    margin: 5px 0;
  }
`;

const JogoDescricao = styled.div`
  min-height: 130px;
  max-height: 190px;
  height: auto;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => (props.show ? 'translateY(0)' : 'translateY(10px)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
  padding: 10px;
  background-color: rgba(37, 31, 31, 0.9);
  color: white;
  text-align: center;
  white-space: normal;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;

  p {
    margin-bottom: 50px;
  }
`;

const BotaoJogar = styled.button`
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) =>
    props.show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)'};
  transition: opacity 0.5s ease, transform 0.5s ease;
  padding: 10px 20px;
  background-color: rgb(77, 9, 9);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  bottom: 10px;
  left: 50%;

  &:hover {
    background-color: rgb(102, 12, 12);
  }
`;

function Jogo({jogo}) {
  const [showDescricao, setShowDescricao] = useState(false);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    if (!isMobileDevice()) {
      setShowDescricao(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileDevice()) {
      setShowDescricao(false);
    }
  };

  const handleToggleDescricao = () => {
    if (isMobileDevice()) {
      setShowDescricao((prev) => !prev);
    }
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowDescricao(false);
    }
  };

  useEffect(() => {
    if (isMobileDevice() && showDescricao) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDescricao]);

  const isMobileDevice = () => {
    return window.innerWidth <= 768 || (window.innerWidth <= 1024 && window.innerHeight <= 768);
  };

  return (
    <JogoContainer
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleDescricao}
      show={showDescricao}
    >
      <JogoImagem src={jogo.imagem} alt={jogo.titulo} /> 
      <JogoInfo>
        <h4>{jogo.titulo}</h4>
        <p>{jogo.autor}</p>
        <span>❤ {jogo.likes} Likes</span>
      </JogoInfo>
      <JogoDescricao show={showDescricao}>
        <p>{jogo.descricao}</p>
        <a href={`${process.env.REACT_APP_BASE}/jogo/${jogo._id}`}><BotaoJogar show={showDescricao}>Jogar</BotaoJogar></a>
      </JogoDescricao>
    </JogoContainer>
  );
}

export default Jogo;