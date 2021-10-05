import { useState, useEffect, useRef } from "react";
import styled from "styled-components"

import Image from "../image"

let Flickity = null

if (typeof window !== "undefined") {
    Flickity = require("flickity");
  }

const Container = styled.div`
    height: 100%;
    width: 100%;
`

const Carousel = styled.div`
  position: relative;
  outline: none !important;
  height: 100% !important;
  width: 100% !important;

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
  height: 100%;
  width: 100%; 

  > div {
      padding: 0 !important;
      height: 100%;
      width: 100%; 
  }

  > div > picture > img {
    object-fit: cover;
  }
`;

const Component = ({ data }) => {
    let [flickity, setFlickity] = useState(null);
    let gallery = useRef();

    useEffect(() => {
        setTimeout(()=>{
        let flickity = new Flickity(gallery.current, {
          // options, defaults listed
          imagesLoaded: true,
    
          fade: true,
    
          accessibility: true,
          // enable keyboard navigation, pressing left & right keys
    
          adaptiveHeight: false,
          // set carousel height to the selected slide
    
          autoPlay: true,
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
    
          dragThreshold: 1,
          // number of pixels a user must scroll horizontally to start dragging
          // increase to allow more room for vertical scroll for touch devices
    
          freeScroll: false,
          // enables content to be freely scrolled and flicked
          // without aligning cells
    
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
    
          percentPosition: false,
          // sets positioning in percent values, rather than pixels
          // Enable if items have percent widths
          // Disable if items have pixel widths, like images
    
          prevNextButtons: false,
          // creates and enables buttons to click to previous & next cells
    
          pageDots: true,
          // create and enable page dots
    
          resize: true,
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
    
        setFlickity(flickity);
        }, 250);
    
    
        // flickity.on("change", () => {
        //     let projectIndex = document.querySelector(".is-selected").getAttribute("data-project-index")
        //     let slideIndex = document.querySelector(".is-selected").getAttribute("data-slide-index")
    
        //     updateIndex(projectIndex, slideIndex);
        // })
    
        // flickity.select(initSlide);
        // }, 0);
    
    
        // setTimeout(() => {
        //   flickity.resize();
        // }, 750);
    
        // return () => {
        //   flickity.destroy();
        // };
      }, []);  

    return (
        <Container>
            <Carousel ref={gallery}>
                {data.map((item, index) => {
                    return (
                            <Slide key={index}>
                                <Image src={item.image} />
                            </Slide>
                    );
                    })}                
            </Carousel>
        </Container>
    )
}

export default Component