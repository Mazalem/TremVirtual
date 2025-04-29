import styled, { keyframes } from 'styled-components';

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
  color: #ffffff;
  font-size: 1.8em;
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


export default function MessageOverlay(props) {
    if (props.condicao) {
        if (props.sucesso) {
            return (
                <Overlay>
                    <i className="bi bi-check-circle" style={{ color: 'green', marginRight: '8px' }} />
                    {props.mensagem}
                </Overlay>
            );
        } else {
            return (
                <Overlay>
                    <i className="bi bi-x-circle" style={{ color: 'red', marginRight: '8px' }} />
                    {props.mensagem}
                </Overlay>
            );
        }
    }
}
