import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GaleriaDeJogos from "../../components/GaleriaDeJogos";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const GaleriaWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  align-items: center;
`;

const CustomPageLink = styled.a`
  color: #fff !important;
  border: 1px solid #fff !important;
  padding: 10px 15px;
  border-radius: 10px !important;
  display: flex;
  align-items: center;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: #463b3b6e;
    color: #ff6347 !important;
    cursor: pointer;
  }

  &.active {
    background-color: #463b3b6e !important;
    color: #ff6347 !important;
  }
`;

const FormControl = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff25;
  color: #fff;
  caret-color: #fff;
  font-size: 1rem;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    background-color: #ffffff42;
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

export default function GaleriaDeMundos() {
  const { tipo, pag } = useParams();
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [id, setId] = useState();
  const [quantPag, setQuantPag] = useState(1);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const q = params.get("q");

  useEffect(() => {
    fetch("/apiusers/verificarLogin", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => setId(json.user?.id))
      .catch((err) => console.error("Erro ao carregar o id", err));
  }, []);

  useEffect(() => { 
    if (!tipo || !pag || !id) return;

    const url =
      tipo === "todos"
        ? `/apimundos/lista/${tipo}/${id}/${pag}?q=${q || ""}`
        : `/apimundos/lista/${tipo}/${id}/${pag}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setDados(json.dados);
        setDadosFiltrados(json.dados);
        setQuantPag(json.totalPaginas);
      })
      .catch((err) => console.error("Erro ao carregar mundos", err));
  }, [tipo, pag, id, q]);

  useEffect(() => {
    if (!search) {
      setDadosFiltrados(dados);
    } else {
      setDadosFiltrados(
        dados.filter((item) =>
          item.titulo.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, dados]);

  const pagAtual = parseInt(pag);

  const buildHref = (p) => {
    return tipo === "todos"
      ? `/galeria/${tipo}/${p}?q=${q || ""}`
      : `/galeria/${tipo}/${p}`;
  };

  return (
    <PageWrapper>
      <SearchWrapper>
        <FormControl
          placeholder={
            "Pesquisar em " +
            tipo.charAt(0).toUpperCase() +
            tipo.slice(1) +
            "..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchWrapper>

      <GaleriaWrapper>
        <GaleriaDeJogos
          jogos={dadosFiltrados}
          titulo={tipo.charAt(0).toUpperCase() + tipo.slice(1)}
        />

        <nav
          aria-label="Page navigation"
          className="d-flex justify-content-center mt-4"
        >
          <ul className="pagination d-flex gap-2">
            {pagAtual > 1 && (
              <li className="page-item">
                <CustomPageLink href={buildHref(pagAtual - 1)}>
                  Anterior
                </CustomPageLink>
              </li>
            )}

            {pagAtual > 1 && (
              <li className="page-item">
                <CustomPageLink href={buildHref(pagAtual - 1)}>
                  {pagAtual - 1}
                </CustomPageLink>
              </li>
            )}

            <li className="page-item">
              <CustomPageLink className="active">{pagAtual}</CustomPageLink>
            </li>

            {pagAtual < quantPag && (
              <li className="page-item">
                <CustomPageLink href={buildHref(pagAtual + 1)}>
                  {pagAtual + 1}
                </CustomPageLink>
              </li>
            )}

            {pagAtual < quantPag && (
              <li className="page-item">
                <CustomPageLink href={buildHref(pagAtual + 1)}>
                  Próximo
                </CustomPageLink>
              </li>
            )}
          </ul>
        </nav>
      </GaleriaWrapper>
    </PageWrapper>
  );
}
