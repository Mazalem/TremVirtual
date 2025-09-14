import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  padding: 20px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  &.fadeOut {
    animation: fadeOut 0.5s forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto;
  padding: 20px;
  background-color: #2c2525d7;
  border-radius: 8px;
  border: solid 1px white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  color: white;
  text-align: center;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
`;

const Mensagem = styled.p`
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 1em;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &.positive {
    background-color: #4caf50;
    color: white;
  }

  &.negative {
    background-color: #f44336;
    color: white;
  }
`;

export default function Modal({
  isOpen,
  onClose,
  titulo,
  mensagem,
  positiveButtonMsg,
  positiveButtonCommand,
  negativeButtonMsg,
  negativeButtonCommand,
}) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Container>
        {titulo && <Titulo>{titulo}</Titulo>}
        {mensagem && <Mensagem>{mensagem}</Mensagem>}

        <Buttons>
          {negativeButtonMsg && (
            <Button
              className="negative"
              onClick={() => {
                if (negativeButtonCommand) {
                  negativeButtonCommand();
                }
                onClose();
              }}
            >
              {negativeButtonMsg}
            </Button>
          )}

          {positiveButtonMsg && (
            <Button
              className="positive"
              onClick={() => {
                if (positiveButtonCommand) {
                  positiveButtonCommand();
                }
                onClose();
              }}
            >
              {positiveButtonMsg}
            </Button>
          )}
        </Buttons>
      </Container>
    </Overlay>
  );
}
