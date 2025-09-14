import React, { useState } from 'react';
import styled from 'styled-components';
import Jogo from '../Jogo';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from "../../components/Modal";

const GaleriaContainer = styled.div`
  padding: 20px;
  position: relative;
  border: 1px solid #ccc;
  background-color: rgba(44, 37, 37, 0.42);
  margin-bottom: 10px;
  padding-left: 25px;
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
  padding-left: 10px;
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

const MensagemVazia = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const JogoWrapper = styled.div`
  position: relative;
  transition: transform 0.25s ease-in-out;
  transform-origin: center;
  will-change: transform;
  display: inline-block;
  cursor: pointer;

  & > * {
    transition: transform 0.25s ease-in-out;
    transform-origin: center;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:hover > * {
    transform: scale(1.0);
  }

  .world-action {
    transition: 0.4s;
    transition-delay: 0ms;
  }

  &:hover .world-action {
    opacity: 1;
    visibility: visible;
    transition-delay: 60ms;
  }
`;

const ActionButton = styled.a`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 300ms linear, color 300ms linear, transform 220ms ease, opacity 300ms ease, visibility 300ms ease;
  opacity: 0;
  visibility: hidden;
  background-color: rgba(20, 20, 20, 0.8);
  border: 1px solid #ff6347;
  color: #ff6347;
  z-index: 3;
  user-select: none;

  &:hover {
    background-color: #ff6347;
    color: #fff;
  }
`;

const EditButton = styled(ActionButton)`
  top: 20px;
  left: 8px;
`;

const DeleteButton = styled(ActionButton)`
  top: 20px;
  right: 8px;
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

function GaleriaDeJogos({ jogos, titulo, inicio = 0, fim = 6, gerenciavel, link }) {
  const jogosLimitados = Array.isArray(jogos) ? jogos.slice(inicio, fim) : [];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  const handlePositive = async () => {
    if (!selectedId) return;
    try {
      await fetch(`/apimundos/exclusao/${selectedId}`, { method: "GET", credentials: 'include' });
      window.location.reload();
    } catch (err) {
      console.error("Erro ao excluir mundo:", err);
      setModalOpen(false);
    }
  };

  const handleNegative = () => {
    setModalOpen(false);
    setSelectedId(null);
    setSelectedName(null);
  };

  const showTooltip = (text, e) => {
    setTooltip({ visible: true, text, x: e.clientX, y: e.clientY });
  };

  const moveTooltip = (e) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, text: '', x: 0, y: 0 });
  };

  return (
    <GaleriaContainer>
      <Titulo>
        {link ? <a href={link}>{titulo}</a> : titulo}
      </Titulo>

      <JogosContainer as={motion.div} layout>
        <AnimatePresence initial={false} mode="popLayout">
          {jogosLimitados.length === 0 ? (
            <motion.div key="mensagem-vazia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ flex: '0 0 100%', maxWidth: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }} >
              <MensagemVazia>Nenhum mundo foi encontrado.</MensagemVazia>
            </motion.div>
          ) : (
            jogosLimitados.map((jogo) => (
              <motion.div key={jogo.id ?? jogo._id ?? jogo.titulo} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} >
                <JogoWrapper>
                  {gerenciavel && (
                    <>
                      <EditButton
                        className="world-action"
                        href={`/mundo/${jogo._id ?? jogo.id}`}
                        onMouseEnter={(e) => showTooltip("Editar mundo", e)}
                        onMouseMove={moveTooltip}
                        onMouseLeave={hideTooltip}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/mundo/${jogo._id ?? jogo.id}`;
                        }}
                      >
                        ✎
                      </EditButton>
                      <DeleteButton
                        className="world-action"
                        onMouseEnter={(e) => showTooltip("Excluir mundo", e)}
                        onMouseMove={moveTooltip}
                        onMouseLeave={hideTooltip}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedId(jogo._id ?? jogo.id);
                          setSelectedName(jogo.titulo ?? "");
                          setModalOpen(true);
                        }}
                      >
                        ✕
                      </DeleteButton>
                    </>
                  )}
                  <Jogo jogo={jogo} />
                </JogoWrapper>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </JogosContainer>

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

      {tooltip.visible && (
        <Tooltip style={{ top: tooltip.y, left: tooltip.x }}>
          {tooltip.text}
        </Tooltip>
      )}
    </GaleriaContainer>
  );
}
export default GaleriaDeJogos;