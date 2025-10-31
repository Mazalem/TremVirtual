import { Entity, Scene } from "aframe-react";
import { useState } from "react";


const Cena = (props) => {
    const propsClick = {
        animation__click: "property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 300; startEvents: click",
        animation__clickreset: "property: scale; to: 0.8 0.8 0.8; dur: 1; startEvents: animationcomplete__click",
        animation__fusing: "property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 300; startEvents: fusing"
    }

    return (
        <Scene vr-mode-ui="enabled:true" webxr="optionalFeatures: hit-test;">

            <a-assets>
                {/* Audio de click */}
                <audio id="click-sound" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>

                <img id='primeiraImagem' src='/assets/imgs/almeidaBoys.png' />
                <img id='segundaImagem' src='/assets/imgs/teste1.png' />

                <img id='cafeicultor' src='/assets/imgs/coffeHistory.png' />
                <img id='CastelodoCafe' src='/assets/imgs/coffeHistory2.png' />

                <img id='Leopoldina' src='/assets/imgs/mg.png' />
                <img id='mapaManhu' src='/assets/imgs/mg2.png' />

                <img id='historiamg' src='/assets/imgs/hs.png' />
                <img id='historiamg2' src='/assets/imgs/hs2.png' />

                <img id='seta' src='/assets/imgs/seta.png' />

                <img id="3d" src='/assets/imgs/display-3d.png' />
                <img id="parede" src='/assets/imgs/parede.png' />
                <img id="teto" src='/assets/imgs/teto.png' />
                <img id="chao" src='/assets/imgs/chao.png' />
                <img id="borda1" src='/assets/imgs/borda.jpg' />
                <img id="borda2" src='/assets/imgs/borda2.jpg' />
                <img id="borda3" src='/assets/imgs/borda3.jpg' />



                <img id="trem" src='/assets/imgs/Placa.png' />





                <a-asset-item id="graoCafe" src='/assets/models_3d/copodeCafe/textured.glb'></a-asset-item>


                <img id="1" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/1.png' />
                <img id="2" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/2.png' />
                <img id="3" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/3.png' />
                <img id="4" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/4.png' />
                <img id="5" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/5.png' />
                <img id="6" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/6.png' />
                <img id="7" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/7.png' />
                <img id="8" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/8.png' />
                <img id="9" src='/assets/imgs/Historia-e-Economia-de-Manhuacu/9.png' />



                <a-asset-item id="porta" src='/assets/models_3d/base_basic_shaded.glb'></a-asset-item>

                <img id='bemVindo' src='/assets/imgs/bemVindo.png' />
            </a-assets>
            {props.children}
            <a-camera id="camera" look-controls >
                <a-cursor
                    {...propsClick}
                    fuse="true"
                    fuseTimeout="500"
                    material="color: #00F; shader: flat"
                ></a-cursor>
            </a-camera>
        </Scene>
    )
}

export default Cena;