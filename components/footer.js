import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.footer`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  a {
    // transition: color 0.03s;
  }
`;







export default function Footer({ data }) {
  let footerRef = useRef();
  let index = 0;
  let colors = ["black", "white"]
  let interval = null;

  useEffect(() => {


  }, [])

  let changeColors = (end) => {
    if(end) {
      clearInterval(interval)
      interval = null;
      index = 0;
      footerRef.current.children[0].style.color = colors[index]
      return;
    }

    interval = setInterval(() => {
      footerRef.current.children[0].style.color = colors[index]

      if(index !== 3) {
        index += 1;
      } else {
        index = 0;
      }
    }, 20)
  }

  return (
    <Container>
      <div className="p" 
        ref={footerRef} 
        onMouseEnter={() => {changeColors()}}
        onMouseLeave={() => {changeColors(true)}}
        >
          <a href="mailto:contact@ruptures.studio">©2022 RUPTURES STUDIO</a>
      </div>
    </Container>
  );
}
