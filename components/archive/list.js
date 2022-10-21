import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Tag from '../tags/tag'

import ListItem from './list-item'

const Container = styled.div``

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    transition: opacity 0.3s;

    &.list-focus {
        opacity: 0;
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

const List = styled(motion.div)`
    > div {
        transition: opacity 0.3s, filter 0.3s;
    }

    .list-item-not-focus {
        opacity: 0.1;
        // filter: blur(1px);
        transition: opacity 0.3s, filter 0.3s;
    }

    .list-item-focus {
        opacity: 1;
        filter: blur(0px);
        transition: opacity 0.3s, filter 0.3s;
    }
`

let animation = {
    enter: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    },
    exit: {
    }
}






const Component = ({ data, setTagHoveredIndex, tagHoveredIndex }) => {
    let headerRef = useRef()
    let listRef = useRef()

    useEffect(() => {
        Array.from(listRef.current.children).forEach(item => item.classList.remove('list-item-not-focus'))
        Array.from(listRef.current.children).forEach(item => item.classList.remove('list-item-focus'))
        headerRef.current.classList.remove('list-focus')

        if(tagHoveredIndex !== null) {
            headerRef.current.classList.add('list-focus')
            Array.from(listRef.current.children).forEach(item => item.classList.add('list-item-not-focus'))
            listRef.current.children[tagHoveredIndex].classList.add('list-item-focus')

        }
    }, [tagHoveredIndex])

    return (
        <Container>
            <Header ref={headerRef}>
                {/* <div><Tag>Project</Tag></div>
                <div><Tag>Tags</Tag></div>
                <div><Tag>Year</Tag></div> */}
                <div>Project</div>
                <div>Tags</div>
                <div>Year</div>
            </Header>
            <List
                variants={animation} 
                initial='exit'
                animate='enter'
                ref={listRef}
            >
                {
                    data.map((item, index) => <div onMouseEnter={() => setTagHoveredIndex(index)} onMouseLeave={() => setTagHoveredIndex(null)}><ListItem data={item.node} /></div>)
                }
            </List>
        </Container>
    )
}

export default Component