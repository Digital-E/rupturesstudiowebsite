import { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.footer`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 15px 10px;

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
          <a href="mailto:contact@ruptures.studio">{`© RUPTURES STUDIO, ${new Date().getFullYear()}`}</a>
          {/* <svg width="100" height="100" viewBox="0 0 35 35" fill="none">
            <path d="M18.4542 18.4183L21.0743 20.3172L18.5057 18.2108L24.2617 20.8257L18.743 18.024L21.8273 18.9164L19.2897 17.9618L35 17.4948L19.2897 17.0382L21.8273 16.0836L18.743 16.976L24.2617 14.1743L18.5057 16.7892L21.0743 14.6828L18.4542 16.5817L26.1701 7.689L18.0519 16.5609L19.8777 13.2923L17.8146 16.426L20.0015 9.74355L18.0312 15.2016L18.4129 12.6282L17.763 15.2224L17.5052 0.155648V0L17.4948 0.0726356V0V0.155648L17.237 15.2224L16.5871 12.6282L16.9688 15.2016L14.9985 9.74355L17.1854 16.426L15.1223 13.2923L16.9481 16.5609L8.82994 7.689L16.5458 16.5817L13.9154 14.6828L16.4943 16.7892L10.728 14.1743L16.257 16.976L13.1727 16.0836L15.7103 17.0382L0 17.4948L15.7103 17.9618L13.1727 18.9164L16.257 18.024L10.728 20.8257L16.4943 18.2108L13.9154 20.3172L16.5458 18.4183L8.82994 27.311L16.9481 18.4391L15.1223 21.7077L17.1854 18.574L14.9985 25.2564L16.9688 19.788L16.5871 22.3718L17.237 19.788L17.4948 34.8444V35V34.9274L17.5052 35V34.8444L17.763 19.788L18.4129 22.3718L18.0312 19.788L20.0015 25.2564L17.8146 18.574L19.8777 21.7077L18.0519 18.4391L26.1701 27.311L18.4542 18.4183Z" fill="black"/>
            </svg> */}
      </div>
    </Container>
  );
}
