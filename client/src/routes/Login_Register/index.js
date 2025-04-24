import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideOverlay = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  margin-left:22%;
  background-color: rgba(44, 37, 37, 0.42);
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  transition: all 0.6s ease-in-out;
  display: flex;

  &.right-panel-active .sign-up-container {
    transform: translateX(0);
    opacity: 1;
    z-index: 5;
    animation: ${show} 0.6s forwards;
  }
  &.right-panel-active .sign-in-container {
    transform: translateX(100%);
    z-index: 1;
  }
  &.right-panel-active .overlay-container {
    transform: translateX(0);
    animation: ${slideOverlay} 0.6s forwards;
  }
  &.right-panel-active .overlay {
    transform: translateX(50%);
  }
  &.right-panel-active .overlay-left {
    transform: translateX(0);
  }
  &.right-panel-active .overlay-right {
    transform: translateX(20%);
  }
`;

const Form = styled.form`
  align-items:center;
  text-align:center;
  justify-content:center;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  transition: all 0.6s ease-in-out;
`;

const SignInContainer = styled(FormContainer)`
  margin-top:15%;
  left: 0;
  width: 50%;
  z-index: 2;
`;

const SignUpContainer = styled(FormContainer)`
  margin-left: 50%;
  width: 50%;
  margin-top:10%;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  ${Container}.right-panel-active & {
    transform: translateX(-100%);
  }
`;

const Overlay = styled.div`
  background: linear-gradient(to right,rgb(70, 3, 3),rgb(173, 10, 10));
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  ${Container}.right-panel-active & {
    transform: translateX(50%);
  }
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const OverlayLeft = styled(OverlayPanel)`
margin-left: 10%;
  transform: translateX(-20%); 
`;

const OverlayRight = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
`;

const Button = styled.button`
  color: white;
  border: 1px solid #ddd;
  border-radius: 0 4px 4px 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover,
  &:focus {
    background-color: #463b3b91;
    border-color: #FFF;
    color: #ff6347;
  }

  i {
    color: #fff;
    font-size: 16px;
  }

  i:hover {
    color: #ff6347;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const FormControl = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #17000B;
  color: #fff;
  caret-color: #fff;
  width: 80%;
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

const RadioInput = styled.input`
  margin-right: 10px;
`;

const RadioLabel = styled.label`
  color: #fff;
  margin-right: 20px;
  font-size:20px;
`;

export default function Login() {
  const [rightPanel, setRightPanel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const url = process.env.REACT_APP_SERVIDOR;
  const navigate = useNavigate();
  
  function handleLoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    fetch('/apiusers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(jsonData)
    })
      .then(res => res.json())
      .then(json => {
        if (json.sucesso == true) {
          window.location.href = "/home";
        } else {
          alert(json.mensagem || 'Falha no login');
        }
      })
      .catch(() => alert('Erro ao realizar login'));
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    fetch('/apiusers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(jsonData)
    })
      .then(res => res.json())
      .then(json => {
        if (json.sucesso == true) {
          alert(json.mensagem);
          window.location.href = "/";
        } else {
          alert(json.mensagem);
        }
      })
      .catch(() => alert('Erro ao realizar login'));
  }

  return (
    <Container className={rightPanel ? 'right-panel-active' : ''}>
      <SignUpContainer>
        <Form onSubmit={handleRegisterSubmit}>
          <Title>Registrar-se</Title><br/>
          <FormControl type="text" placeholder="Nome" name='nome' required />
          <FormControl type="email" placeholder="Email" name='email' required />
          <FormControl type="password" placeholder="Senha" name='senha' required/>
          <br/><label for="tipo">Você é:</label>
          <br/><RadioInput type='radio' id='professor' name='tipo' value="Professor" required/>
          <RadioLabel htmlFor='professor'>Professor</RadioLabel>
          <RadioInput type='radio' id='aluno' name='tipo' value="Aluno" />
          <RadioLabel htmlFor='aluno'>Aluno</RadioLabel><br/><br></br>

          <Button type='Submit' style={{marginLeft: 35 + '%'}}>Registrar-se</Button>
        </Form>
      </SignUpContainer>

      <SignInContainer>
        <Form onSubmit={handleLoginSubmit}>
          <Title>Login</Title><br/>
          <FormControl type="email" placeholder="Email" name='email' required />
          <FormControl type="password" placeholder="Password" name='senha' required />
          <Button type='Submit' style={{marginLeft: 40 + '%'}}>Login</Button>
        </Form>
      </SignInContainer>

      <OverlayContainer>
        <Overlay>
          <OverlayLeft>
            <Title>Já possui conta?</Title>
            <Text>Faça já o Login e divirta-se aprendendo!</Text>
            <Button onClick={() => setRightPanel(false)}>Login</Button>
          </OverlayLeft>

          <OverlayRight>
            <Title>Primeira Vez Aqui?</Title>
            <Text>Registre-se agora e tenha acesso à nova era educacional!</Text>
            <Button onClick={() => setRightPanel(true)}>Registrar-se</Button>
          </OverlayRight>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
}