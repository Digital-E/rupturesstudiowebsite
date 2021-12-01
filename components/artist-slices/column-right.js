import { useEffect } from "react";
import styled from "styled-components"

import RichText from '../rich-text';

import Link from "../link"

import MenuLink from "../menu-link"

const Container = styled.div`
    border-left: 1px solid black;

    @media(max-width: 989px) {
        border-left: none;
    }

    #newTab {
        display: none;
    }
`

const Name = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    font-size: 30px;
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
        height: 50px;
        width: 50px;
        min-height: 50px;
        min-width: 50px;
        border-radius: 999px !important;
        box-shadow: inset 0px 1px 2px black;
        font-size: 20px;
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
        padding-left: 6px;
    }
`

const Podcast = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid;
    display: flex;
    align-items: center;

    > div {
        display: flex;
        align-items: center;  
    }

    > div:nth-child(2) {
        padding-left: 15px;
    }

    #podcast {
        width: 25px;
    }
`

const Text = styled.div`
    padding: 20px 10px;
`

const BioText = styled.div`
    padding: 20px 10px;

    & .small-font-size {
        font-size: inherit;
    }
`

const TextWrapper = styled.div`
    height: 100%;
    overflow: scroll;
`

const BiographyTitle = styled.div`
    padding: 0 10px;
`

const Arrows = styled.div`
    display: flex;
`


const ArrowLeft = styled.div`
    cursor: pointer;

    @media(max-width: 989px) {
        svg {
          height: 20px !important;
        }
      }
`

const ArrowRight = styled.div`
    position: relative;
    cursor: pointer;
    margin-left: 15px;

    svg {
        transform: rotateZ(180deg);
    }

    @media(max-width: 989px) {
        svg {
          height: 20px !important;
        }
      }
`



