import styled from 'styled-components';

const Rodape = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color:#2c2525ad;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    z-index: 1000;

    p{
    margin: 0;
    }
`;

function Footer() {
    return (
        <Rodape>
            <p>© 2025 Trem Virtual, IFSudesteMG - Campus Manhuaçu. Todos os direitos reservados.</p>
        </Rodape>
    )
}

export default Footer;