import 'aframe';
import { Entity } from 'aframe-react';
import { useState } from 'react';
import Imagem from './Imagem';
import { useNavigate } from 'react-router-dom';



const Link = (props) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (props.evento)
            props.evento()
        navigate(props.ref)
    }


    // Transforma string númerica em array
    const posArray = props.posicao.split(' ').map(Number);
    //Para não deixar a imagem sobrepor o link
    const eixoPositivoX = posArray[0] > 0 ? 0.01 : (-0.01);
    const eixoPositivoZ = posArray[2] > 0 ? 0.01 : (-0.01);

    const imagemPos = `${posArray[0] + eixoPositivoX} ${posArray[1] + 1} ${posArray[2] + eixoPositivoZ}`;

    return (
        <>
            <Imagem posicao={imagemPos} rotacao={props.rotacao} idImagem={hovered ? props.segundaImagem : props.primeiraImagem} tamanho={props.tamanhoImagem} largura={props.largura}></Imagem>
            <Entity class="link"
                geometry="primitive: plane; height: 0.35; width: 1.5"
                material={{
                    shader: 'flat',
                    color: hovered ? '#0f0' : '#00f',
                    transparent: true,
                    opacity: 0.9
                }}
                sound="on: click; src: #click-sound"

                text={{

                    font: '/assets/font/fonte-msdf.json',
                    value: props.texto,
                    color: '#000',
                    width: 1.5,
                    align: 'center',
                    wrapCount: 28,
                    negate: 'false',
                    lineHeight: 60,
                    zOffset: 0.1, // Garante que o texto fique na frente
                    fontImage: '/assets/font/fonte.png'
                }}
                animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter"
                animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
                events={{
                    click: handleClick,
                    mouseenter: () => setHovered(true),
                    mouseleave: () => setHovered(false)

                }}
                position={props.posicao}
                rotation={props.rotacao}
            >

            </Entity>

        </>
    )
}

export default Link