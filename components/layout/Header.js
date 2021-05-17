import styled from 'styled-components';

const HeaderWrapper = styled.header`
    padding: 15px;
`;

export const Header = () => (
    <HeaderWrapper role="banner">
        <strong>Turbo</strong>
    </HeaderWrapper>
);
