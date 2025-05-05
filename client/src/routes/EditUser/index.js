import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from 'react';
import MessageOverlay from "../../components/MessageOverlay";

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

  &:hover {
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

const RadioGroup = styled.div`
  display: flex;
  gap: 35%;
  margin-top: 10px;
  align-items:center;
  justify-content: center;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  background-color: transparent;

  &:checked {
    background-color: #ff6347;
    border-color: #ff6347;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
  }
`;

function FormularioInsercao() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [logado, setLogado] = useState([]);
  const [tipo, setTipo] = useState('Professor');

  function handleTipoChange(event){
    setTipo(event.target.value);
  };

  function togglePassword() {
    setShowPassword(prev => !prev);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
  
    const formData = new FormData(event.target);
  
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      senha: formData.get("senha"),
      tipo: formData.get("tipo"),
    };
  
    fetch("/apiusers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if (json.success) {
          setSuccess(true);
          setMensagem(json.mensagem);
          setTimeout(() => {
            setMensagem('');
            window.location.href = "/perfilUsuario";
          }, 2000);
        } else {
          setFailure(true);
          setMensagem(json.mensagem);
          setTimeout(() => {
            setFailure(false);
            setMensagem("");
          }, 1000);
        }
      })
      .catch((error) => {
        window.location.href = "/perfilUsuario";
        alert("Erro ao atualizar usuário.");
      });
  };  

  useEffect(() => {
    fetch('/apiusers/verificarLogin', { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        setLogado(json.user);
        setTipo(json.user.tipo);
      })
      .catch(() => {
        fetch('/apiusers/logout', { credentials: 'include' });
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Editar Usuário</Title>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="nome" className="form-label">Nome do Usuário</label>
            <FormControl name="nome" type="text" id="nome" placeholder="Digite o nome do Usuário" value={logado.nome || ''} required/>
          </div>

          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <FormControl  name="email" type="email" id="email" placeholder="Digite o email do Usuário" value={logado.email || ''} required/>
          </div>

          <div>
            <label htmlFor="senha" className="form-label">Senha</label>
            <div style={{ display: "flex" }}>
              <FormControl name="senha" type={showPassword ? "text" : "password"} id="senha" placeholder="Digite a senha" value={logado.senha || ""} required />
              <Botao style={{ maxWidth: "40px", maxHeight: "46px", marginLeft: "5px" }} type="button"  onClick={togglePassword} >
                <span id="icone"> <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i> </span>
              </Botao>
            </div>
          </div>

          <div>
            <label htmlFor="tipo" className="form-label">Tipo de Usuário</label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput type="radio" name="tipo" value="Professor" checked={tipo === 'Professor'} onChange={handleTipoChange} />
                Professor
              </RadioLabel>
              <RadioLabel>
                <RadioInput type="radio" name="tipo" value="Aluno" checked={tipo === 'Aluno'} onChange={handleTipoChange} />
                Aluno
              </RadioLabel>
            </RadioGroup>
          </div><br/>

          <div>
            <Botao type="submit">Editar Usuário</Botao>
          </div>
        </form>

        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
            Carregando...
          </LoadingOverlay>
        )}

        {(
          <MessageOverlay
            condicao={success}
            sucesso={success}
            mensagem={mensagem}
          />
        )}
        
        {(
          <MessageOverlay
          condicao = {failure}
          sucesso = {!failure}
          mensagem = {mensagem}
          />
        )}

      </Container>
    </>
  );
}

export default FormularioInsercao;
