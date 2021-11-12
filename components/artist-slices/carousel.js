import { useState, useEffect, useRef } from "react";
import styled from "styled-components"

import Image from "../image"

let Flickity = null

if (typeof window !== "undefined") {
    Flickity = require("flickity");
  }

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    .carousel-arrow {
      opacity: 0;
      transition-duration: 0.3s;
      cursor: pointer;
    }

    &.carousel-container.show-arrows .carousel-arrow {
      opacity: 1;
      transition-duration: 0.3s;
    }

    .flickity-viewport {
      height: 100% !important;
    }

    @media(max-width: 989px) {
      order: 1;
    }
`

const Carousel = styled.div`
  position: relative;
  outline: none !important;
  height: 100% !important;
  width: 100% !important;

  overflow: scroll;

  .flickity-viewport {
    height: 100%;
    width: 100%;
  }

  .flickity-page-dots {
      bottom: 20px;
  }

  .flickity-page-dots .dot {
      border-radius: 999px !important;
      opacity: 1 !important;
      background-color: transparent;
     border: 1px solid white;
  }

  .flickity-page-dots .dot.is-selected {
    background-color: white;
}
`;

const Slide = styled.div`
  // height: 100%;
  width: 100%; 

  > div {
      // height: 100%;
      width: 100%; 
  }

  > div > picture > img {
    object-fit: cover;
  }

  @media(min-width: 990px) {
    > div {
      // padding: 0 !important;
    }
  }

  @media(max-width: 989px) {
    border-top: 1px solid black;
  }
`;

const ArrowLeft = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 999;

  @media(max-width: 989px) {
    display: none;
  }
`

const ArrowRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 999;
  transform: rotateZ(180deg);

  @media(max-width: 989px) {
    display: none;
  }
`


const Component = ({ data }) => {
    let [flickity, setFlickity] = useState(null);
    let gallery = useRef();

    // useEffect(() => {
    //       if(window.innerWidth > 989) {
    //       let flickity = new Flickity(gallery.current, {
    //         // options, defaults listed
    //         imagesLoaded: true,
      
    //         fade: true,
      
    //         accessibility: true,
    //         // enable keyboard navigation, pressing left & right keys
      
    //         adaptiveHeight: false,
    //         // set carousel height to the selected slide
      
    //         autoPlay: true,
    //         // advances to the next cell
    //         // if true, default is 3 seconds
    //         // or set time between advances in milliseconds
    //         // i.e. `autoPlay: 1000` will advance every 1 second
      
    //         cellAlign: "center",
    //         // alignment of cells, 'center', 'left', or 'right'
    //         // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)
      
    //         cellSelector: undefined,
    //         // specify selector for cell elements
      
    //         contain: false,
    //         // will contain cells to container
    //         // so no excess scroll at beginning or end
    //         // has no effect if wrapAround is enabled
      
    //         draggable: ">1",
    //         // enables dragging & flicking
    //         // if at least 2 cells
      
    //         dragThreshold: 1,
    //         // number of pixels a user must scroll horizontally to start dragging
    //         // increase to allow more room for vertical scroll for touch devices
      
    //         freeScroll: false,
    //         // enables content to be freely scrolled and flicked
    //         // without aligning cells
      
    //         friction: 0.4,
    //         // smaller number = easier to flick farther
      
    //         groupCells: false,
    //         // group cells together in slides
      
    //         initialIndex: 0,
    //         // zero-based index of the initial selected cell
      
    //         lazyLoad: false,
    //         // enable lazy-loading images
    //         // set img data-flickity-lazyload="src.jpg"
    //         // set to number to load images adjacent cells
      
    //         percentPosition: false,
    //         // sets positioning in percent values, rather than pixels
    //         // Enable if items have percent widths
    //         // Disable if items have pixel widths, like images
      
    //         prevNextButtons: false,
    //         // creates and enables buttons to click to previous & next cells
      
    //         pageDots: false,
    //         // create and enable page dots
      
    //         resize: true,
    //         // listens to window resize events to adjust size & positions
      
    //         rightToLeft: false,
    //         // enables right-to-left layout
      
    //         // setGallerySize: true,
    //         // sets the height of gallery
    //         // disable if gallery already has height set with CSS
      
    //         watchCSS: false,
    //         // watches the content of :after of the element
    //         // activates if #element:after { content: 'flickity' }
      
    //         wrapAround: true,
    //         // at end of cells, wraps-around to first for infinite scrolling
    //       });
      
    //       setFlickity(flickity);
    //     }

    
    
    //     // flickity.on("change", () => {
    //     //     let projectIndex = document.querySelector(".is-selected").getAttribute("data-project-index")
    //     //     let slideIndex = document.querySelector(".is-selected").getAttribute("data-slide-index")
    
    //     //     updateIndex(projectIndex, slideIndex);
    //     // })
    
    //     // flickity.select(initSlide);
    //     // }, 0);
    
    
    //     // return () => {
    //     //   flickity.destroy();
    //     // };

    //     document.querySelector(".carousel-container").addEventListener("mouseenter", () => {
    //       document.querySelector(".carousel-container").classList.add("show-arrows")
    //     })

    //     document.querySelector(".carousel-container").addEventListener("mouseleave", () => {
    //       document.querySelector(".carousel-container").classList.remove("show-arrows")
    //     })
    //   }, []);
      
      const changeSlide = (value) => {
        if(value === "previous") {
          flickity.previous()
        } else {
          flickity.next()
        }
      }

    return (
        <Container className="carousel-container">
          <ArrowLeft className="carousel-arrow" onClick={() => changeSlide("previous")}>
            <svg height="25px" x="0px" y="0px" viewBox="0 0 16.63 12.99">
            <polygon points="6.68,0.14 0.32,6.5 6.68,12.86 8.74,12.86 3.17,7.24 16.34,7.24 16.34,5.76 3.17,5.76 8.74,0.14 "/>
            </svg>
          </ArrowLeft>          
            <Carousel ref={gallery}>
                {data.map((item, index) => {
                    return (
                            <Slide key={index}>
                                <Image src={item.image} />
                            </Slide>
                    );
                    })}                
            </Carousel>
          <ArrowRight className="carousel-arrow" onClick={() => changeSlide("next")}>
            <svg height="25px" x="0px" y="0px" viewBox="0 0 16.63 12.99">
            <polygon points="6.68,0.14 0.32,6.5 6.68,12.86 8.74,12.86 3.17,7.24 16.34,7.24 16.34,5.76 3.17,5.76 8.74,0.14 "/>
            </svg>
          </ArrowRight>              
        </Container>
    )
}

export default Component