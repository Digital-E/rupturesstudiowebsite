import { useRouter } from "next/router"

import styled from "styled-components"

const Container = styled.div`
    > a {
        display: inline-block;
        font-size: 0.7rem;
        background: ${props => props.alt ? "black" : "white"};
        color: ${props => props.alt ? "white" : "black"};
        width: fit-content;
        border-radius: 999px;
        padding: 5px 10px;
        margin-right: 4px;
        white-space: nowrap;
    }

    &&.active-link > a {
        background: black;
        color: white;
    }

    @media(min-width: 990px) {
        :hover > a {
            background: black;
            color: white;
        }
    }
`;

const Component = ({ data, alt, children}) => {
    let router = useRouter()

    return <Container alt={alt} className={(router.asPath === `/${data?._meta?.uid}`) || (router.asPath === data) ? "active-link" : ""}>{children}</Container>
}

export default Component