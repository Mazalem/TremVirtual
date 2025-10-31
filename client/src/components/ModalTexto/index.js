// src/components/ModalTexto.jsx
import React, { useEffect, useState } from "react";
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
  animation: fadeIn 0.2s forwards;
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #2c25258e;
  border-radius: 8px;
  border: solid 1px white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
`;

const Mensagem = styled.p`
  margin-bottom: 20px;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #17000B;
  color: #fff;
  caret-color: #fff;
  width: 100%;
  font-size: 16px;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    background-color:rgb(32, 0, 16);
    border-color: #ddd;
    outline: none;
    color: #fff;
  }

  &:focus::placeholder {
    color: #ddd;
  }

  &:focus-visible {
    box-shadow: none;
    border-color: #ddd;
  }
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
  transition: 0.2s;

  &:hover { opacity: 0.9; }

  &.positive { background-color: #4caf50; color: white; }
  &.negative { background-color: #f44336; color: white; }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ModalTexto({
  isOpen,
  onClose,
  titulo,
  mensagem,
  positiveButtonMsg,
  positiveButtonCommand,
  negativeButtonMsg,
  negativeButtonCommand,
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) setInputValue("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePositive = () => {
    if (!inputValue.trim()) return;
    if (positiveButtonCommand) positiveButtonCommand(inputValue);
    setInputValue("");
    if (onClose) onClose();
  };


  const handleNegative = () => {
    if (negativeButtonCommand) negativeButtonCommand();
    setInputValue("");
    if (onClose) onClose();
  };

  return (
    <Overlay>
      <Container>
        {titulo && <Titulo>{titulo}</Titulo>}
        {mensagem && <Mensagem>{mensagem}</Mensagem>}
        <Input
          type="text"
          placeholder="ID do professor"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Buttons>
          {negativeButtonMsg && (
            <Button className="negative" onClick={handleNegative}>
              {negativeButtonMsg}
            </Button>
          )}
          {positiveButtonMsg && (
            <Button
              className="positive"
              onClick={handlePositive}
              disabled={!inputValue.trim()}
            >
              {positiveButtonMsg}
            </Button>
          )}
        </Buttons>
      </Container>
    </Overlay>
  );
}
