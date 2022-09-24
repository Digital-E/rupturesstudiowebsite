import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: ${props => props.width ? `${props.width}px` : `100%`};
  height: ${props => props.width ? `100%` : `auto`};
  padding-bottom: ${props => (isNaN(props.width) || props.width === 0)  ? `${props.aspectRatio}%` : `auto`};
  background-color: #b2b2b2;
  
  .show-image {
    opacity: 1;
    transition-duration: 0.2s;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 500ms ease 0s;
`;

const Image = ({ src, windowHeight }) => {
  let [hasLoaded, setHasLoaded] = useState(false);
  let imageRef = useRef();
  let aspectRatio = 0;
  let xs,
    s,
    m,
    l,
    xl,
    height,
    width = null;

  if (src !== undefined) {
    ({ height, width } = src.dimensions);
    xs = src.url;
    s = src.s.url;
    m = src.m.url;
    l = src.l.url;
    xl = src.xl.url;
    // width = src.width;
    // height = src.height;
    // xs = src.img;
    // s = src.img;
    // m = src.img;
    // l = src.img;
    // xl = src.img;
    // xxl = src.img;

    aspectRatio = (height / width) * 100;
    
    // if(height < width) {
    //   aspectRatio = (width / height) * 100;
    // } else {
    //   aspectRatio = (height / width) * 100;
    // }
  }


  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete) {
      triggerHasLoaded();
    }
  }, []);

  const triggerHasLoaded = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
    }
  };

  return (
    <Container aspectRatio={aspectRatio} width={windowHeight  * (1 / aspectRatio * 100)}>
      {src === undefined ? (
        <picture>
          <source sizes="100vw" />
          <StyledImage
            sizes="100vw"
            alt=""
            draggable="false"
            ref={imageRef}
            className={hasLoaded && "show-image"}
            onLoad={() => triggerHasLoaded()}
          />
        </picture>
      ) : (
        <picture>
          <source
            sizes="100vw"
            srcSet={`${xs} 400w, ${s} 800w, ${m} 1200w, ${l} 1600w, ${xl} 2400w`}
          />
          <StyledImage
            sizes="100vw"
            srcSet={`${xs} 400w, ${s} 800w, ${m} 1200w, ${l} 1600w, ${xl} 2400w`}
            alt=""
            draggable="false"
            ref={imageRef}
            className={hasLoaded && (height/width >= 1 ? "show-image portrait" : "show-image")}
            onLoad={() => triggerHasLoaded()}
            // data-scroll 
            // data-scroll-speed="-1"
          />
        </picture>
      )}
    </Container>
  );
};

export default Image;
