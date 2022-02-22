import React, {useEffect, useState, useContext} from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const PopUp = styled(motion.div)`
    position: fixed;
    // width: 380px;
    height: auto;
    z-index: 999;
    min-width: 380px;

    @media(max-width: 989px) {
        width: calc(100% - 80px);
    }
` 

const Podcast = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: white;
    border: 1px solid black;
    padding: 20px;
    border-radius: 15px !important;

     > a  {
        padding: 10px 20px;
        background-color: rgba(255, 148, 67);
        border-radius: 999px !important;
        border: 1px solid black;
        display: flex;
        align-items: center;
        color: black !important;
        width: fit-content;
        margin-top: 10px;
    }

    > a > div:nth-child(2) {
        padding-left: 15px;
    }

    #podcast-link-open:hover path {
        fill: black !important;
    }

    #podcast {
        width: 25px;
    }
`


const Text = styled.div`
    p {
        margin-bottom: 5px !important;
    }
`



const CloseButton = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
`

const Overlay = styled(motion.div)`
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 148, 67, 0.8);
`

const Player = styled.div`
    width: 100%;
    margin-top: 10px;

    audio {
        width: 100%;
    }
`


const popUpVariants = {
    hidden: {
        opacity: 1,
        y: "100vh",
        x: "-50%",
        left: "50%",
        top: "50%",
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    visible: {
        opacity: 1,
        y: "-50%",
        x: "-50%",
        left: "50%",
        top: "50%",
        transition: {
            duration: 1,
            type: 'spring',
            ease: "easeInOut",
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const overlayVariants = {
    hidden: {
        opacity: 0,
        transitionEnd: {
            display: "none"
        }
    },
    visible: {
        opacity: 1,
        display: "block"
    }
}

const Component = ({ data, popUpOpen, setPopUpOpen }) => {

    const togglePopUp = () => {
        if(popUpOpen) {
            setPopUpOpen(false)
        } else {
            setPopUpOpen(true)
        }
    }

    useEffect(() => {
        if(window.location.hash === "#podcast") {
            setPopUpOpen(true)
        }
      },[])

        // const newTabFunction = () => {
        // if(document.querySelector("#newTab").children[0].children[0].children[0].src === "") return

        // var w = window.open();
        // var html = document.querySelector("#newTab").innerHTML;

        // w.document.body.innerHTML = html;
        // w.document.title = `Podcast | ${data.name}`;
        // }      

    return (
        <>
        <Overlay onClick={() => togglePopUp()} animate={popUpOpen ? "visible" : "hidden"} variants={overlayVariants}/>
        <PopUp initial={"hidden"} animate={popUpOpen ? "visible" : "hidden"} variants={popUpVariants}>
            {/* <CloseButton onClick={() => togglePopUp(1)}>
                <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1">
                    <title>Group 4</title>
                    <g id="DESKTOP" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="WTF-IS-A-DIGI-FAIRY_DESKTOP" transform="translate(-765.000000, -273.000000)" stroke="#000000">
                            <g id="Group-2" transform="translate(766.000000, 274.000000)">
                                <circle id="Oval" strokeWidth="0.2" cx="8.5" cy="8.5" r="8.5"></circle>
                                <g id="Group-3" transform="translate(5.000000, 5.000000)" fill="#000000" strokeLinecap="round">
                                    <line x1="0.269230769" y1="0.269230769" x2="6.73076923" y2="6.73076923" id="Line-2"></line>
                                    <line x1="0.269230769" y1="0.269230769" x2="6.73076923" y2="6.73076923" id="Line-2" transform="translate(3.500000, 3.500000) scale(-1, 1) translate(-3.500000, -3.500000) "></line>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>                    
            </CloseButton> */}
            {/* <PopUpInformation dangerouslySetInnerHTML={{ __html: data !== null && data.PopUpOneText }}/> */}
            <Podcast>
                <Text>
                    <p>{data.name}</p>
                    <p>{data.podcast_name}</p>
                </Text>
                {/* <a href="javascript:;" id="podcast-link-open" onClick={() => newTabFunction()}>
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
                    <Text>
                        Ecouter Podcast
                    </Text>                      
                </a>                   */}
                <Player>
                    <audio controls>
                    <source src={data.podcast_link?.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                </Player>            
            </Podcast>            
        </PopUp>
        </>          
    )
}

export default Component