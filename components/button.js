import { useEffect } from "react"
import { gsap } from "gsap"

import styled from "styled-components"

const Container = styled.span`
    display: inline-block;
    padding: 15px 10px;
    border-radius: 999px !important;
    background-color: ${props => props.secondary ? "rgb(255,174,80)" : "rgb(255,174,80)"};
    color: ${props => props.secondary ? "black" : "black"};
    border: ${props => props.secondary ? "1px solid black" : "1px solid black"};
    cursor: pointer;
    transition-duration: 0.3s;

    :hover {
        transform: scale(1.1) !important;
        transition-duration: 0.3s;
    }
`

const Button = ({ secondary, children }) => {

    useEffect(() => {
        gsap.fromTo(".button", {scale: 1}, { scale: 1.1 , duration: 0.5, yoyo: true, ease: "power1.inOut", repeat: 3});
    },[])

    return (
        <Container className="button medium-font-size" secondary={secondary}>{children}</Container>
    )
}

export default Button