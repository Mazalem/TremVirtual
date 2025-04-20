import React from 'react';
import styled from 'styled-components';

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
  return (
    <Container>
      <TopSection>
        <Left>
          <Title>{props.titulo} | #{props.id}</Title>
          <Info>{props.autor} | ⌨︎ {props.reproducoes} | ❤ {props.likes}</Info>
        </Left>
        <Right>
          <Button><i className="bi bi-heart"></i></Button>
          <Button><i className="bi bi-share"></i></Button>
          <Button><i className="bi bi-gear"></i></Button>
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
