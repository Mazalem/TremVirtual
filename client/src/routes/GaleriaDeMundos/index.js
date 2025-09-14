import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components";
import GaleriaDeJogos from "../../components/GaleriaDeJogos";
import Erro from "../../components/Erro";

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
  max-width: 1110px;
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
  const { tipo, pag } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const [todos, setTodos] = useState([])
  const [dadosFiltrados, setDadosFiltrados] = useState([])
  const [id, setId] = useState()
  const [quantPag, setQuantPag] = useState(1)
  const [search, setSearch] = useState("")
  const [usuario, setUsuario] = useState(null)
  const limit = 30

  const pagAtual = Number.isInteger(Number(pag)) ? parseInt(pag, 10) : 1

  const buildHref = (p) => {
    const base = `/galeria/${tipo}/${p}`
    if (search && search.trim() !== "") {
      return `${base}?q=${encodeURIComponent(search.trim())}`
    }
    return base
  }

  useEffect(() => {
    fetch("/apiusers/verificarLogin", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => {
        setId(json.user?.id)
        setUsuario(json.user)
        })
  }, [])

  useEffect(() => {
    if (!tipo || !id) return
    const qFromUrl = params.get("q") || ""
    const url = `/apimundos/lista/${tipo}/${id}/${tipo === "todos" ? `?q=${qFromUrl}` : ""}`
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const m = Array.isArray(json.mundos) ? json.mundos : []
        setTodos(m)
        if (tipo === "todos") {
          setSearch(json.q || "")
        }
      })
  }, [tipo, id, pag, location.search])

  useEffect(() => {
    const base = Array.isArray(todos) ? todos : []
    const q = (search || "").trim().toLowerCase()
    const filtered = q === "" ? base : base.filter((item) =>
      (item.titulo || "").toLowerCase().includes(q)
    )
    setDadosFiltrados(filtered)
    setQuantPag(Math.max(1, Math.ceil(filtered.length / limit)))
  }, [todos, search, pagAtual, navigate])

  useEffect(() => {
    const qFromUrl = params.get("q") || ""
    if (qFromUrl !== search) {
      setSearch(qFromUrl)
    }
  }, [location.search])

  const startIndex = (pagAtual - 1) * limit
  const endIndex = startIndex + limit
  const exibicao = dadosFiltrados.slice(startIndex, endIndex)

  if (tipo === "criados" && usuario && usuario.tipo !== "Professor") {
    return <Erro codigo="404" texto="Página não encontrada.." />
  }
  
  return (
    <PageWrapper>
      <SearchWrapper>
        <FormControl
          placeholder={
            "Pesquisar em " +
            (tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : "Mundos") +
            "..."
          }
          value={search}
          onChange={(e) => {
            const v = e.target.value
            setSearch(v)
          }}
        />
      </SearchWrapper>

      <GaleriaWrapper>
        <GaleriaDeJogos
          jogos={exibicao}
          titulo={tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : "Mundos"}
          gerenciavel={tipo === "criados"}
          inicio={0} fim={29}
        />

        <nav aria-label="Page navigation" className="d-flex justify-content-center mt-4">
          <ul className="pagination d-flex gap-2">
            {pagAtual > 1 && (
              <li className="page-item">
                <CustomPageLink
                  href={buildHref(pagAtual - 1)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(buildHref(pagAtual - 1))
                  }}
                >
                  Anterior
                </CustomPageLink>
              </li>
            )}

            {pagAtual > 1 && (
              <li className="page-item">
                <CustomPageLink
                  href={buildHref(pagAtual - 1)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(buildHref(pagAtual - 1))
                  }}
                >
                  {pagAtual - 1}
                </CustomPageLink>
              </li>
            )}

            <li className="page-item">
              <CustomPageLink className="active">{pagAtual}</CustomPageLink>
            </li>

            {pagAtual < quantPag && (
              <li className="page-item">
                <CustomPageLink
                  href={buildHref(pagAtual + 1)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(buildHref(pagAtual + 1))
                  }}
                >
                  {pagAtual + 1}
                </CustomPageLink>
              </li>
            )}

            {pagAtual < quantPag && (
              <li className="page-item">
                <CustomPageLink
                  href={buildHref(pagAtual + 1)}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(buildHref(pagAtual + 1))
                  }}
                >
                  Próximo
                </CustomPageLink>
              </li>
            )}
          </ul>
        </nav>
      </GaleriaWrapper>
    </PageWrapper>
  )
}
