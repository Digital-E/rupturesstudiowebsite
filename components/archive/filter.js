import { useEffect, useState } from "react"

import styled from "styled-components"

import Tag from "../tags/tag"

const Container = styled.div`
    position: absolute;
    top: 20.4vh;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;

    background: #b2b2b2;
    padding: 7px 12px;
    border-radius: 999px;


    > div:last-child > div {
        margin: 0;
    }

    .filter-is-selected > div {
        background: black;
        color: white;
    }

    > div:hover > div {
        background: black;
        color: white;
    }

    > div:first-child > div > span:last-child {
        margin: 0;
    }

    @media(max-width: 989px) {
        position: fixed;
        top: auto;
        z-index: 999;
        bottom: 20px;
    }
`

const Item = styled.div`
    font-family: "Neue Haas Grotesk Regular";
    filter: blur(0px);
    white-space: nowrap;


    > div > span:nth-child(2) {
        position: relative;
        // display: inline-block;
        top: -0.4px;
        font-size: 0.5rem;
        margin-left: 3px;
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
                <Item  className={`${selectedTagIndex === index ? 'filter-is-selected hover' : 'hover'}`} onClick={() => toggleTag(index)} >
                    <Tag>
                        <span>{item.tag}</span>
                        <span>{item.count}</span>
                    </Tag>
                </Item> 
                    // <>
                    // <Item className={`${selectedTagIndex === index ? 'filter-is-selected hover' : 'hover'}`} onClick={() => toggleTag(index)}>
                    //     <span>{item.label}</span>
                    //     <span>{item.count}</span>
                    // </Item>
                    // <span>{index !== tags.length - 1 && ","}</span>
                    // </>
                )
            }
        </Container>
    );
}

export default Component