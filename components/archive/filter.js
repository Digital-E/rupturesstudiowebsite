import { useEffect, useState } from "react"

import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    top: 21.4vh;
    display: flex;
    margin: 0 10px;
    left: 50%;
    transform: translateX(-50%);
`

const Item = styled.div`
    font-family: "Neue Haas Grotesk Regular";
    margin-right: 5px;
    margin-left: 3px;
    // color: black;
    // transition: color 1s;
    filter: blur(0px);
    transition: filter 0.7s;

    &.is-selected {
        // color: white;
        filter: blur(0.8px);
    }

    > span:nth-child(1) {
        font-size: 0.75rem;
    }

    > span:nth-child(2) {
        position: relative;
        display: inline-block;
        top: -10px;
        font-size: 0.5rem;
    }

    :hover {
        // color: white;
        cursor: pointer;
        // transition: color 0.2s;
        filter: blur(0.8px);
        transition: filter 0.3s;
    }
`

const Component = () => {
    return (
        <Container>
            <Item className="is-selected">
                <span>ALL</span>
            </Item>,
            <Item>
                <span>IMAGE</span>
                <span>3</span>
            </Item>,
            <Item>
                <span>VIDEO</span>
                <span>14</span>
            </Item>,
            <Item>
                <span>TYPOGRAPHY</span>
                <span>22</span>
            </Item>
        </Container>
    );
}

export default Component