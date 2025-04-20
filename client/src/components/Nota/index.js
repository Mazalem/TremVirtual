import React from 'react';
import styled from 'styled-components';

const NotaContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  overflow: hidden;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #2c25256b;
  color: white;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) {
    flex-direction: row;
    height: auto;
  }
`;

const NotaContent = styled.div`
  padding: 15px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

const NotaTitle = styled.h2`
  margin: 0;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

const NotaText = styled.p`
  font-style: oblique;
  margin: 5px 0 0;
  text-align: justify;
  overflow-wrap: break-word;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const NotaVideo = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 200px;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 0;
    height: 100%;
    width: 50%;
  }
`;

const Video = styled.video`
  border-radius: 12px;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (min-width: 768px) {
    border-radius: 0 12px 12px 0;
  }
`;

const Nota = ({ title, text, videoSrc }) => {
  return (
    <NotaContainer>
      <NotaContent>
        <NotaTitle>{title}</NotaTitle>
        <NotaText>{text}</NotaText>
      </NotaContent>
      <NotaVideo>
        <Video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      </NotaVideo>
    </NotaContainer>
  );
};

export default Nota;
