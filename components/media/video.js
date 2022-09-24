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

    video {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .plyr {
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
                loop
                // data-poster="/path/to/poster.jpg"
                >
                    <source src={videoId} type="video/mp4" />
                </video>
            </Container>
    :
    null
}