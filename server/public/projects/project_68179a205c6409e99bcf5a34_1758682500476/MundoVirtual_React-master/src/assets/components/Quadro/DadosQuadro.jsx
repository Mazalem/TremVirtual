export const defaultConfig = {
    plano: {
        className: "clickable",
        width: 5,
        height: 3,
        yPos: 3,
    },
    planoFront: {
        scale: "1.05 1.05 1.05",
        color: "#7D4848",
    },
    planoBack: {
        scale: "1.15 1.15 1.15",
        color: "#7F2626",
        zOffset: -0.1, // Deslocamento Z em relação ao plano frontal
    },
    cubo: {
        scale: "0.4 0.4 0.4",
        yPos: 0.75,
        // A cor do cubo será controlada pelo componente 'muda-cor'
        // rotation será controlada pelo 'rotate-cube'
    },
    layout: {
        initialX: -5,    // X inicial para o primeiro plano do conjunto principal
        initialZ: -2.5,  // Z inicial para o primeiro plano do conjunto principal
        zStep: -5,       // Passo Z para cada conjunto subsequente
    }
};



AFRAME.registerComponent('rotate-cube', {
    schema: {
        speed: { type: 'number', default: 0.4 } // Velocidade de rotação
    },

    init: function () {
        const el = this.el;
        const speed = this.data.speed;

        // Animação de rotação
        el.setAttribute('animation__rotation', {
            property: 'rotation',
            to: '0 360 0',
            dur: 1000 / speed,
            loop: true,
            easing: 'linear'
        });
    }
});

AFRAME.registerComponent('muda-cor', {
    schema: {
        colorChangeSpeed: { type: 'number', default: 1500 } // Velocidade de mudança de cor (em ms)
    },

    init: function () {
        const el = this.el;
        const colorChangeSpeed = this.data.colorChangeSpeed;

        // Define uma cor inicial aleatória
        el.setAttribute('material', 'color', this.getRandomColor());

        // Animação de mudança de cor
        el.setAttribute('animation__color', {
            property: 'material.color',
            to: this.getRandomColor(),
            dur: colorChangeSpeed,
            loop: true,
            easing: 'easeInOutQuad'
        });

        // Configura o intervalo para mudar a cor
        this.colorInterval = setInterval(() => this.changeColor(), colorChangeSpeed);
    },

    changeColor: function () {
        // Muda a cor do cubo suavemente
        const newColor = this.getRandomColor();
        this.el.setAttribute('animation__color', {
            property: 'material.color',
            to: newColor,
            dur: this.data.colorChangeSpeed,
            loop: true,
            easing: 'easeInOutQuad'
        });
    },

    getRandomColor: function () {
        // Gera uma cor aleatória em formato hexadecimal
        let str = '#';
        while (str.length < 7) {
            str += Math.floor(Math.random() * 0x10).toString(16);
        }
        return str
    },

    remove: function () {
        // Limpa o intervalo quando o componente é removido
        clearInterval(this.colorInterval);
    }
});
