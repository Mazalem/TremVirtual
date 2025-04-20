import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarouselItemWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;

const CarouselCaption = styled.div`
  position: absolute;
  top: 25%;
  left: 10px;
  color: white;
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  box-sizing: border-box;

  @media (max-width: 768px) and (orientation: portrait) {
    top: 10%;
    max-width: 80%;
    padding: 10px;
    left: 5%;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    top: 50%; 
    left: 10%; 
    max-width: 60%; 
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: flex-start;
    transform: none; 
  }
`;

const CarouselGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
`;

function CarouselItem({jogo}) {
  const url = process.env.REACT_APP_SERVIDOR;
  return (
    <CarouselItemWrapper className="carousel-item active">
      <CarouselImage src={jogo.imagem} className="d-block w-100" alt={jogo.legenda} />
      <CarouselCaption>
        <h5>{jogo.titulo}</h5>
        <p>{jogo.descricao}</p>
        <a href={`${url}/jogo/${jogo._id}`} className="btn btn-danger">Jogar</a>
      </CarouselCaption>
      <CarouselGradient />
    </CarouselItemWrapper>
  );
}

export default CarouselItem;
