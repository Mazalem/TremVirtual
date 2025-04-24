import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(44, 37, 37, 0.42);
  height: 100vh;
  text-align:center;
`;

const Botao = styled.button`
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 0;
  background-color: #463b3b91;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  transition: background-color 0.3s, border-color 0.3s;
  color: white;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #5f505091;
    border-color: #fff;
    color: #ff6347;
  }
`;

function Erro(props) {
  return (
    <Container>
      <h1>{props.codigo}<br/>{props.texto}<br/><a href='/home'><Botao type='Button'>Voltar</Botao></a></h1>
    </Container>
  );
}

export default Erro;
