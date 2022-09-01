import styled from "styled-components";

const Container = styled.div`
    position: relative;
    overflow: hidden;
    height: 100%;
    width: ${props => props.width}px;
    // padding-bottom: ${props => props.aspectRatio}%;
    background-color: #b2b2b2;

    .show-image {
    opacity: 1;
    transition-duration: 0.2s;
    }

    video {
        position: absolute;
        height: 100%;
        width: 100%;
    }
`;

export default function Component({ src, height, width, windowHeight, id }) {
    let aspectRatio = 0;

    let videoId = src;

    // let regExp = /[a-zA-Z]/g;

    // let isYoutube = regExp.test(data);

    if (src !== undefined) {
        aspectRatio = (height / width) * 100;
    }

    return videoId !== null ?
            <Container aspectRatio={aspectRatio} width={windowHeight  * (1 / aspectRatio * 100)}>
                <video id="player" 
                playsinline
                autoPlay 
                muted
                // data-poster="/path/to/poster.jpg"
                >
                    <source src={videoId} type="video/mp4" />
                </video>
            </Container>
    :
    null
}