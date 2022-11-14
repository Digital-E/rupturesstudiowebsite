import { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components'

import { store } from '../../store'

import Plyr from "plyr"

import { motion } from 'framer-motion'

import Tag from '../tags/tag'

const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 99999 !important;
    backdrop-filter: blur(10px);

    .plyr, .plyr__video-wrapper {
        background: transparent !important;
    }
`

const Video = styled(motion.div)`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    overflow: hidden;
    transform: translate(-50%, -50%);
    z-index: 2;

    @media(max-width: 989px) {
        width: calc(100% - 20px);
    }
`


const Skip = styled.div`
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;

    > div {
        cursor: pointer;
    }

    &.show-skip-button {
        bottom: 25px !important;
        transition: bottom 1s;
    }
`
const Overlay = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1;
`

let players = null;

const Component = ({ data }) => {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;  

    const desktopRef = useRef(null);
    const mobileRef = useRef(null);

    let containerRef = useRef();
    let videoRef = useRef();
    let logoRef = useRef();
    let skipRef = useRef();

    let [reveal, setReveal] = useState(false);

    let videoId = data;

    useEffect(() => {
        players = Plyr.setup("#video-showreel", {
            autoplay: true,
            muted: true,
            controls: ['play', 'progress', 'mute', 'fullscreen'
            // , 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
        ]
        });
        

        players?.forEach(item => {
            item.muted = true;
            item.on('ready', (event) => {
                event.currentTarget.classList.add("show-video")
            })
        })

        return () => {
            players?.forEach(item => item.destroy())
        }
    },[])


    useEffect(() => {
        if(state.showreelOpen) {
            setReveal(true)
            players[0].stop()
            players[0].play()
            addEventListeners(); 

        } else {
            setReveal(false)

            setTimeout(() => {
                players[0].pause()
            }, 1000)
            
            removeEventListeners();      
        }
    }, [state])

    let disableScroll = (e) => {
        e.preventDefault();
    }

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


    let hasClicked = () => {
        dispatch({type: "showreel open", value: false})
    }


    let variants = {
        open: {
            opacity: 1,
            display: "block",
            pointerEvents: 'all',
            transition: {
                duration: 1
            }
        },
        closed: {
            opacity: 0,
            pointerEvents: 'none',
            transition: {
                opacity: {
                    duration: 1,
                    delay: 0.3
                },
                pointerEvents: {
                    duration: 0
                }
            },
            transitionEnd: {
                display: "none",
              },
        }
    }

    let videoVariants = {
        open: {
            opacity: 1,
            top: '50%',
            transition: {
                delay: 0.3,
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        closed: {
            opacity: 0,
            top: '52%',
            transition: {
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    }


    return (
    <Container ref={containerRef} initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
    <Overlay onClick={() => hasClicked()} initial="closed" animate={reveal ? "open" : "closed"} variants={variants} />
    <Video initial="closed" animate={reveal ? "open" : "closed"} variants={videoVariants}>
        <video
            ref={videoRef}
            preload="auto"
            id='video-showreel'
            playsInline
            autoPlay 
            muted
            loop
            src={videoId}
            // onLoadedData={hasLoadedFunc}
            // data-poster="/path/to/poster.jpg"
        >
            {/* <source src={videoId} type="video/mp4" /> */}
        </video>
    </Video>
    <Skip ref={skipRef}><Tag>Close &nbsp;✕</Tag></Skip>
    </Container>
    )
}

export default Component