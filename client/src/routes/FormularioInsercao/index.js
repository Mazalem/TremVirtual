import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Erro from "../../components/Erro";

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
  flex: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
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

const BotaoLink = styled.a`
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #463b3b91;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  transition: background-color 0.3s, border-color 0.3s;
  color: white;
  font-size: 20px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #5f505091;
    border-color: #fff;
    color: #ff6347;
  }
`;

function FormularioInsercao() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [mundo, setMundo] = useState(null);
  const [permitido, setPermitido] = useState(null);

  useEffect(() => {
    fetch("/apiusers/verificarLogin", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        setUsuario(json.user);
      })
      .catch((err) => console.error("Erro ao carregar o usuário", err));
  }, []);

  useEffect(() => {
    if (!id || !usuario) return;

    fetch(`/apimundos/consultaResponsavel/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.responsavelId && data.responsavelId === usuario.id) {
          fetch(`/apimundos/consulta/${id}`)
            .then((res) => res.json())
            .then((mundoData) => {
              setMundo(mundoData);
              setPermitido(true);
            })
            .catch((err) => {
              console.error("Erro ao carregar mundo:", err);
              setPermitido(false);
            });
        } else {
          setPermitido(false);
        }
      })
      .catch((err) => {
        console.error("Erro ao verificar responsável:", err);
        setPermitido(false);
      });
  }, [id, usuario]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(event.target);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const url = id ? `/apimundos/edicao/${id}` : "/apimundos";
    fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          return response.json().then((errData) => {
            throw new Error(errData.erro || "Erro desconhecido do servidor");
          });
        }
        return response.json();
      })
      .then(() => {
        setLoading(false);
        setTimeout(() => {
          setSuccess(true);
          setTimeout(() => navigate('/home'), 2000);
        }, 100);
      })
      .catch((error) => {
        setLoading(false);
        if (error.name === "AbortError") {
          console.error(
            "Erro ao enviar o arquivo: Requisição excedeu o tempo limite (Timeout)."
          );
        } else {
          console.error("Erro ao enviar o arquivo:", error.message || error);
        }
      });
  };

  if (id && permitido === false) {
    return <Erro codigo="403" texto="Você não tem permissão para editar este mundo." />;
  }

  if (id && permitido === null) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
        Carregando...
      </LoadingOverlay>
    );
  }

  return (
    <>
      <GlobalStyle />

      <Container>
        <TitleContainer>
          <BotaoLink href={id ? "/perfilUsuario" : "/home"}>
            <i className="bi bi-arrow-left"></i>
          </BotaoLink>
          <Title>{id ? "Editar Jogo" : "Adicionar Jogo"}</Title>
        </TitleContainer>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="nome" className="form-label">
              Nome do Jogo
            </label>
            <FormControl
              name="nome"
              type="text"
              id="nome"
              placeholder="Digite o nome do jogo"
              defaultValue={mundo?.titulo || ""}
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="form-label">
              Descrição
            </label>
            <FormTextArea
              name="descricao"
              id="descricao"
              rows="3"
              maxlength="80"
              placeholder="Digite a descrição do jogo"
              defaultValue={mundo?.descricao || ""}
              required
            />
          </div>

          <div>
            <label htmlFor="autor" className="form-label">
              Autor
            </label>
            <FormControl
              name="autor"
              type="text"
              id="autor"
              placeholder="Digite o nome do autor"
              defaultValue={mundo?.autor || ""}
              required
            />
          </div>

          <div>
            <label htmlFor="jogoZip" className="form-label">
              {id
                ? "Arquivo ZIP do Jogo (se quiser substituir)"
                : "Arquivo ZIP do Jogo"}
            </label>
            <FormControl
              name="jogoZip"
              type="file"
              id="jogoZip"
              accept=".zip"
              required={!id}
            />
            {id && (
              <small style={{ display: "block", marginBottom: "10px", marginLeft: "160px" }}>
                Arquivo atual já cadastrado. Envie um novo apenas se quiser substituir.
              </small>
            )}
          </div>

          <input type="hidden" name="responsavelId" value={usuario?.id} />

          <div>
            <label className="form-label">Visibilidade</label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="visibilidade"
                  value="publico"
                  defaultChecked={mundo?.visibilidade === "publico" || !id}
                />
                Público
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="visibilidade"
                  value="privado"
                  defaultChecked={mundo?.visibilidade === "privado"}
                />
                Privado
              </RadioLabel>
            </RadioGroup>
          </div>
          <br />
          <div>
            <Botao type="submit">{id ? "Salvar Alterações" : "Adicionar Jogo"}</Botao>
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
            <i
              className="bi bi-check-circle"
              style={{ color: "green", marginRight: "8px" }}
            />
            {id ? "Mundo editado com sucesso!" : "Mundo criado com sucesso!"}
          </SuccessOverlay>
        )}
      </Container>
    </>
  );
}

export default FormularioInsercao;

