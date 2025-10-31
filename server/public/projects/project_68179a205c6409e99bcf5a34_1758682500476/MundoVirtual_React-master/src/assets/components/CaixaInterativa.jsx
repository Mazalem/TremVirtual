import React from "react";
import { Entity } from "aframe-react";
import "aframe-event-set-component";

const CaixaInterativa = (props) => {
    return (
        <Entity
            {...props}
            primitive="a-box"
            position = {props.posicao}
            material="color: yellow"
            event-set__click={props.mudaTamanho}
            event-set__mouseenter="material.color: blue"
            event-set__mouseleave="material.color: yellow"
            animation__scale="property: scale; dir: alternate; dur: 200; startEvents: click"
        />
    )
};

export default CaixaInterativa;
