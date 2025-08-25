import React from 'react';
import styled from 'styled-components';
import Botao from '../BotaoInfoJogo'
import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react';

const Container = styled.div`
  color: white;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: rgba(44, 37, 37, 0.42);
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin: 0 0 5px 0;
  font-weight: bold;
  font-size: 18px;
`;

const Info = styled.p`
  margin: 0;
  color: #ffffff;
`;

const Right = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  i {
    font-size: 16px;
  }
`;

const Separator = styled.hr`
  margin: 20px 0;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Description = styled.div`
  flex: 1;
  color: #ffffff;
`;

const ReleaseDate = styled.div`
  color: #999;
`;

function InfoJogo(props) {
  const { index: mundoId } = useParams();
  const [userId, setUserId] = useState(null);
  const [liked, setLiked] = useState(false); 
  const [likes, setLikes] = useState(props.likes); 

 useEffect(() => {
  fetch('/apiusers/verificarLogin', { credentials: 'include' })
    .then(res => res.json())
    .then(json => {
      if (json.user) {
        setUserId(json.user.id);
        fetch(`/apimundos/${mundoId}/isLiked?userId=${json.user.id}`)
          .then(res => res.json())
          .then(data => {
            setLiked(data.liked);
            setLikes(data.likes);
          });
      } else {
        fetch(`/apimundos/consulta/${mundoId}`)
          .then(res => res.json())
          .then(mundo => setLikes(mundo.likes));
      }
    })
    .catch(() => {});
}, [mundoId]);

  const handleLike = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/apimundos/${mundoId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      setLiked(data.liked);
      setLikes(data.likes);
    } catch (error) {
      console.error("Erro ao curtir/descurtir:", error);
    }
  };

  return (
    <Container>
      <TopSection>
        <Left>
          <Title>
            {props.titulo}
            <a style={{color: 'rgba(255, 255, 255, 0.15)', marginLeft: '5px'}}>#{props.id}</a>
          </Title>
          <Info>{props.autor} | ⌨︎ {props.reproducoes} | ❤ {likes}</Info>
        </Left>
        <Right>
          <Botao 
            unclicked="bi bi-heart"
            clicked="bi bi-heart-fill"
            change={true}
            isActive={liked}
            onClick={handleLike}
          />
          <Botao unclicked="bi bi-share" clicked="bi bi-share" change={false}/>
          <Botao unclicked="bi bi-gear" clicked="bi bi-gear" change={false}/>
        </Right>
      </TopSection>
      <Separator />
      <BottomSection>
        <Description>{props.descricao}</Description>
        <ReleaseDate>{props.lancamento} - v{props.versao}</ReleaseDate>
      </BottomSection>
    </Container>
  );
}

export default InfoJogo;
