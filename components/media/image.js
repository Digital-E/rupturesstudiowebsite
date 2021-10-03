import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: fit-content;
  // background-color: #fafafa;
  
  .show-image {
    opacity: 1;
    transition-duration: 0.2s;
  }

  picture {
    display: block;
    height: 100%;
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: auto;
  opacity: 0;
  transition: opacity 500ms ease 0s;
`;

const Image = ({ src }) => {
  let [hasLoaded, setHasLoaded] = useState(false);
  let imageRef = useRef();
  let aspectRatio = 0;
  let xs,
    s,
    m,
    l,
    xl,
    xxl,
    height,
    width = null;


  if (src !== undefined) {
    ({ height, width } = src.dimensions);
    xs = src.url;
    s = src["400"].url;
    m = src["800"].url;
    l = src["1200"].url;
    xl = src["1600"].url;
    xxl = src["2400"].url;
    
    if(height > width) {
      aspectRatio = (height / width) * 100;
    } else {
      aspectRatio = (width / height) * 100;
    }
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
    <Container aspectRatio={aspectRatio}>
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
            height={height}
            width={width}
          />
        </picture>
      ) : (
        <picture>
          <source
            sizes="100vw"
            srcSet={`${xs} 200w, ${s} 400w, ${m} 800w, ${l} 1200w, ${xl} 1600w, ${xxl} 2400w`}
          />
          <StyledImage
            sizes="100vw"
            srcSet={`${xs} 200w, ${s} 400w, ${m} 800w, ${l} 1200w, ${xl} 1600w, ${xxl} 2400w`}
            alt=""
            draggable="false"
            ref={imageRef}
            className={hasLoaded && (height/width >= 1 ? "show-image portrait" : "show-image")}
            onLoad={() => triggerHasLoaded()}
            data-scroll 
            data-scroll-speed="-1"
            height={height}
            width={width}
          />
        </picture>
      )}
    </Container>
  );
};

export default Image;
