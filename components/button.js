import styled from "styled-components"

const Container = styled.span`
    display: inline-block;
    padding: 15px 25px;
    background-color: ${props => props.secondary ? "white" : "black"};
    color: ${props => props.secondary ? "black" : "white"};
    border: ${props => props.secondary ? "2px solid black" : "2px solid transparent"};
    cursor: pointer;
`

const Button = ({ secondary, children }) => {
    return (
        <Container className="button" secondary={secondary}>{children}</Container>
    )
}

export default Button