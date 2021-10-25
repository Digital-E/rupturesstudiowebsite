import styled from "styled-components";

const Title = styled.div`
 position: absolute;
 width: 100vw;
 font-size: 15vw;
 text-transform: lowercase;
 line-height: 0.9;
 border-bottom: 1px solid black;
//  padding: 0 20px;
 padding: 0 1.38vw;
 background: white;
 z-index: 1;
 margin-top: 4vw;
 pointer-events: none;

 @media(max-width: 989px) {
    display: none;
  }
`

const Component = ({ children }) => {
    return (
        <Title className="page-title">{children}</Title>
    )
}

export default Component

