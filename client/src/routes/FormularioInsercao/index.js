import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Botao = styled.button`
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 0;
  background-color: #463b3b91;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  transition: background-color 0.3s, border-color 0.3s;
  color: white;
  font-size: 18px;
  text-decoration: none;
  width: 100%;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #5f505091;
    border-color: #fff;
    color: #ff6347;
  }
`;

const FormControl = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #17000B;
  color: #fff;
  caret-color: #fff;
  width: 100%;
  font-size: 16px;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    background-color:rgb(32, 0, 16);
    border-color: #ddd;
    outline: none;
    color: #fff;
  }

  &:focus::placeholder {
    color: #ddd;
  }

  &:focus-visible {
    box-shadow: none;
    border-color: #ddd;
  }
`;

const FormTextArea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #17000B;
  color: #fff;
  caret-color: #fff;
  width: 100%;
  font-size: 16px;
  resize: vertical;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    background-color:rgb(32, 0, 16);
    border-color: #ddd;
    outline: none;
    color: #fff;
  }

  &:focus::placeholder {
    color: #ddd;
  }

  &:focus-visible {
    box-shadow: none;
    border-color: #ddd;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto;
  padding: 20px;
  background-color: #2c2525d7;
  border-radius: 8px;
  border: solid 1px white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 36px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  z-index: 999;
`;

const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ff6347;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
`;

const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 1.8em;
  z-index: 998;
  padding: 20px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

function FormularioInsercao() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usuario, setUsuario] = useState("");
  
  useEffect(() => {
    fetch('/apiusers/verificarLogin', { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        setUsuario(json.user);
      })
      .catch(err => console.error('Erro ao carregar o usuário', err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(event.target);

    fetch("/apimundos", {
      method: "POST",
      body: formData,
      credentials: "include"
    })
    .then((response) => response.json())
    .then((data) => {
      setLoading(false);
      setTimeout(() => {
        setSuccess(true);
      }, 100);
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    })
    .catch((error) => {
      console.error("Erro ao enviar o arquivo:", error);
      setLoading(false);
    });
  };

  return (
    <>
      <GlobalStyle />

      <Container>
        <Title>Adicionar Jogo</Title>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="nome" className="form-label">Nome do Jogo</label>
            <FormControl name="nome" type="text" id="nome" placeholder="Digite o nome do jogo" required />
          </div>

          <div>
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <FormTextArea name="descricao" id="descricao" rows="3" placeholder="Digite a descrição do jogo" required />
          </div>

          <div>
            <label htmlFor="autor" className="form-label">Autor</label>
            <FormControl name="autor" type="text" id="autor" placeholder="Digite o nome do autor" required />
          </div>

          <div>
            <label htmlFor="jogoZip" className="form-label">Arquivo ZIP do Jogo</label>
            <FormControl name="jogoZip" type="file" id="jogoZip" accept=".zip" />
          </div>

          <input type="hidden" name="responsavelId" value={usuario.id}/>

          <div>
            <Botao type="submit">Adicionar Jogo</Botao>
          </div>
        </form>

        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
            Carregando...
          </LoadingOverlay>
        )}

        {success && (
          <SuccessOverlay>
              <i className="bi bi-check-circle" style={{ color: 'green', marginRight: '8px' }} />  Mundo criado com sucesso!
          </SuccessOverlay>
        )}
      </Container>
    </>
  );
}

export default FormularioInsercao;
