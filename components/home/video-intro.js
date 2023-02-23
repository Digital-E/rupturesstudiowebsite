import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

import Tag from '../tags/tag'

import Bowser from "bowser"; 

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: var(--gray);
    overflow: hidden;
    display: none;

    video {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        opacity: 0;
        z-index: 1;
    }

    .show-video {
        opacity: 1 !important;
        transition: opacity 0.7s;
    }


    &.hide-intro-video {
        opacity: 0;
        transition: opacity 0.5s;
    }
`

const Videos = styled.div`
    @media(max-width: 989px) {
        video {
            display: none;
        }
    }
`


const Logo = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    z-index: 0;
    height: 20vh;
    opacity: 0;
    transition: opacity 1s;

    img:nth-child(1) {
        height: 100%;
        margin: 0 5px;
        transition: max-height 1.2s ease-in-out;
    }

    @media(max-width: 989px) {
        height: 100px;
    }
`

const Skip = styled.div`
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;

    > div {
        cursor: pointer;
    }

    &.show-skip-button {
        bottom: 25px !important;
        transition: bottom 1s;
    }
`

const Loader = styled.div`
    position: absolute;
    bottom: 30px;
    left: 30px;
    width: 180px;
    height: 2px;
    background: #b7b7b7;
    z-index: 1;
    border-radius: 0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 1s;
`

const LoaderInner = styled.div`
    width: 0%;
    height: 100%;
    background: #8d8d8d;
    transition: width 1s;
`


let hasLoadedVar = false;
let introSequenceHasFinished = false;
let introLogoSequenceHasFinished = false;
let hasTriggeredOnce = false;
let loadingInterval = null;

const Component = ({ data }) => {
    let containerRef = useRef();
    let videoRef = useRef();
    let logoRef = useRef();
    let skipRef = useRef();
    let loaderRef = useRef();

    let [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {

        document.querySelector('.menu').style.top = "-200px"

        if(window.sessionStorage.getItem('ruptures-studio-intro') === 'true') {
            document.querySelector('.menu').classList.add('display-menu')
            return;
        }

        containerRef.current.style.display = 'block';

        videoRef.current.play()

        setTimeout(() => {
            addEventListeners(); 
        }, 0)

        introSequence();
    }, [])

    let videoId = data;

    let hasLoadedFunc = (e) => {
        hasLoadedVar = true;
        setHasLoaded(true)
    }

    let setSessionStorage = () => {
        window.sessionStorage.setItem('ruptures-studio-intro', 'true')
    }

    let hasClicked = () => {
        if(!introSequenceHasFinished) return;

        containerRef.current.classList.add('hide-intro-video')
        document.querySelector('.menu').classList.add('display-menu')

        setTimeout(() => {
            containerRef.current.style.display = 'none'

            removeEventListeners();
        }, 500);
    }

    let loadedVideoSequence = () => {

        if(hasTriggeredOnce) return;

        setTimeout(() => {

            if(loadingInterval === null) {

                // Display Loader
                loaderRef.current.style.opacity = 1;
                loaderRef.current.children[0].style.width = "50%";

                loadingInterval = setInterval(() => {
                    if(loaderRef.current === null) return
                    let loaderRefValue = loaderRef.current.children[0].style.width.split('%')
                    loaderRef.current.children[0].style.width = `${parseInt(loaderRefValue[0]) + 2}%`;
                }, 500)
            }

            if(!hasLoadedVar) return;
            if(!introLogoSequenceHasFinished) return;

            clearInterval(loadingInterval);

            hasTriggeredOnce = true;

            setTimeout(() => {

            loaderRef.current.children[0].style.width = "100%";

                setTimeout(() => {
                    
                    if(loaderRef.current === null) return
                    
                    logoRef.current.style.opacity = 0;
                    loaderRef.current.style.opacity = 0;

                        setTimeout(() => {
                            introSequenceHasFinished = true;
            
                            setSessionStorage();
            
                            videoRef.current.currentTime = 0;
                            videoRef.current.classList.add("show-video")
            
                            // setTimeout(() => {
                            //     skipRef.current.classList.add('show-skip-button')  
                            // }, 500)
            
                        }, 1500)

                }, 1000)

            }, 1000)
        }, 0)        
    }


    let introSequence = () => {
        setTimeout(() => {
            logoRef.current.style.opacity = 1;

            setTimeout(() => {

                if(window.innerWidth < 990) {
                    setTimeout(() => {
                        containerRef.current.classList.add('hide-intro-video')
                        document.querySelector('.menu').classList.add('display-menu')
                
                        setTimeout(() => {
                            containerRef.current.style.display = 'none'
                            removeEventListeners();

                            setSessionStorage();
                        }, 500);

                    }, 2000);
                    return
                }

                introLogoSequenceHasFinished = true;

                loadedVideoSequence();
            }, 1000)
        }, 1000)
    }

    let disableScroll = (e) => {
        e.preventDefault();
    }


    useEffect(() => {
        if(hasLoaded) {
            loadedVideoSequence();
        }
    }, [hasLoaded])

    let addEventListeners = () => {
        // Mobile disable scroll
        containerRef.current.addEventListener('touchmove', disableScroll, { passive:false });
        

        // Mobile disable scroll
        containerRef.current.addEventListener('wheel', disableScroll, { passive:false });
    }

    let removeEventListeners = () => {
        // Mobile activate scroll
        containerRef.current.removeEventListener('touchmove', disableScroll);

        // Desktop activate scroll
        containerRef.current.removeEventListener('wheel', disableScroll);   
    }

    return (
    <Container ref={containerRef} onClick={hasClicked}>
    <Logo ref={logoRef}>
        <img src={'/images/etoile.png'} />
    </Logo>
    <Loader ref={loaderRef}><LoaderInner /></Loader>
    <Videos>
        <video
            ref={videoRef}
            preload="auto"
            id='video-intro'
            playsInline
            autoPlay 
            muted
            loop
            // onProgress={(e) => console.log(e)}
            // onCanPlayThrough={() => console.log('loaded')}
            src={videoId}
            onLoadedData={hasLoadedFunc}
            // data-poster="/path/to/poster.jpg"
        >
        </video>
    </Videos>
    <Skip ref={skipRef}><Tag>Skip &nbsp;✕</Tag></Skip>
    </Container>
    )
}

export default Component