import React from 'react';
import { Entity } from 'aframe-react';
const Parede = (props) => {
    return (
        <Entity
            primitive="a-plane"
            src={props.caminho}
            position={props.posicao}
            width={props.tamanho}
            height={props.tamanho}
            rotation={props.rotacao}
        />


    )
}

export default Parede;