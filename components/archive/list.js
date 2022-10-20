import { useEffect } from 'react'
import styled from 'styled-components'

import Tag from '../tags/tag'

import ListItem from './list-item'

const Container = styled.div``

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;

    > div {
        font-size: 0.8rem;
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



const Component = ({ data }) => {

    return (
        <Container>
            <Header>
                {/* <div><Tag>Project</Tag></div>
                <div><Tag>Tags</Tag></div>
                <div><Tag>Year</Tag></div> */}
                <div>Project</div>
                <div>Tags</div>
                <div>Year</div>
            </Header>
            {
                data.map(item => <ListItem data={item.node} />)
            }
        </Container>
    )
}

export default Component