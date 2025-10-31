// Botao.jsx
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 20px;
    color: ${({ $active }) => ($active ? "#ff6347" : "#000")};
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover i { transform: scale(1.2); }
  &:active i { transform: scale(1.05); }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;

const Botao = ({ unclicked, clicked, change = false, isActive = false, onClick, children }) => {
  const iconClass = change ? (isActive ? clicked : unclicked) : unclicked;

  return (
    <StyledButton type="button" onClick={onClick} $active={change && isActive}>
      <i className={iconClass} aria-hidden="true" />
      {children && <span style={{ marginLeft: '10px' }}>{children}</span>}
    </StyledButton>
  );
};

export default Botao;
