import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from 'react';

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

const EditButton = styled.button`
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
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 20px;
`;

const WorldsTitle = styled.h2`
  margin: 0;
`;

const WorldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
`;

const WorldCard = styled.div`
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
  }
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

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [mundos, setMundos] = useState([]);

  useEffect(() => {
    fetch('/apiusers/verificarLogin', { credentials: 'include' })
      .then(res => res.json())
      .then(json => setUsuario(json.user))
      .catch(err => console.error('Erro ao carregar o usuário', err));
  }, []);
  
  useEffect(() => {
    if (usuario && usuario.id) {
      fetch('/apimundos/lista/criados/' + usuario.id + '/1')
        .then(res => res.json())
        .then(json => {
          const ultimos6 = json.dados.slice(-6).reverse();
          setMundos(ultimos6);
        })
        .catch(() => {});
    }
  }, [usuario]);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ProfileSection>
          <Avatar style={{ backgroundImage: `url('https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png')` }} />
          <Name>{usuario?.nome}</Name>
          <a href="/editarUsuario"><EditButton>Editar perfil</EditButton></a>
        </ProfileSection>

        <WorldsSection>
          <WorldsHeader>
            <WorldsTitle>Meus mundos virtuais</WorldsTitle>
          </WorldsHeader>

          <WorldsContainer>
            {mundos.map((mundo, i) => (
              <a key={i} href={`/jogo/${mundo._id}`}>
                <WorldCard>
                  <Thumb style={{ backgroundImage: `url(${mundo.imagem})` }} />
                  <WorldInfo>
                    <WorldTitle>{mundo.titulo}</WorldTitle>
                    <WorldDesc>{mundo.autor}</WorldDesc>
                    <WorldMeta>{mundo.lancamento} · {mundo.versao}</WorldMeta>
                  </WorldInfo>
                </WorldCard>
              </a>
            ))}
          </WorldsContainer>

          <Footer>
            <ViewMore href="/galeria/criados/1">Ver Mais</ViewMore>
          </Footer>
        </WorldsSection>
      </Wrapper>
    </>
  );
};

export default Perfil;
