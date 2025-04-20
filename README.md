# 🚂Trem Virtual - Plataforma para Metaverso na Educação Básica

Este repositório contém o projeto de pesquisa "Desenvolvimento de uma Plataforma para Metaverso como
Estratégia Tecnológica Inovadora à Educação Básica", desenvolvido no Instituto Federal do Sudeste de
Minas Gerais - Campus Manhuaçu, com financiamento da FAPEMIG.

# 🎯Objetivo

Criar uma plataforma baseada em ambientes A-Frame para promover o engajamento de alunos da
educação básica por meio da imersão em mundos virtuais. A primeira etapa do projeto consiste
na criação de um mundo virtual com temática de museu, com o objetivo de ensinar a 
história do município de Manhuaçu de forma inovadora e interativa.

# 🗂Estrutura do Repositório
├── client     # Frontend (React)

├── server     # Backend (Node.js + Express)

# ⚙️Pré-requisitos
- Node.js
- MongoDB
  - Crie uma conexão padrão com a URI: `mongodb://127.0.0.1:27017`
- Docker (Linux)

# 🚀Instalação e Execução

### 🔵Frontend (React)

1. Vá para o diretório onde deseja clonar o projeto.
2. Execute os comandos abaixo no terminal:

```
npx create-react-app client
```
> ' y ' para aceitar a instalação
```
cd client
npm install react-dom react-router-dom react-scripts bootstrap bootstrap-icons styled-components
```
> ⚠️ Ignore quaisquer *warnings* durante a instalação.

3. Substitua as pastas `public/` e `src/` pelos arquivos do seu projeto.
4. No terminal da pasta `client`, execute:
```
`npm run build`
```
### 🟡Backend (Node.js)

1. Baixe a pasta `server` e coloque no mesmo diretório da pasta `client`.
2. No terminal, navegue até a pasta `server` e execute:
```
npm install mongodb multer adm-zip express path fs child_process net express-session cors dotenv
```
3. Para iniciar o servidor:
```
npm start
```
> Para encerrar o servidor, use `Ctrl + C`.

> Caso queira povoar seu banco, no `client`, na pasta `src`, há um arquivo `dados.json` com alguns dados de teste.

# 🔁Alterações
- Ao modificar o backend:
  - Finalize com `Ctrl + C` e reinicie com `npm start` (no terminal integrado do backend).
- Ao modificar o frontend:
  - Execute `npm run build` novamente (no terminal integrado do frontend) e recarregue a página (não é necessário reiniciar o backend).
## 📬Contato
Caso tenha dúvidas ou sugestões, entre em contato com a equipe do projeto por meio do IFSEMG Campus Manhuaçu através do email `matheus.ifsudestemg@gmail.com`.
