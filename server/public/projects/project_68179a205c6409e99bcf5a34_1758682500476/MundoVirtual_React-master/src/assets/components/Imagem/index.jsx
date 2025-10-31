import Utilizaveis from "../Utilizaveis"

const Imagem = ({idImagem,posicao,rotacao,tamanho,largura, ...rest}) => {

    return (
        <>
        
        <a-image
            src={idImagem}
            position={posicao}
            rotation={rotacao}
            width={largura ? largura : tamanho}
            height={tamanho}
            {...rest}
            className='clickable'
        ></a-image>
        </>
    )
}

export default Imagem