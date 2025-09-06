import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "../../components/Carousel";
import GaleriaDeJogos from "../../components/GaleriaDeJogos";
import Nota from "../../components/Nota";

const TelaPrincipalContainer = styled.div`
  margin-top: 5%;
`;

const ContentWrapper = styled.div`
  padding: 15px;
`;

function TelaPrincipal(props) {
  const [todosJogos, setTodosJogos] = useState([]);

  useEffect(() => {
    fetch("/apimundos/lista/todos/0/1?q=")
      .then((res) => res.json())
      .then((json) => {
        setTodosJogos(json.dados.slice(0, 15));
      })
      .catch((err) => console.error("Erro ao buscar mundos:", err));
  }, []);

  return (
    <TelaPrincipalContainer>
      <ContentWrapper className="container">
        <div className="row">
          <div className="col-12">
            <Carousel jogos={props.jogos} inicio={0} fim={3} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GaleriaDeJogos titulo={"Aventura >"} jogos={props.jogos} inicio={0} fim={5} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GaleriaDeJogos titulo={"Trivia >"} jogos={props.jogos} inicio={5} fim={10} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <GaleriaDeJogos titulo={"Todos >"} jogos={todosJogos} />
          </div>
        </div>
        <div className="row" id="sobre">
          <div className="col-12">
            <Nota
              title={"O que é Trem Virtual?"}
              text={
                "O projeto Trem Virtual é uma iniciativa de pesquisa desenvolvido pelo Instituto Federal do Sudeste de Minas Gerais (IFSudesteMG), campus Manhuaçu. Com o objetivo de democratizar o acesso à realidade virtual nas escolas de Minas Gerais, o projeto visa oferecer uma experiência imersiva e inovadora no ambiente educacional. Através do Trem Virtual, buscamos proporcionar aos alunos e professores uma plataforma de realidade virtual acessível, que pode ser utilizada para enriquecer o processo de ensino-aprendizagem e explorar novos horizontes educacionais. Este projeto é um passo significativo para levar tecnologias avançadas a instituições de ensino, promovendo igualdade de oportunidades e ampliando as possibilidades educacionais em nossa região."
              }
              videoSrc={"/videoapresentacao.webm"}
            />
          </div>
        </div>
      </ContentWrapper>
    </TelaPrincipalContainer>
  );
}

export default TelaPrincipal;
