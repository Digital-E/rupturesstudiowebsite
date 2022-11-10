import styled from "styled-components"

import Tags from "../tags"
import Media from "../media"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 0 40px 0;
    overflow: hidden;
`

const InnerContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 20px;
    background-color: var(--gray);
`

const Title = styled.h1`
    margin: 0 0 5px 0;
    text-align: center;
    padding: 0 10px;
`

const MediaWrapper = styled.div`
    position: relative;
    width: 100%;
`



const Component = ({ data }) => {

    return (
        <Container>
            <MediaWrapper 
            data-scroll 
            data-scroll-position="top"
            data-scroll-speed="-1"
            data-scroll-target="#container"
            data-scroll-id="project-hero"
            >
                <Media asset={data} />
            </MediaWrapper>
            <InnerContainer>
                <Title>{ data.title }</Title>
                <Tags data={ data } />
            </InnerContainer>
        </Container>
    )
}

export default Component
