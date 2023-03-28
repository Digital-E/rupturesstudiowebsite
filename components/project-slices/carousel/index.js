import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import styled from "styled-components"

import Slide from './slide'

import wheel from 'wheel';
import normalizeWheel from 'normalize-wheel';

import Link from "../../locale-link"
import Tag from '../../tags/tag'

import _ from "lodash"

let Flickity = null

if (typeof window !== "undefined") {
    Flickity = require("flickity");
  }

const Container = styled.div`
    position: relative;
    width: 100vw;
    margin: 150px 0 150px 0;
    

    [data-plyr="fullscreen"] {
        display: none;
    }

    .flickity-viewport {
        overflow: visible !important;
    }

    @media(max-width: 989px) {
        margin: 70px 0 150px 0;
    }
`

const Carousel = styled.div`
  outline: none !important;
`;

const More = styled.div`
    position: relative;
    font-size: 1rem;
    color: white;
    margin: 0 auto 30px auto;
    width: fit-content;
`



export default ({ data, selectedTag }) => {
    const router = useRouter()
    let [displayProjects, setDisplayProjects] = useState([])
    let [hasTransitioned, setHasTransitioned] = useState(false);
    let [windowHeight, setWindowHeight] = useState(200);
    let gallery = useRef();
    let mouseSwipe;

    let flickity;

    let setWindowHeightFunction = () => {
        if(window.innerWidth < 990) {
            // setWindowHeight(null)
            setWindowHeight(200)
        } else {
            setWindowHeight(window.innerHeight / 2)
        }
    }

    let initFlickity = (resize) => {

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
            
                // freeScroll: window.innerWidth > 989 ? true : false,
                freeScroll: true,

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

            // Cancel Page Swipe Back

            if(document.querySelector("body").classList.contains("safari")) {
                gallery?.current?.addEventListener("wheel", (e) => {
                    if(e.deltaX !== 0) {
                        e.preventDefault()
                    }
                })
            }

            // Mouse swipe

            mouseSwipe = event => {
                const wheelNormalized = normalizeWheel(event);
                // flickity.applyForce(-wheelNormalized.pixelY / 16);
                flickity.applyForce(-wheelNormalized.pixelX / 16);
                flickity.startAnimation();
                flickity.dragEnd();
            }

            if(gallery.current) {
                wheel.addWheelListener(gallery.current, mouseSwipe);
            }



            // Mobile disable scroll while moving
            flickity.on('dragMove', function( event, pointer ) {
                clearTimeout(stopScrollTimeout)

                document.body.addEventListener('touchmove', stopScroll, { passive: false });

                stopScrollTimeout = setTimeout(() => {
                    document.body.removeEventListener('touchmove', stopScroll, { passive: false });
                }, 100)
            });

            flickity.on("staticClick", (event, pointer, cellElement, cellIndex) => {
                if(event.target.classList.contains('plyr__control')) {
                    return
                }

                router.push(cellElement.getAttribute("data-url"), undefined, { scroll: false })
            })

        }, 0);

        let stopScrollTimeout = null;

        let stopScroll = (e) => {
            e.preventDefault()
        };


        // setTimeout(() => {
        //     if(flickity) {
        //         flickity.resize();
        //     }
        // }, 100);

    }


    useEffect(() => {

        setWindowHeightFunction();

        // Randomise Projects

        const shuffleArray = array => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
            }

            return array
        }

        let shuffledArray = shuffleArray(data)

        let splicedArray = shuffledArray.splice(0,6);

        setDisplayProjects(splicedArray)
        
        setTimeout(() => {
            initFlickity();
        }, 50)

        window.addEventListener('resize', () => {
            setWindowHeightFunction()
            // initFlickity(true);
        })
    
        // return () => {
        //   flickity.destroy();
        // };
      }, []);  

    return (
        <Container>
            <More><Link href="/archive"><Tag>More projects</Tag></Link></More>
            <Carousel ref={gallery} key='archive'>
                {displayProjects.map((item, index) => {
                return <Slide key={index} item={item.node} windowHeight={windowHeight} />
                })}
            </Carousel>
        </Container>
    )
}