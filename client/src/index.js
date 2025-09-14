import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TelaPrincipal from './routes/TelaPrincipal';
import TelaJogo from './routes/TelaJogo';
import GaleriaDeMundos from './routes/GaleriaDeMundos';
import FormularioInsercao from './routes/FormularioInsercao';
import AreaUsuario from './routes/AreaUsuario';
import EditUser from './routes/EditUser';
import Erro from './components/Erro';
import LoginRegister from './routes/Login_Register';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import styled, { keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    background-image: url("/fundo.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: white;
    margin-top: ${({ semMargem = false }) => (semMargem ? '0' : '55px')};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/fundo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
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

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function Layout({ children }) {
  const location = useLocation();
  const pathname = location.pathname;

  const rotaValida = /^\/(home|jogo\/[^\/?#]+|mundo(\/[^\/?#]+)?|perfilUsuario|editarUsuario|galeria\/[^\/?#]+\/[^\/?#]+|projects\/[^\/?#]+)(\/)?([?#].*)?$/.test(pathname);

  const mostrarNavFooter = rotaValida;
  const removerMargem = !rotaValida && pathname !== '/';

  return (
    <>
      <GlobalStyle semMargem={removerMargem} />
      {mostrarNavFooter && <NavBar />}
      {children}
      {mostrarNavFooter && <Footer />}
    </>
  );
}

function AppRoutes() {
  const [dados, setDados] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [professor, setProfessor] = useState(null);
  const navigate = useNavigate();
  
  function RotaPrivada({ children }) {
    return isLoggedIn ? children : <Navigate to="/" />;
  }
  
  function RotaPublica({ children }) {
    useEffect(() => {
      fetch('/apiusers/autologin', {
        method: 'POST',
        credentials: 'include'
      })
        .then(res => res.json())
        .then(json => {
          setAutoLogin(json.sucesso);
          if (json.sucesso) {
            if (json.user?.tipo) {
              Cookies.set("tipo", json.user.tipo, { expires: 1, sameSite: 'strict' });
            }
            window.location.href = "/home";
          } else {
            Cookies.remove("tipo");
          }
        });
    }, []);
      return children;
  }  

  useEffect(() => {
  fetch('/apiusers/verificarLogin', { credentials: 'include' })
    .then(res => res.json())
    .then(json => {
      setIsLoggedIn(json.logado); 
      const isProfessor = json.user?.tipo === "Professor";
      setProfessor(isProfessor);

      if (json.logado && json.user?.tipo) {
        Cookies.set("tipo", json.user.tipo, { expires: 1, sameSite: 'strict' });
      } else {
        Cookies.remove("tipo");
      }
    })
    .catch(() => {
      setIsLoggedIn(false);
      setProfessor(false);
      Cookies.remove("tipo");
    })
    .finally(() => setLoading(false));
}, [navigate]);
  
  useEffect(() => {
    fetch('/apimundos/lista/todos/0')
      .then(res => res.json())
      .then(json => setDados(json.mundos))
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
        Carregando...
      </LoadingOverlay>
    );
  }

  function RotaProfessor({ children }) {
    const location = useLocation();
    if (!professor) {
      return <Erro codigo="404" texto="Página não encontrada."/>;
    }
    return children;
  }
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RotaPublica><LoginRegister/></RotaPublica>}/>
        <Route path="/home" element={<RotaPrivada><TelaPrincipal jogos={dados}/></RotaPrivada>} />
        <Route path="/jogo/:index" element={<RotaPrivada><TelaJogo jogos={dados}/></RotaPrivada>} />
        <Route path="/mundo" element={<RotaPrivada><RotaProfessor><FormularioInsercao/></RotaProfessor></RotaPrivada>} />
        <Route path="/mundo/:id" element={<RotaPrivada><RotaProfessor><FormularioInsercao/></RotaProfessor></RotaPrivada>} />
        <Route path="/perfilUsuario" element={<RotaPrivada><AreaUsuario/></RotaPrivada>} />
        <Route path="/editarUsuario" element={<RotaPrivada><EditUser/></RotaPrivada>} />
        <Route path="/galeria/:tipo/:pag" element={<RotaPrivada><GaleriaDeMundos/></RotaPrivada>} />
        <Route path="*" element={<Erro codigo="404" texto="Página não encontrada."/>} />
      </Routes>
    </Layout>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
