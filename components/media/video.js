import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: fit-content;
  // background-color: #fafafa;

  .show-video {
    opacity: 1;
    transition-duration: 0.2s;
  }
`;

const StyledVideo = styled.video`
  height: 100%;
  width: auto;
  opacity: 0;
  transition: opacity 500ms ease 0s;
`;

const Video = ({ src, height, width }) => {
  let [hasLoaded, setHasLoaded] = useState(false);
  let videoRef = useRef();


  const triggerHasLoaded = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
    }
  };


  return (
    <Container>
      {src === undefined ? (
          <div></div>
      ) : (
        <StyledVideo
          autoPlay 
          muted
          loop
          playsInline
          alt=""
          draggable="false"
          ref={videoRef}
          className={hasLoaded && (height/width >= 1 ? "show-video portrait" : "show-video")}
          onPlay={() => triggerHasLoaded()}
          width={width}
          height={height}
        >
        <source src={src ? src.url : null} type="video/mp4"/>
        Your browser does not support the video tag.
        </StyledVideo>
      )}
    </Container>
  );
};

export default Video;
