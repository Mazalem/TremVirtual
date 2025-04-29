import React from 'react';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  background-image: url("/fundo.png");
  min-height: 100vh;
  padding: 20px;
`;

const CoverPhoto = styled.div`
  width: 100%;
  height: 250px;
  background: url('https://via.placeholder.com/1200x250') center/cover no-repeat;
  position: relative;
`;

const ProfilePhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid white;
  position: absolute;
  bottom: -75px;
  left: 20px;
`;

const ProfileInfo = styled.div`
  margin-top: 100px;
  text-align: left;
  padding: 20px;
`;

const ProfileName = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ProfileButtons = styled.div`
  margin-top: 15px;
  button {
    margin-right: 10px;
  }
`;

function AreaUsuario() {
  return (
    <ProfileWrapper>
      <div className="container">
        <CoverPhoto>
          <ProfilePhoto src="public/fotoUsuario.png" alt="Profile" />
        </CoverPhoto>
        <ProfileInfo>
          <ProfileName>Seu Nome</ProfileName>
          <p>Bio do Usuario"</p>
          <ProfileButtons>
            <a href='/editarUsuario'><button className="btn btn-primary">Editar Usuário</button></a>
            <button className="btn btn-secondary">Opcao 2</button>
          </ProfileButtons>
        </ProfileInfo>
        <div className="mt-4">
          <h3>Sobre</h3>
          <p>Descrição do Usuário</p>
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default AreaUsuario;
