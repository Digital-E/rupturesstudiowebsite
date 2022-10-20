import { useEffect, useState } from 'react';
import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";

let LocomotiveScroll = null;

if(typeof window !== 'undefined') {
  LocomotiveScroll = require('locomotive-scroll').default;
}


import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

let scroll = null;

export default function Layout({ preview, children, name, content, footerData }) {

  useEffect(() => {
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      lerp: 0.04,
      multiplier: 0.8
    });

    window.scroll = scroll

    setTimeout(() => {
      scroll.update()
    }, 0)

    return () => {
      scroll.destroy();
    }
  }, []);

  return (
    <>
      <Meta name={name} content={content}/>
      <Container data-scroll-container>
        <Alert preview={preview} />
        <main>
          {children}
          {/* <Footer data={footerData[0].node} /> */}
          <Footer />
        </main>
      </Container>
    </>
  );
}
