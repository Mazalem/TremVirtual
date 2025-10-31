# Novo Museu Virtual (Trem Virtual)

Este projeto foi projetado por Pedro Borela.

## Trabalhos Relacionados

- Acesse esse [site que lista 30 museus virtuais](https://educacao.sme.prefeitura.sp.gov.br/noticias/30-museus-virtuais-para-voce-visitar-sem-sair-de-casa/)
- Faça uma análise de funcionalidades destes museus virtuais e salve [nesta planilha ](https://docs.google.com/spreadsheets/d/1cLrjxU_usPfNqVd43Tkb6Te5HVrMuZyO6V4CfmDqfn0/edit?usp=sharing)

**OBSERVAÇÃO**:
- Somente deverão ser considerados museus virtuais como tour virtual. Exemplos: `Google Arts & Culture` e `Museu da Casa de Portinari`
- Os museus que estiverem usando o `Google Art & Culture`, suas funcionalidades devem ser registradas na coluna `Google Art & Culture` 
- Cada museu virtual deverá ser analisado a partir de 2 dispositivos: `Computador` e `Celular`. Registre as funcionalidades conforme as abas da planilha relacionada com o dispositivo.

## Histórias do Usuário

**Prioridade Alta**  
1. Como um estudante, eu quero acessar o Museu Virtual para conhecer a história de Manhuaçu.  
2. Como um estudante, quero explorar um museu virtual de Manhuaçu, para aprender sobre a história e cultura da minha cidade de uma maneira interativa e imersiva pelo XR headset.  
3. Como um estudante, quero participar de simulações históricas em realidade virtual, para entender melhor os eventos históricos de Manhuaçu, por meio do celular ou desktop.  
4. Como usuário, quero tocar/clicar em ícones “(i)” espalhados pelo ambiente para abrir pop-ups com detalhes da obra, sem sair da experiência imersiva.  
5. Como usuário, quero poder clicar em pontos do espaço para abrir fotos esféricas 360°, para ter visões fotográficas de alta resolução de determinados ambientes.  
6. Como usuário, quero acionar vídeos em 360° em alguns pontos, para assistir a registros animados do local em imersão completa.  

**Prioridade Média**  
7. Como estudante e usuário, quero que tenha várias portas que podem me direcionar para ambientes específicos, para contribuir com o entendimento dos locais históricos.  
8. Como usuário (mobile), quero dar “pinch” e “spread” (movimento de pinçar) na tela para dar zoom no ambiente virtual, e (desktop) usar o scroll do mouse, para examinar detalhes das obras.  
9. Como usuário, quero que a câmera faça um “fade in/fade out” ou “zoom in” ao mudar de sala, para uma transição menos brusca e mais confortável à visão.  
10. Como usuário, quero compartilhar um ambiente virtual, para convidar amigos.  

**Prioridade Baixa**  
11. Como usuário, quero ver uma bússola ou mini-mapa indicando minha posição e direção dentro do espaço, para não me perder durante a visita.  
12. Como usuário, quero alternar entre Português e Inglês (e, se possível, outros), para entender todas as descrições sem barreiras linguísticas.  
13. Como usuário, quero gerar um link ou compartilhar meu ponto de vista atual no ambiente virtual, para convidar amigos a ver exatamente o que estou vendo.  
14. Como usuário, quero acessar uma linha do tempo ou galeria cronológica de obras fora do AV, para entender contexto histórico rapidamente.  
15. Como usuário, quero ver uma galeria de fotos ou lista de obras fora do AV (num menu ou rodapé), para navegar rapidamente por todas sem percorrer todo o espaço.  
16. Como visitante, quero alternar entre modo claro e escuro, para adequar a visualização ao ambiente real onde estou (externo, à noite, etc.).




## Comandos
- `npm start`: inicia o projeto no ambiente de produção
- `npm run dev`: inicia o projeto no ambiente de desenvolvimento
- `npm run dev -- --host`: inicia o projeto no ambiente de desenvolvimento e permite acessar por dispositivos móveis
- `npm run build`: gera o arquivo `./public/javascripts/bundle.js` que compila todos as bibliotecas JavaScript definadas em `./src/main.js`
- `build-dev`: builda e inicia o projeto no ambiente de desenvolvimento


## Procedimentos ao instalar o Aframe e outros pacotes JS front-end via npm
- `npm install NOMEDOPACOTE`
- Adicionar certificado HTTPS / Gerar o certificado autoassinado (execute no terminal):
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"
    Isso criará dois arquivos:
        key.pem (chave privada)
        cert.pem (certificado)

    - Instalar dependência de certficado
    npm install fs --save-dev

Se preferir rodar em HTTP (sem certificado), edite o vite.config.js

    export default {
        server: {
            // https: true,  // Comente ou remova esta linha
        },
    };

## Estrutura de arquivos paras mundos virtuais

-`./node_modules`: Pasta automática que armazena todas as dependências do projeto instaladas via npm/yarn. Não deve ser editada manualmente.
-`./public`: Contém arquivos estáticos acessíveis publicamente.
- `assets`: 
    - `imgs`: Armazena imagens utilizadas no projeto (PNG, JPG, SVG, etc).
    - `models_3d`: Arquivos 3D (GLB, GLTF, OBJ, etc) para ambientes virtuais.
    - `text`: Documentos de texto ou recursos linguísticos.
- `./src`: Código-fonte principal da aplicação React.
    - `assets`: Recursos específicos do front-end.
        - `components`: Componentes reutilizáveis (botões, cards, objetos).
        - `sections`: Componentes de páginas/seções principais.
- `App.jsx`: Componente raiz da aplicação.
- `main.jsx`: Ponto de entrada que renderiza o React no DOM.
- `index.html`: Estrutura base onde o React é renderizado.
- `index.css`: Estilos CSS globais.
- `eslint.config.js`:Ferramenta para identificar padrões problemáticos no código JavaScript/JSX
- `./.gitignore`: Lista de arquivos/pastas ignorados pelo Git (ex: node_modules, .env).
- `./package.json`: Configuração do projeto:
Dependências
Scripts (dev, build, test)
Metadados (nome, versão)
./vite.config.js: Configurações do Vite (build, plugins, server).


## Projeto convertido para React por que ?

**Por que Migrei para React + A-Frame?**  

A decisão de converter o projeto de **Node.js + Jade + A-Frame** para **React + A-Frame** foi motivada pela necessidade de criar uma aplicação mais dinâmica, organizada e escalável. Enquanto Jade/Pug era eficiente para templates estáticos, React traz componentes reutilizáveis, estados dinâmicos (como `useState` e `useEffect`) e uma integração mais fluida com o A-Frame.  

Além disso, a migração permite usar ferramentas modernas como **Vite** (para builds rápidos) e **ESLint** (para padronização do código), melhorando tanto a produtividade no desenvolvimento quanto a performance em produção. Com React, a manipulação de entidades 3D no A-Frame ficou mais intuitiva, usando JSX para declarar cenas e objetos VR/AR diretamente no código JavaScript.  

No fim, a mudança tornou o projeto mais fácil de manter, mais interativo e preparado para futuras expansões — tudo isso mantendo a potência do A-Frame para gráficos 3D e WebXR. 🚀