// Se este componente Fade estiver em um arquivo separado como '../../components/Fade.js',
// aplique as modificações lá.
// Se estiver no mesmo arquivo que Ambiente360, modifique-o aqui.

import { Entity } from 'aframe-react'; // Certifique-se que Entity está importado se usar aframe-react
import { useEffect, useState } from 'react';

const Fade = ({ isFadingOut, onFadeOutComplete }) => {
    // Se isFadingOut for undefined (uso no Suspense), opacidade inicial é 1 (visível).
    // Caso contrário, começa com 0 para permitir animações de fade-out (0->1) ou fade-in (1->0) controladas.
    const [opacity, setOpacity] = useState(isFadingOut === undefined ? 1 : 0);

    useEffect(() => {
        // console.log(`Fade effect triggered. isFadingOut: ${isFadingOut}, currentOpacity: ${opacity}`);

        // Caso 1: Usado como fallback do Suspense (isFadingOut é undefined)
        // Deve apenas ser visível, sem animação interna, pois Suspense o removerá.
        if (isFadingOut === undefined) {
            setOpacity(1); // Garante que está visível
            // console.log('Fade (Suspense fallback): Set to visible.');
            return; // Não executa animações
        }

        // Caso 2: Controlado programaticamente via isFadingOut
        let interval;
        if (isFadingOut) {
            // Fade Out: Transição para opaco (ex: cobrir a tela)
            // Anima de opacidade atual para 1
            // console.log('Fade Out: Animating to opaque (0 -> 1)');
            interval = setInterval(() => {
                setOpacity(prev => {
                    const newOpacity = prev + 0.05;
                    if (newOpacity >= 1) {
                        clearInterval(interval);
                        // console.log('Fade Out: Complete.');
                        if (onFadeOutComplete) onFadeOutComplete();
                        return 1;
                    }
                    return newOpacity;
                });
            }, 30); // Velocidade da animação
        } else {
            // Fade In: Transição para transparente (ex: revelar a tela)
            // Anima de opacidade atual para 0
            // console.log('Fade In: Animating to transparent (1 -> 0)');
            interval = setInterval(() => {
                setOpacity(prev => {
                    const newOpacity = prev - 0.05;
                    if (newOpacity <= 0) {
                        clearInterval(interval);
                        // console.log('Fade In: Complete.');
                        return 0;
                    }
                    return newOpacity;
                });
            }, 30); // Velocidade da animação ajustada para consistência
        }

        return () => {
            // console.log('Fade: Clearing interval.');
            clearInterval(interval);
        };
    }, [isFadingOut, onFadeOutComplete]); // Dependências do useEffect

    return (
        <Entity>
            <a-plane
                color="black"
                width="100" 
                height="100"
                position="0 0 0.1" // Posição para garantir que está na frente
                opacity={opacity}
                material="shader: flat; transparent: true; depthTest: false;" // depthTest: false para garantir visibilidade sobre outros elementos
            />
        </Entity>
    );
};

export default Fade; // Se este for o export padrão do arquivo do Fade