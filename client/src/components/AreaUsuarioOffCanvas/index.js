import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const StyledOffCanvas = styled.div`
  background-color: #2c2525d7;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
`;

const OffCanvasHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5 {
    margin: 0;
  }

  .btn-close {
    filter: invert(1);
  }
`;

const OffCanvasBody = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const OptionList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const OptionItem = styled.li`
  margin: 10px 0;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  & a {
    color: #FFF;
    text-decoration: none;
  }

  &:hover {
    color: #ff6347;
    border: 1px solid #fff;
    border-radius: 10px;
    transform: scale(1.05); 
  }

  &.logout {
    color: #ff6347;
    font-weight: bold;
    margin-top: auto;
  }
`;

function AreaRestrita({ children }) {
  const [validado, setValidado] = useState(null);

  useEffect(() => {
    fetch('/apiusers/verificarLogin', { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        setValidado(json.user.tipo == "Professor");
      })
      .catch(() => {
        setValidado(false);
      });
  }, []);

  if (!validado) return null;

  return <>{children}</>;
}

function AreaUsuarioOffCanvas() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/apiusers/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          navigate('/');
        } else {
          console.error('Erro ao fazer logout:', res.statusText);
        }
      })
      .catch(err => {
        console.error('Erro ao fazer logout:', err);
      });
  };

  return (
    <StyledOffCanvas
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="offcanvasUsuario"
      aria-labelledby="offcanvasUsuarioLabel"
    >
      <OffCanvasHeader>
        <h5 id="offcanvasUsuarioLabel">Área do Usuário</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </OffCanvasHeader>
      <OffCanvasBody>
        <OptionList>

          <a href="/perfilUsuario">
            <OptionItem>
              <i className="bi bi-person-badge-fill"/> Ver Perfil
            </OptionItem>
          </a>

          <AreaRestrita>
          <a href="/adicionarMundo">
            <OptionItem>
              <i className="bi bi-house-add-fill"/> Adicionar Mundos
            </OptionItem>
          </a>
          </AreaRestrita>

          <OptionItem>
            <i className="bi bi-chat-dots-fill"/> Chats
          </OptionItem>

          <OptionItem>
            <i className="bi bi-sliders"/> Configurações
          </OptionItem>

          <OptionItem className="logout" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Log Out
          </OptionItem>
          
        </OptionList>
      </OffCanvasBody>
    </StyledOffCanvas>
  );
}

export default AreaUsuarioOffCanvas;
