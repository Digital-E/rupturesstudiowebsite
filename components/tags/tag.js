import styled from "styled-components"

const Container = styled.div`
    font-size: 0.7rem;
    background: ${props => props.alt ? "black" : "white"};
    color: ${props => props.alt ? "white" : "black"};
    width: fit-content;
    border-radius: 999px;
    padding: 5px 10px;
    margin-right: 4px;
    white-space: nowrap;
`;

const Component = ({ alt, children }) => {
    return <Container alt={alt}>{children}</Container>
}

export default Component