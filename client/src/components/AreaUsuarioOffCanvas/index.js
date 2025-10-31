import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ModalTexto from "../ModalTexto";

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
  h5 { margin: 0; }
  .btn-close { filter: invert(1); }
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  & a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    width: 100%;
  }
  ${props =>
    props.hoverDisabled
      ? ""
      : `
    &:hover {
      color: #ff6347;
      border: 1px solid #fff;
      border-radius: 10px;
      transform: scale(1.05);
    }
  `}
  &.logout {
    color: #ff6347;
    font-weight: bold;
    margin-top: auto;
  }
`;

const TurmaButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 40px 10px 10px;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  &:hover {
    color: #ff6347;
    border: 1px solid #fff;
    border-radius: 10px;
    transform: scale(1.05);
  }
`;

const RemoveIcon = styled.span`
  position: absolute;
  right: 10px;
  font-size: 15px; 
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #fff;
  padding: 4px 6px;
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease;
  user-select: none;
  &:hover {
    color: #ff6347;
  }
`;

const Tooltip = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-110%, -50%);
  white-space: nowrap;
`;

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
  z-index: 10000;
  padding: 20px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.2s forwards;
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const OverlayContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 80px auto;
  padding: 20px;
  background-color: #2c2525d7;
  border-radius: 8px;
  border: solid 1px white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  color: white;
  text-align: center;
`;

const OverlayIcon = styled.div`
  font-size: 56px;
  line-height: 1;
  margin-bottom: 10px;
  color: ${p => (p.success ? "#4caf50" : "#f44336")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayTitle = styled.h2`
  margin-bottom: 20px;
`;

const OverlayMessage = styled.p`
  margin-bottom: 20px;
