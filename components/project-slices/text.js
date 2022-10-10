import RichText from '../rich-text';

import styled from "styled-components"

const Container = styled.div`
    margin: 80px auto;
    padding: 0 20px;
    max-width: 800px;
    text-align: center;
`


const Component = ({ data, keyProp }) => {

    return (
        <Container key={keyProp}>
            <RichText render={data.variation.primary.text} />
        </Container>
    )
}

export default Component
