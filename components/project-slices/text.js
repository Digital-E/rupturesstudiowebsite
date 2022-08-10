import RichText from '../rich-text';

import styled from "styled-components"

const Container = styled.div`
    margin: 0 auto;
    padding: 20px;
    max-width: 800px;
    text-align: center;
`


const Component = ({ data }) => {

    return (
        <Container>
            <RichText render={data.variation.primary.text} />
        </Container>
    )
}

export default Component
