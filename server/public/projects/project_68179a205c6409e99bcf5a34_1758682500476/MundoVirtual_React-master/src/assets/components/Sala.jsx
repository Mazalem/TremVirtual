import Parede from "./Parede"


const Sala = ({tamanho}) => {
    const metadeTamanho = tamanho / 2;

    return (
        <>
            {/* chão */}
            <Parede posicao='0 0.1 0' repeat={`${tamanho} ${tamanho}`} tamanho={tamanho} rotacao='-90 0 0' caminho='#chao' />
            {/* parede esquerda */}
            <Parede posicao={`${metadeTamanho} 0 0`} repeat={`${tamanho} ${tamanho}`} tamanho={tamanho} rotacao='0 -90 0' caminho='#parede' />
            {/* parede direita */}
            <Parede posicao={`-${metadeTamanho} 0 0`} repeat={`${tamanho} ${tamanho}`} tamanho={tamanho} rotacao='0 90 0' caminho='#parede' />
            {/* parede traseira */}
            <Parede posicao={`0 0 ${metadeTamanho}`} repeat={`${tamanho} ${tamanho}`} tamanho={tamanho} rotacao='0 180 0' caminho='#parede' />
            {/* parede frontal */}
            <Parede posicao={`0 0 -${metadeTamanho}`} repeat={`${tamanho} ${tamanho}`} tamanho={tamanho} rotacao='0 0 0' caminho='#parede' />
            {/* teto */}
            <Parede posicao={`0 ${metadeTamanho} 0`} repeat={`${tamanho} ${tamanho}`} tamanho={tamanho} rotacao='90 0 0' caminho='#teto' />


        </>
    )



}

export default Sala