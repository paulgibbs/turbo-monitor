import styled from 'styled-components';

const FooterWrapper = styled.footer`
    border-top: 1px solid #e5e7eb;
    padding: 15px;
    margin-top: 25px;
    font-size: 13px;
`;

export const Footer = () => (
    <FooterWrapper role="contentinfo">
        Powered by <a href="https://github.com/crgeary/turbo">Turbo</a>
    </FooterWrapper>
);
