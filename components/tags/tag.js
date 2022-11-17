import styled from "styled-components"

import Link from "../menu-link"

const Container = styled.div`
    font-size: 0.7rem;
    background: ${props => props.alt ? "black" : "white"};
    color: ${props => props.alt ? "white" : "black"};
    width: fit-content;
    border-radius: 999px;
    padding: 5px 10px;
    margin-right: 4px;
    white-space: nowrap;
    pointer-events: ${props => props.clickable ? "all" : "default"};

    :hover {
        color: white;
        background: black;
        pointer: ${props => props.clickable ? "cursor" : "default"};
    }
`;


const Component = ({ alt, ter, children, clickable }) => {

    let setTag = (item) => {
        window.sessionStorage.setItem("selectedtag", item)
    }

    return (
        clickable === true ?
        <Link href={"/archive"}><Container alt={alt} ter={ter} className='tag' clickable={clickable} onClick={() => setTag(children)}>{children}</Container></Link>
        :
        <Container alt={alt} ter={ter} className='tag'>{children}</Container>
    )
}

export default Component