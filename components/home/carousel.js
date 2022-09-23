import { useState, useEffect, useRef } from "react";
import styled from "styled-components"

import Link from "../menu-link"

import Media from "../media"

import wheel from 'wheel';
import normalizeWheel from 'normalize-wheel';

import Tags from "../tags"

import gsap from "gsap"

let Flickity = null

if (typeof window !== "undefined") {
    Flickity = require("flickity");
  }

const Container = styled.div`
    position: relative;
    z-index: 1;
    overflow: hidden;
    margin-bottom: 100px;

    .flickity-viewport {
        overflow: visible !important;
    }

    :hover .more {
        opacity: 1;
        transition: opacity 0.3s;
    }
`

const Carousel = styled.div`
  outline: none !important;
`;


const Slide = styled.div`
    position: absolute;
    padding: 0 5px;
    opacity: 1;
    filter: blur(0px);
    transition: filter ease-in-out 1s, opacity ease-in-out 1s;


    img, video {
        transform: scale(1);
        transition: transform 5s, opacity ease-in-out 1s !important;
    }

    :hover img, :hover video {
        transform: scale(1.2);
        transition: transform 1s;
    }
    
    &.hide-slide {
        opacity: 1;
        filter: blur(10px);
        transition: filter ease-in-out 1s,opacity ease-in-out 1s;
    }

    > div > div {
        opacity: 1;
        transition: filter ease-in-out 1s,opacity ease-in-out 1s;
    }

    &.hide-slide img, &.hide-slide > div > div {
        opacity: 0.5;
        transition: filter ease-in-out 1s,opacity ease-in-out 1s;
    }
`;

const MediaContainer = styled.div`
    height: 50vh;
    width: fit-content;
    position: relative;
`;

const Information = styled.div`
    margin-left: 10px;
`;

const Title = styled.div`
    font-family: Neue Haas Grotesk Regular;
    padding-top: 8px;
    text-transform: capitalize;
    width: fit-content;

    a {
        display: flex;
        align-items: center;
        flex-direction: row;
        color: black !important;
    }
`;

const More = styled.div`
    position: relative;
    top: 1.5px;
    height: 12px;
    width: 12px;
    margin-left: 4px;
    opacity: 0;
    transition: opacity 0.5s;
`


