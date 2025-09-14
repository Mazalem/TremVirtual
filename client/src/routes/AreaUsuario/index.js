import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from "../../components/Modal";
import Cookies from "js-cookie";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 90px 0;
    background-color: #120a0a;
    font-family: sans-serif;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  gap: 40px;
  flex-wrap: wrap;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 250px;
`;

const Avatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: #333;
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const Name = styled.h2`
  color: #fff;
  margin: 10px 0 20px 0;
`;

const EditarUsuario = styled.button`
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #463b3b91;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: #5f505091;
    border-color: #fff;
    color: #ff6347;
  }
`;

const WorldsSection = styled.div`
  flex: 1;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

const WorldsHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  margin-bottom: 20px;
  gap: 12px;
`;

const WorldsTab = styled.button`
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#5f505091" : "#463b3b91")};
  color: ${({ active }) => (active ? "#ff6347" : "white")};
  padding: 8px 160px;
  cursor: pointer;
  font-size: 20px;
  transition: 0.3s;

  &:hover {
    background-color: #5f505091;
    border-color: #fff;
    color: #ff6347;
  }
`;

const WorldsTitle = styled.h2`
  margin: 0;
`;

const WorldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
`;

const WorldCard = styled.div`
  position: relative;
  background-color: #2c2525d7;
  border: 1px solid white;
  border-radius: 8px;
  padding: 16px;
  color: white;
  display: flex;
  gap: 12px;
  height: 120px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);

    .world-action {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const ActionButton = styled.a`
  position: absolute;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(20, 20, 20, 0.8);
  border: 1px solid #ff6347;
  color: #ff6347;

  &:hover {
    background-color: #ff6347;
    color: #fff;
  }
`;

const DeleteButton = styled(ActionButton)`
  top: 8px;
`;

const EditButton = styled(ActionButton)`
  bottom: 8px;
`;

const Thumb = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-color: #555;
`;

const WorldInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
`;

const WorldTitle = styled.h3`
  margin: 0;
  color: #ff6347;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WorldDesc = styled.p`
  margin: 0;
  color: #ddd;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const WorldMeta = styled.div`
  font-size: 12px;
  color: #aaa;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ViewMore = styled.a`
  color: #ff6347;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
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
  transform: translate(10px, 10px);
  white-space: nowrap;
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: #463b3b91;
  border: 1px solid white;
  border-radius: 8px;
  padding: 40px;
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [mundos, setMundos] = useState([]);
  const [total, setTotal] = useState(0);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [tab, setTab] = useState("favoritos");
  const [tipo, setTipo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    fetch('/apiusers/verificarLogin', { credentials: 'include' })
      .then(res => res.json())
      .then(json => setUsuario(json.user))
      .catch(err => console.error('Erro ao carregar o usuário', err));
      const t = Cookies.get("tipo");
      setTipo(t);

      if (t === "Professor") {
          setTab("criados");
        } else {
          setTab("favoritos");
      }
  }, []);

  useEffect(() => {
    if (usuario && usuario.id) {
      const url =
        tab === "criados"
          ? '/apimundos/lista/criados/' + usuario.id
          : '/apimundos/lista/favoritos/' + usuario.id;

      fetch(url)
        .then(res => res.json())
        .then(json => {
          setTotal(json.mundos.length)
          const ultimos6 = json.mundos.slice(-6).reverse();
          setMundos(ultimos6);
        })
        .catch(() => {});
    }
  }, [usuario, tab]);

  const showTooltip = (text, e) => {
    setTooltip({ visible: true, text, x: e.clientX, y: e.clientY });
  };

  const moveTooltip = (e) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };

 const handlePositive = async () => {
  if (!selectedId) return;
  try {
    await fetch(`/apimundos/exclusao/${selectedId}`, { method: "GET", credentials: 'include' });
    window.location.reload();
  } catch (err) {
    console.error("Erro ao excluir mundo:", err);
  }
};

const handleNegative = () => {
  setModalOpen(false);
  setSelectedId(null);
  setSelectedName(null);
};

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ProfileSection>
          <Avatar style={{ backgroundImage: `url('https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png')` }} />
          <Name>{usuario?.nome}</Name>
          <a href="/editarUsuario"><EditarUsuario>Editar perfil</EditarUsuario></a>
        </ProfileSection>

        <WorldsSection>
          <WorldsHeader>
            {tipo === "Professor" && (
              <WorldsTab active={tab === "criados"} onClick={() => setTab("criados")}>
                Criados
              </WorldsTab>
            )}
            <WorldsTab active={tab === "favoritos"} onClick={() => setTab("favoritos")}>
              Favoritos
            </WorldsTab>
          </WorldsHeader>

          <WorldsContainer>
            {mundos.length === 0 ? (
              <EmptyMessage>Nenhum mundo encontrado</EmptyMessage>
            ) : (
              <AnimatePresence mode="wait">
                {mundos.map((mundo, i) => (
                <motion.a
                  key={mundo._id}
                  href={`/jogo/${mundo._id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorldCard>
                    {tab === "criados" && (
                      <>
                        <DeleteButton
                          className="world-action"
                          onMouseEnter={(e) => showTooltip("Excluir mundo", e)}
                          onMouseMove={moveTooltip}
                          onMouseLeave={hideTooltip}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedId(mundo._id);
                            setSelectedName(mundo.titulo);
                            setModalOpen(true);
                          }}
                        >
                          ✕
                        </DeleteButton>
                        <EditButton
                          className="world-action"
                          href={`/mundo/${mundo._id}`}
                          onMouseEnter={(e) => showTooltip("Editar mundo", e)}
                          onMouseMove={moveTooltip}
                          onMouseLeave={hideTooltip}
                        >
                          ✎
                        </EditButton>
                      </>
                    )}

                    <Thumb style={{ backgroundImage: `url(${mundo.imagem})` }} />
                    <WorldInfo>
                      <WorldTitle
                        onMouseEnter={(e) => showTooltip(mundo.titulo, e)}
                        onMouseMove={moveTooltip}
                        onMouseLeave={hideTooltip}
                      >
                        {mundo.titulo}
                      </WorldTitle>
                      <WorldDesc>{mundo.autor}</WorldDesc>
                      <WorldMeta>{mundo.lancamento} · {mundo.versao}</WorldMeta>
                    </WorldInfo>
                  </WorldCard>
                </motion.a>
              ))}
            </AnimatePresence>
          )}

          </WorldsContainer>
          
          <Footer>
            {total > 6 && (
              <ViewMore href={tab === "criados" ? "/galeria/criados/1" : "/galeria/favoritos/1"}>Ver Mais</ViewMore>
            )}
          </Footer>

        </WorldsSection>
      </Wrapper>

      {tooltip.visible && (
        <Tooltip style={{ top: tooltip.y, left: tooltip.x }}>
          {tooltip.text}
        </Tooltip>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        titulo="Confirmação de Exclusão"
        mensagem={`Você deseja realmente excluir este mundo (${selectedName})?`}
        positiveButtonMsg="Confirmar"
        positiveButtonCommand={handlePositive}
        negativeButtonMsg="Cancelar"
        negativeButtonCommand={handleNegative}
      />
    </>
  );
};

export default Perfil;