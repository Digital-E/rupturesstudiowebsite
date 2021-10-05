import { useEffect } from "react";
import styled from "styled-components"

import { RichText } from 'prismic-reactjs';

import Link  from "../link"

const Container = styled.div`
    border-left: 1px solid black;
`

const Name = styled.div`
    padding: 10px;
    font-size: 25px;
    border-bottom: 1px solid black;
    width: 100%;
`

const Gallery = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid;

    > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        border-radius: 999px !important;
        box-shadow: inset 0px 1px 2px black;
        font-size: 16px;
    }

    > div:nth-child(2) {
        padding-left: 10px;
    }

    padding: 10px;
    font-size: 14px;
`

const Commissionner = styled.div`
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid;

    > div > span:nth-child(2) {
        padding-left: 10px;
    }
`

const Podcast = styled.div`
    padding: 10px;
    border-bottom: 1px solid;

    > div:nth-child(2) {
        padding-left: 10px;
    }
`

const Text = styled.div`
    padding: 40px 10px;
`

const TextWrapper = styled.div`
    height: 100%;
    overflow: scroll;
`

const BiographyTitle = styled.div`
    padding: 0 10px;
`







const Component = ({ data }) => {

    useEffect( () => {
        let textWrapper = document.querySelector(".text-wrapper");
        let textWrapperTop = textWrapper.getBoundingClientRect().y;
        let textWrapperHeight = window.innerHeight - textWrapperTop;

        textWrapper.style.height = `${textWrapperHeight}px`;
    })

    return (
        <Container>
            <Name>{data.name}</Name>
            <Gallery>
                <div>
                    <div><span>{data.number}</span></div>
                </div>
                <div>
                    <div>Arcade:</div>
                    <div><Link data={data.arcade_link}>{data.arcade_name}</Link></div>
                </div>
            </Gallery>
            <Commissionner>
                <div>
                    <span>Commissaire/</span>
                    <span><Link data={data.commissionner_link}>{data.commissionner_name}</Link></span>
                </div>
                <div>
                    <span>curator:</span>
                    <span><Link data={data.curator_link}>{data.curator_name}</Link></span>
                </div>
            </Commissionner>
            <Podcast>
                <div></div>
                <div><Link data={data.podcast_link}>Podcast</Link></div>
            </Podcast>

            <TextWrapper className="text-wrapper">
                <div>
                    <Text>
                        {data != null && RichText.render(data.text)}
                    </Text>

                    <BiographyTitle>Biographie</BiographyTitle>

                    <Text>
                        {data != null && RichText.render(data.biography)}
                    </Text>
                </div>
            </TextWrapper>

        </Container>
    )
}

export default Component