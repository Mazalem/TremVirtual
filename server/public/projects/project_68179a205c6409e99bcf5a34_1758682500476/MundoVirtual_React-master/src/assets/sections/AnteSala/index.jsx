import { useState } from "react";
import Card from "../../components/Card";
import Cena from "../../components/Cena";
import Link from "../../components/Link";
import Sala from "../../components/Sala";
import Texto from "../../components/Texto";
import Imagem from "../../components/Imagem";

const AnteSala = () =>{
    const [informacao, setInformacao] = useState(false);
    
    return (
        <Cena>
            <Sala tamanho={7}/>
            <Link texto='Entrar'  ref='/hallDeEntrada' posicao={'0 1 -2.3'} rotacao={'0 0 0'} primeiraImagem='#bemVindo' segundaImagem='#bemVindo' tamanhoImagem='1.1' largura='1.5'/>
            
        <Imagem posicao={'-3.3 1.6 -1'} rotacao={'0 90 0'} idImagem='#trem' tamanho={2} largura={1} ></Imagem>
            
        </Cena>
    )
}

export default AnteSala;