import { Entity } from "aframe-react"
import { paredes } from "./DadosSala"
import Cena from "../../components/Cena"
import Quadro from "../../components/Quadro"
import GeradorCheckpoints from "../../components/GeradorCheckpoints"



const SalaHistoria = () => {
    return (
        <Cena>
            
            <Entity position="0 0 -6" scale='0.5 0.5 0.5'>

                {paredes.map((parede, index) => (
                    <Entity
                        key={index}
                        primitive="a-plane"
                        position={parede.position}
                        rotation={parede.rotation}
                        width={parede.width}
                        height={parede.height}
                        color={parede.color}
                    />
                ))}

            </Entity>
            <Quadro quantidade={8} />
            <GeradorCheckpoints quantidade={17} />
        </Cena>
    )
}




export default SalaHistoria;