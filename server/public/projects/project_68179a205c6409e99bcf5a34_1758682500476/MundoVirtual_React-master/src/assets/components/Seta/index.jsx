import { useEffect } from "react";
import { Entity } from "aframe-react";
import Imagem from "../Imagem";
import Card from "../Card";
import { setaConfig ,scaleAnimations } from "./DadosSeta";


AFRAME.registerComponent('click-handler', {
    schema: {
        direcao: { type: 'string' }
    },
    init: function () {
        this.handleClick = this.handleClick.bind(this);
        this.el.addEventListener('click', this.handleClick);
    },
    handleClick: function (e) {
        e.stopPropagation();
        // Dispara um evento personalizado (que o React vai ouvir)
        // O evento é disparado na janela, então qualquer parte do app pode ouvir
        const event = new CustomEvent('setaClicada', {
            detail: { direcao: this.data.direcao }
        });
        window.dispatchEvent(event);
    },
    remove: function () {
        this.el.removeEventListener('click', this.handleClick);
    }
});

const Seta = ({ onTrocarAmbiente, setas, cards }) => {

    // Escuta o evento global e repassa pro React
    useEffect(() => {
        const handleSetaClicada = (e) => {
            const direcao = e.detail.direcao;
            onTrocarAmbiente(direcao);
        };
        // Adiciona o listener no evento global
        window.addEventListener('setaClicada', handleSetaClicada);
        // Remove o listener quando o componente desmontar
        return () => {
            window.removeEventListener('setaClicada', handleSetaClicada);
        };
    }, [onTrocarAmbiente]);


    return (
        <Entity>
            {/* Seta Frente */}
            {setas.map((direcao, index) => (
                <Imagem
                    key={index}
                    posicao={setaConfig[direcao].direcao}
                    rotacao={setaConfig[direcao].rotacao}
                    idImagem='#seta'
                    tamanho='0.4'
                    {...scaleAnimations}
                    click-handler={`direcao: ${direcao}`}
                />

            ))}
            {/* { cards.map((card, index) => (
                    <Card texto={card.texto} posicao={card.posicao} key={index} />
                ))
            } */}

        </Entity>
    );
};

export default Seta;
