import { useEffect } from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion"

import Link from '../menu-link'

import Tags from '../tags'

import Tag from '../tags/tag'

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    transition: background 0.3s;

    span {
        color: black !important;
        transition: margin-left 0.3s;
    }

    :hover .more {
        opacity: 1;
        transition: opacity 0s;
    }

    :hover  {
        // background: #b2b2b2;
        // background: #c9c9c9;
        // border-top: 1px solid black;
        // border-bottom: 1px solid black;
        transition: background 0s;
    }

    // :hover > div:nth-child(1) > span {
    //     margin-left: 10px;
    //     transition: margin-left 0.3s;
    // }

    > div:nth-child(1) {
        flex-basis: 30%;
    }

    > div:nth-child(2) {
        flex-basis: 40%;
    }

    > div:nth-child(3) {
        flex-basis: 30%;
    }

    > div:nth-child(2) > div > div > div:first-child {
        display: none;
    }

    > div:nth-child(2) > div > div  {
        margin: 0;
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

const Title = styled.div`
    display: flex;
    width: fit-content;

    // @media(max-width: 989px) {
    //     margin: 0 10px;
    // }
`;


const More = styled.div`
    position: absolute;
    top: 12.5px;
    height: 12px;
    width: 12px;
    margin-left: 0px;
    opacity: 0;
    transition: opacity 0.1s;
`



const Component = ({ data }) => {

    return (
    data ?
    <Link href={`projects/${data._meta.uid}`}>
        <Container>
            <Title>
                {/* <More className="more">
                    <svg viewBox="0 0 700 700">
                        <g>
                        <path d="m210 260h-0.28125c-11.043 0-20.004 8.9414-20.004 20.004 0 11.059 8.9414 20.004 20.004 20.004h0.29688 279.96 0.28125c11.043 0 20.004-8.9414 20.004-20.004 0-11.059-8.9414-20.004-20.004-20.004h-0.29688z"/>
                        <path d="m370 140v-0.28125c0-11.043-8.9414-20.004-20.004-20.004-11.059 0-20.004 8.9414-20.004 20.004v0.29688-0.015625 279.98 0.28125c0 11.043 8.9414 20.004 20.004 20.004 11.059 0 20.004-8.9414 20.004-20.004v-0.29688 0.015625z"/>
                        <path d="m350 0c-154.4 0-279.98 125.6-279.98 279.98s125.6 279.98 279.98 279.98c154.4 0 279.98-125.6 279.98-279.98s-125.6-279.98-279.98-279.98zm0 40.004c132.79 0 240 107.22 240 240s-107.2 240-240 240c-132.79 0-240-107.2-240-240 0-132.79 107.2-240 240-240z"/>
                        </g>
                    </svg>
                </More>               */}
                <span>{data.title}</span>
            </Title>
            <div>
                <Tags data={data} />
            </div>
            <div>
                <Tag alt={true}>{data.year}</Tag>
            </div>
        </Container>
    </Link>
    :
    null
    )
}

export default Component