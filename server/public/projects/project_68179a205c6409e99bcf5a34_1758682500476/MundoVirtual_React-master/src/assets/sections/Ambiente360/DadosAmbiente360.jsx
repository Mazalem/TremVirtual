// Ambiente 1
export const imagens = {
    img1: {
        posicao: '0 -100 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem1.jpg',
        setas: ['frente'],
        cards: [

            {
                "texto": "O Palácio da Cultura de Manhuaçu, restaurado em 2020, é um dos principais patrimônios arquitetônicos da cidade.",
                "posicao": "1 1.5 -2"
            },
            {
                "texto": "A economia de Manhuaçu sempre foi ligada ao café, sendo a cidade um dos polos cafeeiros de Minas Gerais.",
                "posicao": "-1 1.5 -4"
            },
            
        ]

    },
    img2: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem2.jpg',
        setas: ['esquerda', 'tras'],
         cards: [
            {
                "texto": "Manhuaçu foi emancipada de Ponte Nova em 5 de novembro de 1877, inicialmente chamada São Lourenço do Manhuassu.",
                "posicao": "0 1.5 -3"
            },
            {
                "texto": "O nome 'Manhuaçu' tem origem tupi e significa 'rio grande', referência ao rio que corta a cidade.",
                "posicao": "2 1.5 -4"
            },
            {
                "texto": "Em 1896, o coronel Serafim Tibúrcio proclamou a República de Manhuaçu, que durou 22 dias.",
                "posicao": "-2 1.5 -3"
            },
        ]
    },
    img3: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem3.jpg',
        setas: ['direita', 'esquerda', 'tras'],
        cards: [
            {
                "texto": "A colonização da região começou no século XVIII com o bandeirante Pedro Bueno Cacunda.",
                "posicao": "3 1.5 -3"
            },
            {
                "texto": "A cidade já teve sua sede em São Simão (atual Simonésia) antes de ser transferida para a Vila de São Lourenço em 1881.",
                "posicao": "-3 1.5 -2"
            },
            
        ]
    },
    img4: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem3_1.jpg',
        setas: ['direita' ],
        cards: [
            {
                "texto": "O jornal 'O Manhuaçu' foi criado em 1890, sendo um dos primeiros veículos de comunicação da cidade.",
                "posicao": "0 1.5 -5"
            },
            {
                "texto": "A Estátua do Cafeicultor, símbolo da importância do café para Manhuaçu, está localizada no trevo da BR-262.",
                "posicao": "2 1.5 -2"
            },
            {
                "texto": "Manhuaçu integra o circuito turístico do Pico da Bandeira, destacando-se pelas belezas naturais da região.",
                "posicao": "-2 1.5 -5"
            }
        ]
    },
}

//Ambiente 2
export const imagensS1 = {
    img1: {
        posicao: '0 -90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem4.jpg',
        setas:['frente','esquerda','direita','tras'],
    },
    img4: {
        posicao: '0 0 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem5.jpg',
        setas:['frente','esquerda','direita','tras'],
    },
    img2: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem6.jpg',
        setas:['frente','esquerda','direita','tras'],
    },
    img3: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem7.jpg',
        setas:['frente','esquerda','direita','tras'],
    },


}

//Ambiente 3
export const imagensS2 = {
    img1: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem8.jpg',
        setas:['frente','esquerda','direita','tras'],

    },
    img2: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem9.jpg',
        setas:['frente','esquerda','direita','tras'],

    },
    img3: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem10.jpg',
        setas:['frente','esquerda','direita','tras'],

    },
    img4: {
        posicao: '0 90 0',
        caminho: '/assets/fotos_CasaDeCultura/imagem11.jpg',
        setas:['frente','esquerda','direita','tras'],

    },

}

export const conjuntos = {
    imagens,
    imagensS1,
    imagensS2,
};


export const assets = <>
    
                <img id='info' src='/assets/imgs/info.png' />
                <img id='fechar' src='/assets/imgs/fechar.png' />
                <img id='parede' src='/assets/imgs/parede.png' />
                <img id='teto' src='/assets/imgs/teto.png' />
                <img id='chao' src='/assets/imgs/chao.png' />
                <a-asset-item id="bustoSerafim" src='/assets/models_3d/Busto2SerafimTiburcio/SerafimTiburcio.glb'></a-asset-item>

                
                
                </>
