import styled from "styled-components"

import Tags from "../tags"

const Container = styled.div``

const Component = ({ data }) => {
    return (
        <Container>
            <Tags data={data} />
        </Container>
    )
}

export default Component
