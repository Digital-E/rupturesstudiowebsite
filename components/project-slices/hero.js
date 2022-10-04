import styled from "styled-components"

import Tags from "../tags"
import Media from "../media"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 40px 0;
`

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin-top: 20px;
`

const Title = styled.h1`
    margin: 0 0 5px 0;
`


const Component = ({ data }) => {

    return (
        <Container>
            <Media asset={data} />
            <InnerContainer>
                <Title>{ data.title }</Title>
                <Tags data={ data } />
            </InnerContainer>
        </Container>
    )
}

export default Component