`;

const OverlayActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const OverlayButton = styled.a`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
  color: white;
  &.primary { background-color: #4caf50; }
  &.negative { background-color: #f44336; }
  &:hover { opacity: 0.9; }
`;

function AreaProfessor({ children }) {
  const [professor, setProfessor] = useState(null);
  useEffect(() => {
    fetch("/apiusers/verificarLogin", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        setProfessor(json.user?.tipo === "Professor");
      })
      .catch(() => {
        setProfessor(false);
      });
  }, []);
  if (!professor) return null;
  return <>{children}</>;
}

function AreaAluno({ children }) {
  const [aluno, setAluno] = useState(null);
  useEffect(() => {
    fetch("/apiusers/verificarLogin", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        setAluno(json.user?.tipo === "Aluno");
      })
      .catch(() => {
        setAluno(false);
      });
  }, []);
  if (!aluno) return null;
  return <>{children}</>;
}

export default function AreaUsuarioOffCanvas() {
  const navigate = useNavigate();
  const [idAluno, setIdAluno] = useState();
  const [turma, setTurma] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetch("/apiusers/verificarLogin", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        const id = json.user?.id;
        setIdAluno(id);
        if (json.user?.tipo === "Aluno" && id) {
          fetch(`/apiusers/verificarTurma/${id}`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
              setTurma(data.professor || null);
            })
            .catch(() => setTurma(null));
        }
      })
      .catch(() => {
        setIdAluno(undefined);
        setTurma(null);
      });
  }, []);

  const handleLogout = () => {
    fetch("/apiusers/logout", { method: "GET", credentials: "include" })
      .then((res) => {
        if (res.ok) {
          Cookies.remove("tipo");
          navigate("/");
        }
      })
      .catch(() => { });
  };

  const hideTooltip = () => setTooltip({ visible: false, text: "", x: 0, y: 0 });

  const sairTurma = (e) => {
    e.stopPropagation();
    hideTooltip();
    if (!idAluno || !turma?._id) return;
    fetch(`/apiusers/sairTurma/${idAluno}/${turma._id}`, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        const mensagem = json?.mensagem || "Você saiu da turma.";
        setTurma(null);
        setFeedback({ sucesso: json?.sucesso ?? true, mensagem, tipo: "sair" });
      })
      .catch(() => {
        setFeedback({ sucesso: false, mensagem: "Erro ao sair da turma.", tipo: "sair" });
      });
  };

  const entrarTurma = (idProfessor) => {
    if (!idAluno || !idProfessor) return;
    fetch(`/apiusers/entrarTurma/${idAluno}/${idProfessor}`, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        setFeedback({ sucesso: json.sucesso ?? false, mensagem: json.mensagem ?? "Resposta do servidor.", tipo: "entrar" });
        if (json.sucesso) {
          fetch(`/apiusers/verificarTurma/${idAluno}`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => setTurma(data.professor || null))
            .catch(() => { });
        }
      })
      .catch(() => {
        setFeedback({ sucesso: false, mensagem: "Erro de conexão. Tente novamente.", tipo: "entrar" });
      })
      .finally(() => {
        setModalOpen(false);
      });
  };

  const closeFeedback = () => {
    setFeedback(null);
  };

  return (
    <>
      <StyledOffCanvas className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasUsuario" aria-labelledby="offcanvasUsuarioLabel">
        <OffCanvasHeader>
          <h5 id="offcanvasUsuarioLabel">Área do Usuário</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </OffCanvasHeader>
        <OffCanvasBody>
          <OptionList>
            <a href="/perfilUsuario">
              <OptionItem>
                <i className="bi bi-person-badge-fill" />
                Ver Perfil
              </OptionItem>
            </a>
            <AreaProfessor>
              <a href="/mundo">
                <OptionItem>
                  <i className="bi bi-house-add-fill" />
                  Adicionar Mundos
                </OptionItem>
              </a>
            </AreaProfessor>
            <AreaAluno>
              <OptionItem hoverDisabled>
                {turma ? (
                  <TurmaButton data-bs-dismiss="offcanvas" onClick={() => navigate(`/galeria/turma/${turma._id || "1"}`)}>
                    <span>
                      <i className="bi bi-rocket-takeoff-fill" /> Turma do prof(a) {turma.nome}
                    </span>
                    <RemoveIcon
                      as="button"
                      type="button"
                      className="btn-close"
                      style={{ filter: "invert(1)" }}
                      onMouseEnter={(e) => setTooltip({ visible: true, text: "Sair da turma", x: e.clientX, y: e.clientY })}
                      onMouseMove={(e) => setTooltip((p) => ({ ...p, x: e.clientX, y: e.clientY }))}
                      onMouseLeave={hideTooltip}
                      onClick={sairTurma}
                      aria-label="Sair da turma"
                    />
                  </TurmaButton>
                ) : (
                  <TurmaButton onClick={() => setModalOpen(true)}>
                    <i className="bi bi-rocket-takeoff-fill" />
                    Entre em uma turma
                  </TurmaButton>
                )}
              </OptionItem>
            </AreaAluno>
            <OptionItem className="logout" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right" />
              Log Out
            </OptionItem>
          </OptionList>
          {tooltip.visible && <Tooltip style={{ top: tooltip.y + "px", left: tooltip.x + "px" }}>{tooltip.text}</Tooltip>}
        </OffCanvasBody>
        <ModalTexto
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          titulo="Entrar em Turma"
          mensagem="Digite o ID do professor para entrar na turma"
          positiveButtonMsg="Confirmar"
          positiveButtonCommand={(idProfessor) => entrarTurma(idProfessor)}
          negativeButtonMsg="Cancelar"
        />
      </StyledOffCanvas>

      {feedback && (
        <Overlay onClick={closeFeedback} role="dialog" aria-modal="true">
          <OverlayContainer onClick={(e) => e.stopPropagation()}>
            <OverlayIcon success={feedback.sucesso}>
              {feedback.sucesso ? <i className="bi bi-check-circle-fill" /> : <i className="bi bi-x-circle-fill" />}
            </OverlayIcon>
            <OverlayTitle>{feedback.sucesso ? "Operação bem-sucedida" : "Atenção"}</OverlayTitle>
            <OverlayMessage>{feedback.mensagem}</OverlayMessage>
            <OverlayActions>
              {feedback.sucesso ? (
                feedback.tipo === "entrar" ? (
                  <>
                    <OverlayButton href="/home" className="negative">Fechar</OverlayButton>
                    <OverlayButton href={`/galeria/turma/${turma?._id}`} className="primary">Ir para turma</OverlayButton>
                  </>
                ) : (
                  <OverlayButton href="/home" className="primary">Fechar</OverlayButton>
                )
              ) : (
                <OverlayButton href="/home" className="primary">Fechar</OverlayButton>
              )}
            </OverlayActions>
          </OverlayContainer>
        </Overlay>
      )}
    </>
  );
}
