import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    body {
        font-family: Inter, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #4B5563;
    }
`;

function Turbo({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

export default Turbo;
