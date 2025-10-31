import React from 'react';
import { Entity } from 'aframe-react'; // Verifique o caminho se necessário

AFRAME.registerComponent('click-component-test', {
    init: function () {
        const el = this.el;
        el.addEventListener('click', function () {
            const initialPosition = el.getAttribute('position');
            const camera = document.getElementById("camera"); 

            if (camera && initialPosition) { //verificar se ambos existem
                camera.setAttribute('position', {
                    x: initialPosition.x,
                    y: 1.6, 
                    z: initialPosition.z
                });
                console.log("Posição do checkpoint clicado: " + initialPosition.x + " " + initialPosition.y + " " + initialPosition.z);
            } else {
                console.error("Erro ao teleportar: câmera ou initialPosition não encontrados.");
            }
        });
    }
});




// Configurações padrão baseadas no seu exemplo de <a-circle>
const defaultConfigCheckpoints = {
    yPos: 0.15,
    initialZ: -3,
    zStep: -2,
    radius: 0.4,
    color: "#EF2D5E",
    rotation: "-90 0 0",
    attributes: { 
        checkpoint: true, 
        htmlClass: "clickable" // Para class="clickable"
    }
};
const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

const mergeDeep = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = mergeDeep(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};






const GeradorCheckpoints = ({
    quantidade = 10, // Quantidade padrão de checkpoints
    config: customConfig = {},
}) => {
    // Mescla as configurações padrão com as customizadas
    const config = mergeDeep(defaultConfigCheckpoints, customConfig);
    const { yPos, initialZ, zStep, radius, color, rotation, attributes } = config;

    const checkpointsGerados = [];

    for (let i = 0; i < quantidade; i++) {
        const currentZ = initialZ + (i * zStep);
        const position = `0 ${yPos} ${currentZ}`;

        checkpointsGerados.push(
            <Entity
                key={`checkpoint-${i}`}
                primitive="a-circle"
                radius={radius}
                material={{ color: color }} // Em aframe-react, cor vai no material
                rotation={rotation}
                position={position}
                {...attributes} 
                click-component-test
                muda-cor
            />
        );
    }

    

    return (
        <Entity>
            {checkpointsGerados}
        </Entity>
    );
};
export default GeradorCheckpoints;