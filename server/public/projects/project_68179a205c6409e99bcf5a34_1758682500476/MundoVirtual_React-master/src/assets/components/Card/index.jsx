import { Entity } from "aframe-react";
import { useState } from "react";

const Card = ({ texto, posicao, ...props }) => {

    const escala = { animation__scale:"property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter",
            animation__scale_reverse:"property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"}
    const [informacao, setInformacao] = useState(false);
    const mudaComponente = () => {
        setInformacao(!informacao);
        console.log(informacao);
    }

    const [x, y, z] = posicao.split(' ').map(Number);


    return (
        !informacao ? <Entity
            primitive="a-image"
            src="#info"
            width="0.2"
            height="0.2"
            position={posicao}
            {...props}
            events={{
                click: mudaComponente,
            }}
            
           {...escala}
        /> :
            <>
                <Entity
                    geometry={{ primitive: 'plane', width: 1.5, height: 1.5 }}

                    material={{ color: '#FFF', transparent: true, opacity: 0.7 }}
                    text={{

                        font: '/assets/font/fonte-msdf.json',
                        value: texto,
                        color: '#F00',
                        width: 1.5,
                        align: 'center',
                        wrapCount: 28,
                        negate: 'false',
                        lineHeight: 60,
                        zOffset: 0.01, // Garante que o texto fique na frente
                        fontImage: '/assets/font/fonte.png'
                    }}
                    position={posicao}
                    {...props}
                >
                </Entity >
                <Entity
                    primitive="a-image"
                    src="#fechar"
                    width="0.2"
                    height="0.2"
                    position={`${x + 0.6} ${y + 0.6} ${z + 0.01}`}
                   {...escala}
                    events={{
                        click: mudaComponente,

                    }}
                    {...props}

                />

            </>

    )
}
export default Card;