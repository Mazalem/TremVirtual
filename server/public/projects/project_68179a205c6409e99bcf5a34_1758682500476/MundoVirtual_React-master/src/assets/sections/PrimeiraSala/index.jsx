import Cena from "../../components/Cena";
import Link from "../../components/Link";
import Sala from "../../components/Sala"

const PrimeiraSala = () => {
    return (
        <Cena>
            <Sala  tamanho={7}/>
            <Link ref='/' texto='mundo' posicao={'0 1.1 -2.3'}  rotacao={'0 0 0'}/>
            {/* <video id='video' src="" */}
        </Cena>
    )
}
export default PrimeiraSala;