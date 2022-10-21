import { useState, useEffect, useRef } from "react";
import styled from "styled-components"

import Media from "../../media"



const Slide = styled.div`
    position: absolute;
    padding: 0 5px;
    opacity: 1;
    filter: blur(0px);
    transition: filter ease-in-out 1s, opacity ease-in-out 1s;
    cursor: pointer;

    a {
        display: block;
        color: black;
    }

    :hover .more {
        opacity: 1;
        transition: opacity 0.3s;
    }
    
    &.hide-slide {
        opacity: 1;
        filter: blur(10px);
        transition: filter ease-in-out 1s,opacity ease-in-out 1s;
        pointer-events: none;
    }

    > div > div {
        opacity: 1;
        transition: filter ease-in-out 1s,opacity ease-in-out 1s;
    }

    &.hide-slide img, &.hide-slide > div > div {
        opacity: 0.5;
        transition: filter ease-in-out 1s,opacity ease-in-out 1s;
    }
`;

const MediaContainer = styled.div`
    height: ${props => props.size === 'S' ? '50vh' : props.size === 'M' ? '70vh' : '90vh'};
    width: fit-content;
    position: relative;

    @media(max-width: 989px) {
        height: 200px;
    }
`;



export default ({ item, windowHeight, size }) => {
    let mediaContainerRef = useRef();


    return (
        <Slide className={`carousel-slide`}>
            <MediaContainer ref={mediaContainerRef} size={size}>
                <Media asset={item} windowHeight={windowHeight} />
            </MediaContainer>
        </Slide>
    )
}