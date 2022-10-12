import { useEffect } from "react"
import styled from "styled-components"
import Plyr from "plyr"

import Media from "../media"

import Carousel from "./carousel-media-gallery"

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 100px 0;

    > div {
        display: flex;
        align-items: center;
        width: ${props => props.size === "L" ? "100%" : props.size === "M" ? "80%" : "50%"};
        padding: 0 5px;
    }

    > div > div {
        width: 100%;
        padding: 0 5px;
    }

    @media(max-width: 989px) {
        > div {
            flex-direction: column;
            width: 100%;
        }


    > div > div {
        width: 100%;
        padding: 5px;
    }
    }
`


const Component = ({ data, keyProp }) => {
    let players = null;

    let items = data.variation.items

    if(!data.variation.primary.carousel) {
        items = items.slice(0, 3);
    }

    useEffect(() => {

        players = Plyr.setup('#player', {
            autoplay: true,
            muted: true,
            controls: ['play', 'progress', 'mute'
            // , 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
        ]
        });

        players?.forEach(item => {
            item.muted = true;
        })

        return () => {
            players?.forEach(item => item.destroy())
        }
    },[])

    return (
        data.variation.primary.carousel ?
        <Carousel data={items} keyProp={keyProp} />
        :
        <Container size={data.variation.primary.width} key={keyProp}>
            <div>
                {items.map(item => <div><Media asset={item} /></div>)}
            </div>
        </Container>
    )
}

export default Component
