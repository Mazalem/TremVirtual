import 'aframe';
import { Entity, Scene } from 'aframe-react';
// import { useState } from 'react';
// import Imagem from '../components/Imagem';
import Link from '../../components/Link';
import Sala from '../../components/Sala';
import Cena from '../../components/Cena';




const HallDeEntrada = () => {

    return (
        <Cena>

            <Sala tamanho={7} />
            <Link texto='Linha do Tempo de Manhuaçu' ref='/sala' posicao={'0 1 -2.3'} rotacao={'0 0 0'} tamanhoImagem='1.5' primeiraImagem='#mapaManhu' segundaImagem='#Leopoldina' />

            <Link texto='O Café e Nossa História' ref='/ambiente/ambiente1' posicao={'0 1 2.3'} rotacao={'0 180 0'} tamanhoImagem='1.5' primeiraImagem='#cafeicultor' segundaImagem='#CastelodoCafe' />

            <Link texto='Quem Fez Manhuaçu' ref='/ambiente/ambiente2' posicao={'2.3 1 0'} rotacao={'0 -90 0'} tamanhoImagem='1.5' primeiraImagem='#historiamg' segundaImagem='#historiamg2' />

            <Link texto='Belezas Naturais' ref='/ambiente/ambiente3' posicao={'-2.3 1 0'} rotacao={'0 90 0'} tamanhoImagem='1.5' primeiraImagem='#mapaManhu' segundaImagem='#Leopoldina' />

            <Entity gltf-model="#porta" class="clickable" rotation="0 180 0" scale="1.5 1.5 1.5" position="-2 0 -2"></Entity>
            <Entity gltf-model="#porta" class="clickable" rotation="0 180 0" scale="1.5 1.5 1.5" position="2 0 -2"></Entity>
        </Cena>
    )
}

export default HallDeEntrada