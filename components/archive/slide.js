import { useState, useEffect, useRef } from "react";
import styled from "styled-components"

import Link from "../menu-link"

import Media from "../media"

import Tags from "../tags"


const Slide = styled.div`
    position: absolute;
    padding: 0 5px;
    opacity: 1;
    filter: blur(0px);
    transition: filter ease-in-out 1s, opacity ease-in-out 1s;
    cursor: pointer;

    @media(max-width: 989px) {
        position: relative; 
        padding: 0 10px;
        margin-bottom: 50px;
    }

    :hover .more {
        opacity: 1;
        transition: opacity 0.3s;
    }

    img, video {
        transform: scale(1);
        transition: transform 5s, opacity ease-in-out 1s !important;
    }

    :hover img, :hover video {
        transform: scale(1.2);
        transition: transform 1s;
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
    height: 50vh;
    width: fit-content;
    position: relative;

    @media(max-width: 989px) {
        height: auto;
        width: 100%;
    }
`;

const Information = styled.div`
    position: relative;
    overflow: hidden;
    mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 80%, transparent 100%);
`;

const Title = styled.div`
    font-family: Neue Haas Grotesk Regular;
    padding-top: 8px;
    text-transform: capitalize;
    width: fit-content;

    a {
        display: flex;
        align-items: center;
        flex-direction: row;
        color: black !important;
    }
`;

const More = styled.div`
    position: relative;
    top: 1.5px;
    height: 12px;
    width: 12px;
    margin-left: 4px;
    opacity: 0;
    transition: opacity 0.5s;
`



export default ({ item, windowHeight }) => {
    let mediaContainerRef = useRef();
    let informationRef = useRef();

    let getCategories = (data) => {
        let categories = [];

        data.forEach(item => {
            categories.push(item.tag?.toLowerCase())
        })

        return `${categories.join(" ")}`
    }

    useEffect(() => {
        informationRef.current.style.width = `${mediaContainerRef.current.children[0].getBoundingClientRect().width}px`
    }, [windowHeight]);


    return (
        <Slide className={`carousel-slide ${getCategories(item.tags)}`}>
            <MediaContainer ref={mediaContainerRef}>
                <Media asset={item.thumbnails[0]} windowHeight={windowHeight} />
                <Information ref={informationRef}>
                    <Title>
                        <Link href={`projects/${item._meta.uid}`}>
                            <span>{item.title}</span>
                            <More className="more">
                                <svg viewBox="0 0 700 700">
                                    <g>
                                    <path d="m210 260h-0.28125c-11.043 0-20.004 8.9414-20.004 20.004 0 11.059 8.9414 20.004 20.004 20.004h0.29688 279.96 0.28125c11.043 0 20.004-8.9414 20.004-20.004 0-11.059-8.9414-20.004-20.004-20.004h-0.29688z"/>
                                    <path d="m370 140v-0.28125c0-11.043-8.9414-20.004-20.004-20.004-11.059 0-20.004 8.9414-20.004 20.004v0.29688-0.015625 279.98 0.28125c0 11.043 8.9414 20.004 20.004 20.004 11.059 0 20.004-8.9414 20.004-20.004v-0.29688 0.015625z"/>
                                    <path d="m350 0c-154.4 0-279.98 125.6-279.98 279.98s125.6 279.98 279.98 279.98c154.4 0 279.98-125.6 279.98-279.98s-125.6-279.98-279.98-279.98zm0 40.004c132.79 0 240 107.22 240 240s-107.2 240-240 240c-132.79 0-240-107.2-240-240 0-132.79 107.2-240 240-240z"/>
                                    </g>
                                </svg>
                            </More>
                        </Link>
                    </Title>
                    <Tags data={item} />
                </Information>
            </MediaContainer>
        </Slide>
    )
}