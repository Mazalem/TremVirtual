import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import AreaUsuarioOffCanvas from '../AreaUsuarioOffCanvas';
import SearchForm from '../SearchForm';
import { useNavigate } from "react-router-dom";

const Navbar = styled.nav`
  background-color: #2c2525d7;
  padding: 10px 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const ContainerFluid = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const NavbarBrand = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
`;

const NavbarBrandImage = styled.img`
  margin-right: 10px;
`;

const NavbarNav = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    background-color: #2c2525d7;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 10px 0;
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }

  &.active {
    display: flex;
  }
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0;
  margin-right: 10px;
`;

const NavLink = styled.a`
  color: #fff;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  transition: color 0.3s ease, border 0.3s ease;
  border: 1px solid transparent;
  border-radius: 10px;
  border: 1px solid #fff;

  &:hover {
    background-color: #463b3b6e;
    color: #ff6347;
    cursor: pointer;
  }

  i {
    margin-right: 5px;
  }
`;

const DisplayText = styled.b`
  font-size: 1.25rem;
  font-weight: 700;
`;

const NavbarForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 20px;
  margin-right: 20px;

  @media (min-width: 769px) {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    justify-content: center;
    margin: 10px 0;
  }
`;

const FormControl = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  margin-right: -1px;
  padding: 5px 10px;
  background-color: transparent;
  color: #fff;
  caret-color: #fff;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    background-color: transparent;
    border-color: #ddd;
    outline: none;
    color: #fff;
  }

  &:focus::placeholder {
    color: #fff;
  }

  &:focus-visible {
    box-shadow: none;
    border-color: #ddd;
  }
`;

const BtnSubmit = styled.button`
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

const OffCanvasTrigger = styled.a`
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #ff6347;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: 1px solid #fff;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  display: none;
  padding: 5px 10px;
  transition: all 0.3s;

  &:hover {
    background-color:rgba(90, 76, 76, 0.38);
  }

  @media (max-width: 1024px) {
    display: block;
  }
`;

const NavbarControls = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
  }

  @media (max-width: 768px) {
    order: 1;
    align-items: center;
    justify-content: center;
  }
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

function NavBar() {
  const navigate = useNavigate();
  const toggleMenu = () => {
    const nav = document.getElementById('navbarNav');
    nav.classList.toggle('active');
  };
  
  const [usuario, setUsuario] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('/apiusers/verificarLogin', { credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        setUsuario(json.user.nome);
      })
      .catch(err => console.error('Erro ao carregar o usuário', err));
  }, []);

   const handleSearch = (event) => {
    navigate(`/galeria/todos/1?q=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <div>
      <Navbar className="navbar navbar-expand-lg navbar-dark">
        <ContainerFluid className="container-fluid">
          <NavbarBrand className="navbar-brand" href='/home'>
            <NavbarBrandImage src='/trem.png' alt='Logo do Site' />
            <DisplayText className="display-6">Trem Virtual</DisplayText>
          </NavbarBrand>
          <ToggleButton onClick={toggleMenu}>
            <i className="bi bi-list"></i>
          </ToggleButton>
          <NavbarControls>
            <NavbarNav id="navbarNav">
            <NavItem className="nav-item">
              <NavLink className="nav-link" href="/home">
                <i className="bi bi-house-door-fill"></i> Home
              </NavLink>
            </NavItem>

            <OffCanvasTrigger
              className="nav-link"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasUsuario"
              aria-controls="offcanvasUsuario"
            >
            <NavItem className="nav-item">
              <NavLink className="nav-link">
              <i className="bi bi-person-circle"></i> {usuario}
              </NavLink>
            </NavItem>
            </OffCanvasTrigger>
          </NavbarNav>

            <SearchForm placeholder="Pesquisar..." onSubmit={handleSearch} onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}/>
          </NavbarControls>
        </ContainerFluid>
      </Navbar>
      <AreaUsuarioOffCanvas />
    </div>
  );
}

export default NavBar;
