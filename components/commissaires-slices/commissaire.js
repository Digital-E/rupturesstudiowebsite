import styled from "styled-components";
import { RichText } from 'prismic-reactjs';

import Image from "../image"

const Container = styled.div`
`

const InnerContainer = styled.div`
    height: fit-content;
    padding: 20px;
    border-bottom: 1px solid black;
`


const Name = styled.div`
    font-size: 24px;
`

const Artists = styled.div`
    display: flex;
    margin-top: 15px;

    > div:nth-child(1) {
        font-size: 14px;
    }

    > div:nth-child(2) {
        position: relative;
        margin-top: -2px;
        line-height: 0.8;
        padding-left: 10px;
    }
`

const BiographyTitle = styled.div`
    margin-top: 20px;
`

const BiographyText = styled.div`
    margin-top: 20px;
    font-size: 14px;
`



const Component = ({ data }) => {

    let id = data.item_title.toLowerCase().split(" ").join("-")

    return (
    <Container className="grid-item" id={id}>
        <InnerContainer>
            <Name>{data.item_title}</Name>
            <Artists>
                <div>{data.item_subtitle}:</div>
                <div>{data != null && RichText.render(data.item_subtitle_text)}</div>
            </Artists>
            <BiographyTitle>{data.item_biography_title}</BiographyTitle>
            <BiographyText>{data != null && RichText.render(data.item_biography)}</BiographyText>
        </InnerContainer>

        <Image src={data.item_image}/>
    </Container>
    )
}

export default Component;