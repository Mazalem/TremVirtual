import React, { useEffect, useMemo, useId } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CarouselItem from '../CarouselItem';

const CarouselContainer = styled.div`
  margin-bottom: 10px;
  padding: 20px;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: rgba(44, 37, 37, 0.42);

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
  top: auto;
  bottom: 10px;
  left: 10px;
  z-index: 999;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselControlNext = styled.button`
  position: absolute;
  top: auto;
  bottom: 10px;
  right: 10px;
  z-index: 999;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Carousel({ jogos, inicio, fim }) {
  const jogosLimitados = jogos.slice(inicio, fim);
  const reactId = useId();
  const carouselId = `carousel-${String(reactId).replace(/:/g, '')}`;

  const startIndex = useMemo(() => {
    return jogosLimitados.length
      ? Math.floor(Math.random() * jogosLimitados.length)
      : 0;
  }, [jogosLimitados.length]);

  useEffect(() => {
    const el = document.getElementById(carouselId);
    if (!el || !window.bootstrap) return;

    let instance = window.bootstrap.Carousel.getInstance(el);
    if (instance) instance.dispose();

    instance = window.bootstrap.Carousel.getOrCreateInstance(el, {
      interval: 5000,
      touch: true,
      keyboard: true,
      pause: 'hover',
      wrap: true,
    });

    const t = setTimeout(() => {
      if (typeof instance.to === 'function') instance.to(startIndex);
      if (typeof instance.cycle === 'function') instance.cycle();
    }, 100);

    return () => {
      clearTimeout(t);
      try {
        instance.dispose();
      } catch (e) {}
    };
  }, [carouselId, startIndex]);

  return (
    <CarouselContainer>
      <StyledCarousel
        id={carouselId}
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          {jogosLimitados.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide-to={index}
              className={index === startIndex ? 'active' : ''}
              aria-current={index === startIndex ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {jogosLimitados.map((jogo, index) => (
            <CarouselItem
              key={jogo._id || index}
              jogo={jogo}
              active={index === startIndex}
            />
          ))}
        </div>

        <CarouselControlPrev
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </CarouselControlPrev>

        <CarouselControlNext
          type="button"
          data-bs-target={`#${carouselId}`}
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </CarouselControlNext>
      </StyledCarousel>
    </CarouselContainer>
  );
}

export default Carousel;
