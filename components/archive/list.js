import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from "framer-motion"

import ListItem from './list-item'

import sanitizeTag from "../../lib/sanitizeTag"

const Container = styled.div``

const Header = styled(motion.div)`
    display: flex;
    align-items: center;
    padding: 10px;
    transition: opacity 0.3s;
    

    &.list-focus {
        opacity: 0 !important;
        transition: opacity 0.3s;
    }

    > div {
        font-size: 0.8rem;
        font-family: "Neue Haas Grotesk Medium";
    }

    > div:nth-child(1) {
        flex-basis: 30%;
    }

    > div:nth-child(2) {
        flex-basis: 40%;
    }

    > div:nth-child(3) {
        flex-basis: 30%;
    }

    @media(max-width: 989px) {
        > div:nth-child(1) {
            flex-basis: 80%;
        }

        > div:nth-child(2) {
            flex-basis: 20%;
            display: none;
        }
    }
`

const List = styled.div`

    .archive-row {
        position: relative;
        max-height: 40px;
        transition: opacity 0.5s 0.2s, max-height 0.5s 0.2s, pointer-events 0s 0.7s;
    }

    .hide-row {
        opacity: 0;
        max-height: 0px;
        transition: opacity 0.5s, max-height 0.5s 0.2s;
        pointer-events: none;
        z-index: -1;
    }

    @media(min-width: 990px) {
        .archive-row > a > div > div > div:nth-child(2) > div > div  {
            pointer-events: all !important;
        }

        > div > a > div > div > div:nth-child(2) > div > div > div:hover {
            background: black;
            color: white;
        }
    }

    .list-item-not-focus {
        opacity: 0.1;
        transition: opacity 0.3s, filter 0.3s, max-height 0.5s 0.2s;
    }

    .list-item-focus {
        opacity: 1;
        transition: opacity 0.3s, filter 0.3s, max-height 0.5s 0.2s;
    }

    .hide-row.list-item-not-focus {
        opacity: 0;
    }
`


const Component = ({ data, setTagHoveredIndex, tagHoveredIndex, setSelectedTag }) => {
    let headerRef = useRef()
    let listRef = useRef()

    useEffect(() => {
        if(window.innerWidth < 990) return;
        Array.from(listRef.current.children).forEach(item => item.classList.remove('list-item-not-focus'))
        Array.from(listRef.current.children).forEach(item => item.classList.remove('list-item-focus'))
        headerRef.current.classList.remove('list-focus')

        if(tagHoveredIndex !== null) {
            headerRef.current.classList.add('list-focus')
            Array.from(listRef.current.children).forEach(item => item.classList.add('list-item-not-focus'))
            listRef.current.children[tagHoveredIndex].classList.add('list-item-focus')

        }
    }, [tagHoveredIndex])

    let getTags = (data) => {
        let tags = [];

        data.forEach(item => {
            tags.push(sanitizeTag(item.tag))
        })

        return `${tags.join(" ")}`
    }

    return (
        <Container>
            <Header 
                ref={headerRef}
            >
                <div>Project</div>
                <div>Tags</div>
                <div>Year</div>
            </Header>
            <List ref={listRef}>
                    {
                        data.map((item, index) => 
                        <div
                            className={`archive-row ${getTags(item.node.tags)}`}
                            onMouseEnter={() => setTagHoveredIndex(index)} onMouseLeave={() => setTagHoveredIndex(null)}>
                            <ListItem  data={item.node} setSelectedTag={(val) => setSelectedTag(val)} />
                        </div>)
                    }
            </List>
        </Container>
    )
}

export default Component