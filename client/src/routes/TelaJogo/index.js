import React from 'react';
import styled from 'styled-components';
import {useParams} from "react-router-dom";
import InfoJogo from '../../components/InfoJogo';
import ListaDeJogos from '../../components/ListaDeJogos';
import { useEffect, useState } from 'react';
import Iframe from '../../components/Iframe';

const TelaJogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  align-items: flex-start;
  gap: 10px;
  margin-top: 4%;
`;

const IframeInfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const IframeContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(44, 37, 37, 0.42);
  margin-bottom: 0;
`;

const InfoJogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListaDeJogosContainer = styled.div`
  width: 300px;
  padding-left: 20px;
`;

function TelaJogo(props) {
  const { index } = useParams();

  const [jogo, setJogo] = useState([]);
  
    useEffect(() => {
      fetch('/apimundos/consulta/'+index)
        .then(res => res.json())
        .then(json => setJogo(json))
        .catch(err => console.error('Erro ao buscar dados:', err));
    }, []);

  return (
    <TelaJogoContainer>
      <IframeInfoContainer>
        <IframeContainer>
          <Iframe src={jogo.src} title={jogo.titulo} />
        </IframeContainer>
        <InfoJogoContainer>
          <InfoJogo 
            id={jogo._id}
            titulo={jogo.titulo }
            autor={jogo.autor}
            reproducoes={jogo.reproducoes}
            likes={jogo.likes}
            descricao={jogo.descricao}
            lancamento={jogo.lancamento}
            versao={jogo.versao}
          />
        </InfoJogoContainer>
      </IframeInfoContainer>
      <ListaDeJogosContainer>
        <ListaDeJogos jogos={props.jogos}/>
      </ListaDeJogosContainer>
    </TelaJogoContainer>
  );
}

export default TelaJogo;