export default ({ data }) => {
    let [flickity, setFlickity] = useState(null);
    let [windowHeight, setWindowHeight] = useState(0);
    let gallery = useRef();

    let scrollTimeout = null;
    let isScrolling = false;


    let scroll = () => {
        clearTimeout(scrollTimeout);
        isScrolling = true;

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 250);
    }

    useEffect(() => {
        setWindowHeight(window.innerHeight / 2)

        // window.addEventListener("scroll", scroll)

        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight / 2)
        })
    }, []);

    useEffect(() => {
        let flickity;

        setTimeout(()=>{
            flickity = new Flickity(gallery.current, {
                // options, defaults listed
                imagesLoaded: false,
            
                fade: false,
            
                accessibility: true,
                // enable keyboard navigation, pressing left & right keys
            
                adaptiveHeight: false,
                // set carousel height to the selected slide
            
                autoPlay: false,
                // advances to the next cell
                // if true, default is 3 seconds
                // or set time between advances in milliseconds
                // i.e. `autoPlay: 1000` will advance every 1 second
            
                cellAlign: "center",
                // alignment of cells, 'center', 'left', or 'right'
                // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)
            
                cellSelector: undefined,
                // specify selector for cell elements
            
                contain: false,
                // will contain cells to container
                // so no excess scroll at beginning or end
                // has no effect if wrapAround is enabled
            
                draggable: ">1",
                // enables dragging & flicking
                // if at least 2 cells
            
                dragThreshold: 0,
                // number of pixels a user must scroll horizontally to start dragging
                // increase to allow more room for vertical scroll for touch devices
            
                freeScroll: window.innerWidth > 989 ? true : false,

                // enables content to be freely scrolled and flicked
                // without aligning cells

                selectedAttraction: 0.05,

                friction: 0.4,
                // smaller number = easier to flick farther
            
                groupCells: false,
                // group cells together in slides
            
                initialIndex: 0,
                // zero-based index of the initial selected cell
            
                lazyLoad: false,
                // enable lazy-loading images
                // set img data-flickity-lazyload="src.jpg"
                // set to number to load images adjacent cells
            
                percentPosition: true,
                // sets positioning in percent values, rather than pixels
                // Enable if items have percent widths
                // Disable if items have pixel widths, like images
            
                prevNextButtons: false,
                // creates and enables buttons to click to previous & next cells
            
                pageDots: false,
                // create and enable page dots
            
                resize: window.innerWidth > 989 ? true : false,
                // listens to window resize events to adjust size & positions
            
                rightToLeft: false,
                // enables right-to-left layout
            
                // setGallerySize: true,
                // sets the height of gallery
                // disable if gallery already has height set with CSS
            
                watchCSS: false,
                // watches the content of :after of the element
                // activates if #element:after { content: 'flickity' }
            
                wrapAround: true,
                // at end of cells, wraps-around to first for infinite scrolling
            });

            // introGallery();
        
            setFlickity(flickity);

            // Cancel Page Swipe Back

            gallery.current.addEventListener("wheel", (e) => {
                if(e.deltaX !== 0) {
                    e.preventDefault()
                }
            })

            // Mouse swipe

            wheel.addWheelListener(gallery.current, event => {

                if(isScrolling) return;

                const wheelNormalized = normalizeWheel(event);
                flickity.applyForce(-wheelNormalized.pixelX / 16);
                flickity.startAnimation();
                flickity.dragEnd();
            });

            // Mobile disable scroll while moving
            flickity.on( 'dragMove', function( event, pointer ) {
                clearTimeout(stopScrollTimeout)

                document.body.addEventListener('touchmove', stopScroll, { passive: false });

                stopScrollTimeout = setTimeout(() => {
                    document.body.removeEventListener('touchmove', stopScroll, { passive: false });
                }, 100)
            });

        }, 0);

        let stopScrollTimeout = null;

        let stopScroll = (e) => {
            e.preventDefault()
        };

        let introGallery = () => {
            
            gsap.to(".carousel-slide", {opacity: 0, top: "0"});

            gsap.to(".carousel-slide", {opacity: 1, stagger: 0.1, duration: 3, ease: "power3.out",  top: "0"});
        }

    
        // flickity.on("change", () => {
        //     let projectIndex = document.querySelector(".is-selected").getAttribute("data-project-index")
        //     let slideIndex = document.querySelector(".is-selected").getAttribute("data-slide-index")
    
        //     updateIndex(projectIndex, slideIndex);
        // })
    
        // flickity.select(initSlide);
        // }, 0);
    
    
        setTimeout(() => {
          flickity.resize();
        }, 10);
    
        return () => {
          flickity.destroy();
        };
      }, []);  
    

    return (
        <Container>
            <Carousel ref={gallery}>
                {data.thumbnails.map((item, index) => {
                return (
                        <Slide key={index} className="carousel-slide">
                            <MediaContainer>
                                <Media asset={item} windowHeight={windowHeight} />
                            </MediaContainer>
                        </Slide>
                );
                })}
            </Carousel>
            <Information>
            <Title>
                <Link href={`/projects/${data._meta.uid}`}>
                    <span>{data.title}</span>
                    <More className="more">
                        <svg viewBox="0 0 700 700">
                            <g>
                            <path d="m210 260h-0.28125c-11.043 0-20.004 8.9414-20.004 20.004 0 11.059 8.9414 20.004 20.004 20.004h0.29688 279.96 0.28125c11.043 0 20.004-8.9414 20.004-20.004 0-11.059-8.9414-20.004-20.004-20.004h-0.29688z"/>
                            <path d="m370 140v-0.28125c0-11.043-8.9414-20.004-20.004-20.004-11.059 0-20.004 8.9414-20.004 20.004v0.29688-0.015625 279.98 0.28125c0 11.043 8.9414 20.004 20.004 20.004 11.059 0 20.004-8.9414 20.004-20.004v-0.29688 0.015625z"/>
                            <path d="m350 0c-154.4 0-279.98 125.6-279.98 279.98s125.6 279.98 279.98 279.98c154.4 0 279.98-125.6 279.98-279.98s-125.6-279.98-279.98-279.98zm0 40.004c132.79 0 240 107.22 240 240s-107.2 240-240 240c-132.79 0-240-107.2-240-240 0-132.79 107.2-240 240-240z"/>
                            </g>
                        </svg>
                    </More>
                </Link>
            </Title>
                <Tags data={data} />
            </Information>
        </Container>
    )
}