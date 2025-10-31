import { Entity } from "aframe-react";
import { useState } from "react";

const Objeto3D = ({ posicao , ...props}) => {
    const escala = {
        animation__scale: "property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter",
        animation__scale_reverse: "property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
        
    }
    const [x, y, z] = posicao.split(' ').map(Number);

    const mudaComponente = () => {
        setAbreObjeto(!abreObjeto);
    }

    const [abreObjeto, setAbreObjeto] = useState(false);
    return (
        !abreObjeto ? <Entity
            primitive="a-image"
            src="#3d"
            width="1"
            height="1"
            position={posicao}
            {...props}
            events={{
                click: mudaComponente,
            }}

            {...escala}
        /> :
            <>
                <Entity gltf-model="#bustoSerafim" class="clickable" rotation="0 0 0"  position={posicao} {...props}></Entity>

                <Entity
                    primitive="a-image"
                    src="#fechar"
                    width="0.5"
                    height="0.5"
                    position={`${x + 1.5} ${y + 2.6} ${z + 1}`}
                    {...escala}
                    events={{
                        click: mudaComponente,

                    }}
                    {...props}

                />

            </>
    )
}

export default Objeto3D;