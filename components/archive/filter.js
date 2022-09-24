import { useEffect, useState } from "react"

import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    top: 20.4vh;
    // bottom: 8vh;
    display: flex;
    margin: 0 10px;
    left: 50%;
    transform: translateX(-50%);

    background: #b2b2b2;
    padding: 7px 18px;
    border-radius: 999px;

    @media(max-width: 989px) {
        position: fixed;
        top: 70px;
        z-index: 999;
    }
`

const Item = styled.div`
    font-family: "Neue Haas Grotesk Regular";
    margin-right: 5px;
    margin-left: 3px;
    filter: blur(0px);
    text-transform: uppercase;
    white-space: nowrap;

    > span:nth-child(1) {
        font-size: 0.75rem;
    }

    > span:nth-child(2) {
        position: relative;
        display: inline-block;
        top: -7px;
        left: 2px;
        font-size: 0.5rem;
    }
`

const Component = ({ tags, selectedTagIndex, setSelectedTagIndex }) => {

    let toggleTag = (i) => {
        setSelectedTagIndex(i)
    }

    return (
        <Container>
            {
                tags.map( (item, index) => 
                    <>
                    <Item className={`${selectedTagIndex === index ? 'filter-is-selected hover' : 'hover'}`} onClick={() => toggleTag(index)}>
                        <span>{item.label}</span>
                        <span>{item.count}</span>
                    </Item>
                    <span>{index !== tags.length - 1 && ","}</span>
                    </>
                )
            }
        </Container>
    );
}

export default Component