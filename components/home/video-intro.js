import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'

import Tag from '../tags/tag'

const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: var(--gray);
    overflow: hidden;

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

const Videos = styled.div``


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
    height: 14vh;
    opacity: 0;
    transition: opacity 1s;

    img:nth-child(2) {
        height: 100%;
        margin: 0 5px;
        max-width: 0px;
        transition: max-width 1s;
    }

    img:nth-child(1),
    img:nth-child(3)
     {
        height: 40%;
    }

    .remove-max-width {
        max-width: 100px !important
    }

    @media(max-width: 989px) {
        height: 50px;

        .remove-max-width {
            max-width: 50px !important
        }
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


let hasLoadedVar = false;
let introSequenceHasFinished = false;

const Component = ({ data }) => {
    let containerRef = useRef();
    let videoRef = useRef();
    let logoRef = useRef();
    let skipRef = useRef();

    let [hasLoaded, setHasLoaded] = useState(false);

    let videoId = data;

    let hasLoadedFunc = (e) => {
        document.querySelector('#home-container').style.opacity = 1
        hasLoadedVar = true;
        setHasLoaded(true)
    }

    let setSessionStorage = () => {
        window.sessionStorage.setItem('ruptures-studio-intro', 'true')
    }

    let hasClicked = () => {
        if(!introSequenceHasFinished) return;

        containerRef.current.classList.add('hide-intro-video')
        document.querySelector('#home-container').classList.remove('hide-home')

        setTimeout(() => {
            containerRef.current.style.display = 'none'
            window.scroll.start()
        }, 500);
    }

    let loadedVideoSequence = () => {
        if(!hasLoadedVar) return;
        
        setTimeout(() => {
            logoRef.current.style.opacity = 0;

            setTimeout(() => {
                introSequenceHasFinished = true;

                // setSessionStorage();

                videoRef.current.classList.add("show-video")

                setTimeout(() => {
                    skipRef.current.classList.add('show-skip-button')  
                }, 500)

            }, 1000)

        }, 1000)        
    }


    let introSequence = () => {
        setTimeout(() => {
            logoRef.current.style.opacity = 1;

            setTimeout(() => {
                logoRef.current.children[1].classList.add('remove-max-width');

                if(window.innerWidth < 990) {
                    setTimeout(() => {
                        containerRef.current.classList.add('hide-intro-video')
                        document.querySelector('#home-container').classList.remove('hide-home')
                
                        setTimeout(() => {
                            containerRef.current.style.display = 'none'
                            document.removeEventListener('touchmove', disableScroll);
                        }, 500);

                    }, 2000);
                    return
                }


                loadedVideoSequence();

            }, 750)
        }, 1000)
    }

    let disableScroll = (e) => {
        e.preventDefault();
    }


    useEffect(() => {
        // if(window.sessionStorage.getItem('ruptures-studio-intro') === 'true') {
        //     document.querySelector('#home-container').classList.remove('hide-home');
        //     containerRef.current.style.display = 'none';
        //     return;
        // }


        setTimeout(() => {
            // Mobile disable scroll
            document.addEventListener('touchmove', disableScroll, { passive:false });

            // Desktop disable scroll
            window.scroll.stop()
        }, 0)

        introSequence();
    }, [])

    useEffect(() => {

        if(hasLoaded && introSequenceHasFinished) {
            loadedVideoSequence();
        }
    }, [hasLoaded])

    return (
    <Container ref={containerRef} onClick={hasClicked}>
    <Logo ref={logoRef}>
        <img src={'/images/logo-split/RUPTURES-01.svg'} />
        <img src={'/images/logo-split/RUPTURES-03.svg'} />
        <img src={'/images/logo-split/RUPTURES-02.svg'} />
    </Logo>
    <Videos>
        <video
            ref={videoRef}
            id='video-intro'
            playsInline
            autoPlay 
            muted
            loop
            onLoadedData={hasLoadedFunc}
            // data-poster="/path/to/poster.jpg"
        >
            <source src={videoId} type="video/mp4" />
        </video>
    </Videos>
    <Skip ref={skipRef}><Tag>Skip Showreel &nbsp;✕</Tag></Skip>
    </Container>
    )
}

export default Component