import { Entity } from 'aframe-react';


const Texto = (props) => {
    return (
        <Entity class="texto"
            geometry="primitive: plane; height: 1; width: 2"
            material={{
                shader: 'flat',
                color: '#00f',
                transparent: true,
                opacity: 0.9
            }}
            text={{
                font: '/assets/font/fonte-msdf.json',
                value: props.texto,
                color: 'blue',
                width: 1.5,
                align: 'center',
                wrapCount: 28,
                negate: 'false',
                lineHeight: 60,
                zOffset: 0.01, // Garante que o texto fique na frente
                fontImage: '/assets/font/fonte.png'
            }}

            position={props.posicao}
            rotation={props.rotacao}

        >

        </Entity>
    )
}

export default Texto;