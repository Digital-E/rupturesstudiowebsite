import { useEffect } from "react"
import styled from "styled-components"
import Plyr from "plyr"

import Media from "../media"

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
        // width: ${props => props.itemCount === 3 ? "20%" : props.itemCount === 2 ? "50%" : "50%"};
        width: 100%;
        padding: 0 5px;
    }
`


const Component = ({ data }) => {
    let players = null;

    let items = data.variation.items
    items = items.slice(0, 3);

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
        <Container size={data.variation.primary.width}>
            <div>
                {items.map(item => <div><Media asset={item} /></div>)}
            </div>
        </Container>
    )
}

export default Component
