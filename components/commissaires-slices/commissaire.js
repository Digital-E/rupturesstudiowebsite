import styled from "styled-components";
import RichText from '../rich-text';

import Image from "../image"

const Container = styled.div`
`

const InnerContainer = styled.div`
    height: fit-content;
    padding: 20px;
    border-bottom: 1px solid black;

    @media(max-width: 989px) {
        padding: 20px 10px;
    }
`


const Name = styled.div`
    font-size: 30px;
`

const Artists = styled.div`
    display: flex;
    margin-top: 15px;

    > div:nth-child(1) {

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

    & .small-font-size {
        font-size: inherit;
    }
`



const Component = ({ data }) => {

    let id = data.item_title.toLowerCase().split(" ").join("-")

    return (
    <Container className="grid-item" id={id}>
        <InnerContainer>
            <Name>{data.item_title}</Name>
            <Artists>
                <div className="small-font-size">{data.item_subtitle}:</div>
                <div>
                    <RichText render={data.item_subtitle_text} />
                </div>
            </Artists>
            <BiographyTitle>{data.item_biography_title}</BiographyTitle>
            <BiographyText className="small-font-size">
                <RichText render={data.item_biography} />
            </BiographyText>
        </InnerContainer>

        <Image src={data.item_image}/>
    </Container>
    )
}

export default Component;