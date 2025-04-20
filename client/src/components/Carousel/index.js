import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselItem from '../CarouselItem';

const CarouselContainer = styled.div`
  margin-bottom: 10px;
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: rgba(44, 37, 37, 0.42);
  padding: 20px;
  
  @media (max-width: 768px) {
    margin-top: 25px; 
  }
`;

const StyledCarousel = styled.div`
  height: 500px;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: 300px; 
  }
`;

const CarouselControlPrev = styled.button`
  position: absolute;
  margin-top: 400px;
  left: 0;
  z-index: 1;
`;

const CarouselControlNext = styled.button`
  position: absolute;
  margin-top: 400px;
  right: 0;
  z-index: 1;
`;

function Carousel({ jogos, inicio, fim }) {
  const jogosLimitados = jogos.slice(inicio, fim);
  return (
    <CarouselContainer>
      <StyledCarousel id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          {jogosLimitados.map((jogo) => (
            <CarouselItem jogo={jogo}/>
          ))}
        </div>
        <CarouselControlPrev className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </CarouselControlPrev>
        <CarouselControlNext className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </CarouselControlNext>
      </StyledCarousel>
    </CarouselContainer>
  );
}

export default Carousel;