const Component = ({ data, nextPrevArtists }) => {


    const init = () => {
        if(window.innerWidth > 989) {
            let textWrapper = document.querySelector(".text-wrapper");
            let textWrapperTop = textWrapper.getBoundingClientRect().y;
            let textWrapperHeight = window.innerHeight - textWrapperTop;
    
            textWrapper.style.height = `${textWrapperHeight}px`;
        }
    }

    useEffect(() => {

        init();

        window.addEventListener("resize", init)

        return () => {
            window.removeEventListener("resize", init)
        }
    })

    const newTabFunction = () => {
        if(document.querySelector("#newTab").children[0].children[0].children[0].src === "") return

        var w = window.open();
        var html = document.querySelector("#newTab").innerHTML;
      
        w.document.body.innerHTML = html;
        w.document.title = `Podcast | ${data.name}`;
    }

    return (
        <Container>
            <Name>
                <div>
                    {data.name}
                </div>
                <Arrows>
                    <ArrowLeft>
                        <MenuLink href={nextPrevArtists.prev}>
                                <svg height="25px" x="0px" y="0px" viewBox="0 0 16.63 12.99">
                                <polygon points="6.68,0.14 0.32,6.5 6.68,12.86 8.74,12.86 3.17,7.24 16.34,7.24 16.34,5.76 3.17,5.76 8.74,0.14 "/>
                                </svg> 
                        </MenuLink>  
                    </ArrowLeft>
                    <ArrowRight>
                        <MenuLink href={nextPrevArtists.next}>
                            <svg height="25px" x="0px" y="0px" viewBox="0 0 16.63 12.99">
                            <polygon points="6.68,0.14 0.32,6.5 6.68,12.86 8.74,12.86 3.17,7.24 16.34,7.24 16.34,5.76 3.17,5.76 8.74,0.14 "/>
                            </svg>   
                        </MenuLink> 
                    </ArrowRight>                 
                </Arrows>
            </Name>
            <Gallery>
                <div>
                    <div><span>{data.number}</span></div>
                </div>
                <div>
                    <div>{data.arcade_title}</div>
                    <div><Link data={data.arcade_link}>{data.arcade_name}</Link></div>
                </div>
            </Gallery>
            <Commissionner>
                <div>
                    <span>{data.commissionner_title}</span>
                    <span><Link data={data.commissionner_link}>{data.commissionner_name}</Link></span>
                </div>
                {/* <div>
                    <span>curator:</span>
                    <span><Link data={data.curator_link}>{data.curator_name}</Link></span>
                </div> */}
            </Commissionner>
            <Podcast>
                <div>
                    <svg version="1.1" id="podcast" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 15.7 17.23">
                    <g>
                    <defs>
                    <rect id="SVGID_1_" x="0.31" y="0.27" width="14.95" height="16.59"/>
                    </defs>
                    <clipPath id="SVGID_2_">
                    <use />
                    </clipPath>
                    <path className="st0" d="M7.66,0.27c1.74,0,3.27,0.49,4.62,1.51c1.36,1.03,2.28,2.38,2.72,4.03c0.49,1.88,0.28,3.7-0.64,5.42
                    c-0.72,1.34-1.77,2.36-3.12,3.07c-0.29,0.15-0.62,0.06-0.78-0.2c-0.17-0.28-0.07-0.64,0.23-0.8c0.42-0.22,0.82-0.48,1.18-0.79
                    c1.17-1.01,1.91-2.27,2.15-3.8c0.27-1.69-0.09-3.26-1.1-4.66c-1.07-1.48-2.54-2.34-4.35-2.58C5.38,1.06,2.37,3.11,1.65,6.22
                    c-0.53,2.31,0.07,4.32,1.75,6.01c0.42,0.43,0.92,0.76,1.45,1.04c0.38,0.2,0.44,0.66,0.14,0.95c-0.18,0.16-0.43,0.19-0.67,0.07
                    c-0.48-0.25-0.92-0.55-1.33-0.89c-1.12-0.95-1.93-2.12-2.34-3.52c-0.65-2.21-0.36-4.3,0.9-6.23c1.16-1.77,2.82-2.85,4.91-3.25
                    c0.21-0.04,0.41-0.07,0.62-0.08C7.29,0.29,7.5,0.28,7.66,0.27"/>
                    <path className="st0" d="M8.09,2.56c1.75,0.09,3.33,1,4.29,2.84c0.99,1.89,0.66,4.17-0.77,5.76c-0.08,0.09-0.17,0.18-0.26,0.26
                    c-0.23,0.21-0.58,0.2-0.8-0.02c-0.22-0.22-0.22-0.58,0-0.8c0.25-0.25,0.47-0.52,0.66-0.82c0.88-1.43,0.74-3.34-0.35-4.63
                    C9.62,3.67,7.53,3.27,5.84,4.2C4.36,5,3.54,6.69,3.81,8.34c0.14,0.87,0.54,1.61,1.17,2.23c0.17,0.16,0.22,0.36,0.16,0.58
                    c-0.06,0.21-0.21,0.35-0.43,0.39c-0.2,0.05-0.38-0.01-0.53-0.16c-0.73-0.72-1.22-1.57-1.44-2.57c-0.5-2.27,0.55-4.55,2.6-5.65
                    C6.08,2.77,6.93,2.56,8.09,2.56"/>
                    <path className="st0" d="M7.78,10.57c0.94,0,1.71,0.75,1.71,1.69c0,0.3-0.07,0.59-0.12,0.89C9.24,14,9.08,14.86,8.94,15.72
                    c-0.05,0.31-0.13,0.6-0.37,0.82c-0.33,0.3-0.72,0.4-1.14,0.26C7,16.66,6.74,16.36,6.66,15.92c-0.2-1.09-0.37-2.18-0.57-3.27
                    c-0.16-0.89,0.29-1.52,0.78-1.83C7.14,10.66,7.46,10.56,7.78,10.57"/>
                    <path className="st0" d="M7.78,9.42c-0.95,0-1.73-0.77-1.73-1.72c0-0.94,0.77-1.71,1.72-1.71c0.96,0,1.73,0.76,1.73,1.71
                    C9.5,8.65,8.73,9.42,7.78,9.42"/>
                    </g>
                    </svg>                    
                </div>
                {/* <div><Link data={data.podcast_link}>Podcast</Link></div> */}
                <div><a href="javascript:;" id="podcast-link-open" onClick={() => newTabFunction()}>Podcast</a></div>
                <div id="newTab">
                    <div style={{display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center"}}>
                        <audio controls>
                        <source src={data.podcast_link?.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>            
            </Podcast>

            <TextWrapper className="text-wrapper">
                <div>
                    <Text>
                        <RichText render={data.text} 
                            // htmlSerializer={htmlSerializer} 
                        />
                    </Text>

                    {/* <BiographyTitle>Biographie</BiographyTitle> */}

                    <BioText className="small-font-size">
                        <RichText render={data.biography} 
                            // htmlSerializer={htmlSerializer} 
                        />
                    </BioText>
                </div>
            </TextWrapper>

        </Container>
    )
}

export default Component