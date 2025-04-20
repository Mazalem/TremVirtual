import styled from 'styled-components';
import React, { useRef } from 'react';

function Iframe(props) {
    const iframeRef = useRef(null);

    const handleFullscreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            } else if (iframeRef.current.mozRequestFullScreen) {
                iframeRef.current.mozRequestFullScreen();
            } else if (iframeRef.current.webkitRequestFullscreen) {
                iframeRef.current.webkitRequestFullscreen();
            } else if (iframeRef.current.msRequestFullscreen) {
                iframeRef.current.msRequestFullscreen();
            }
        }
    };

    const Container = styled.div`
        position: relative;
        width: 100%;
        max-width: 100%;
    `;

    const StyledIframe = styled.iframe`
        width: 100%;
        height: 500px;
        max-width: 100%;
        border-radius: 8px;
        border: none;
    `;

    const FullscreenButton = styled.button`
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 1000;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        background-color:rgba(0, 0, 0, 0.35);
        color: white;
        border: none;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

       &:hover {
        background-color:rgba(70, 59, 59, 0.51);
        color: #ff6347;
        border: 1px solid #fff;
        cursor: pointer;
        transition: color 0.3s ease, border 0.3s ease;
  }
    `;

    return (
        <Container>
            <StyledIframe
                ref={iframeRef}
                src={props.src}
                title={props.titulo || "Iframe"}
            />
            <FullscreenButton onClick={handleFullscreen}>
            <i class="bi bi-arrows-fullscreen"></i>
            </FullscreenButton>
        </Container>
    );
}

export default Iframe;
