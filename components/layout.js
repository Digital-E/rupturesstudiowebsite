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
      smooth: false,
      lerp: 0.04,
      multiplier: 0.8
    });

    console.log(window.sessionStorage.getItem('ruptures-history'))
    if(window.sessionStorage.getItem('ruptures-history') === null) {
      window.sessionStorage.setItem('ruptures-history', `${window.location.pathname}`)
    } else {
      let sessionStorage = window.sessionStorage.getItem('ruptures-history')

      console.log(window.sessionStorage.getItem('ruptures-history'))
      
      let sessionStorageSplit = sessionStorage.split(",")
      sessionStorageSplit.push(`${window.location.pathname}`)

      window.sessionStorage.setItem('ruptures-history', `${sessionStorageSplit.join(",")}`)

    }
    
    // scroll.on('scroll', (args) => {
    //   // Get all current elements : args.currentElements
    //   if(typeof args.currentElements['project-hero'] === 'object') {
    //       let progress = args.currentElements['project-hero'].progress;
    //       args.currentElements['project-hero'].el.style.filter = `blur(${1 + progress}px)`
    //   }
    // });

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
      <Alert preview={preview} />
      <Container data-scroll-container id="container">
        <main>
          {children}
          {/* <Footer data={footerData[0].node} /> */}
          <Footer />
        </main>
      </Container>
    </>
  );
}
