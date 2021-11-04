import { useState, useEffect, useRef } from "react"
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

import { getHome, getHomePagesSlugs, getAllArtistPages, getMenu, getFooter } from "../../lib/api";

import Map from "../../components/home-map"

import { SITE_NAME } from "../../lib/constants"
import RichText from '../../components/rich-text';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: scroll;


  #shadow-circle-home-map {
    position: absolute;
    height: 40px;
    width: 40px;
    box-shadow: inset 0 1px 3px black;
    z-index: 999;
    border-radius: 999px !important;
    pointer-events: none;
    display: none;
    background-color: white;
  }

  #text-circle-home-map {
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    border-radius: 999px !important;
    pointer-events: none;
    opacity: 0;
    z-index: 999;
    transform: translate(-40%, -40%);
    padding: 20px;
  }
`

const Trigger = styled.div`
  position: relative;
  z-index: 998;
  height: 500vh;
  width: 100vw;
`

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity: 1;

  @media(max-width: 989px) {
    background: url("/mobile-background-min.jpeg");
  }

  
  // img {
  //   position: absolute;
  //   height: 100%;
  //   width: 100%;
  //   object-fit: cover;
  //   z-index: -1;
  //   filter: grayscale(100%);
  //   opacity: 1;
  // }

`


const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
  background-color: rgba(255, 174, 80, 0.8);
`


const Title = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  z-index: 1;

  > span {
    position: absolute;
    z-index: 1;
    font-size: 30vh;
  }

  pointer-events: none;

  > .art {
    top: 8%;
    left: 3%;
  }

  > .au {
    top: 8%;
    right: 3%;
  }

  > .centre {
    top: 35%;
    left: 3%;
  }

  > .geneve {
    right: 3%;
    bottom: 3%;
  }

  @media(max-width: 600px) {
    > span {
      font-size: 25vw;
    }

    > .art {
      top: 8%;
      left: 3%;
    }
  
    > .au {
      top: 30%;
      right: 15%;
    }
  
    > .centre {
      top: 55%;
      left: 3%;
    }
  
    > .geneve {
      left: 3%;
      right: auto;
      bottom: 3%;
    }
  }
`
const IntroText = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 40px 20px;
  background: white;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  // transform: translateY(-100%);
  pointer-events: none;

  * {
    margin: 0;
    line-height: 1;
    font-size: 40px;
  }

  a {
    pointer-events: all;
  }

  @media(max-width: 989px) {
    // height: 100%;
    // margin-top: 53px
  }
`

let tl = null;

export default function Index({ preview, data, allArtistPagesData, footerData }) {
  let [currentIndex, setCurrentIndex] = useState(null);
  let [hasClicked, setHasClicked] = useState(false);
  let [isMobile, setIsMobile] = useState(true);

  let containerRef = useRef();


  useEffect(() => {
    // let backgroundImages = document.querySelector("#background-image").children;

    // Array.from(backgroundImages).forEach(item => {
    //   item.style.opacity = 0;
    // });

    // if(currentIndex === null) return;
    // backgroundImages[currentIndex - 1].style.opacity = 1;

  }, [currentIndex])

  let init = (reset) => {
    if(reset === true) {
      if(tl!== null) {
          tl.kill(true);
      }
    }

      let introHasTriggered = sessionStorage.getItem('ArtAuCentreGeneveIntroAnim', 'true');
  
      document.querySelector("body").style.overflow = "hidden"
  
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#trigger",
          scroller: containerRef.current,
          // pin: true,   // pin the trigger element while active
          start: "top top", // when the top of the trigger hits the top of the viewport
          // end: "+=500", // end after scrolling 500px beyond the start
          scrub: 2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          // snap: {
          //   snapTo: "labels", // snap to the closest label in the timeline
          //   duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          //   delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          //   ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
          // }
        }
      })
  
      tl.to("#index-title", 
        {
          x: window.innerWidth, 
          duration: 2, 
          stagger: 0.1, 
          ease: "sine.inOut"
        },
        "start"
        )
  
      tl.fromTo("#intro-text",
        {
          y: "-100%",
        },
        {
          y: window.innerHeight - document.querySelector("#intro-text").getBoundingClientRect().height,
          duration: 2,
          ease: "sine.inOut"
        },
        "start"
      )
      .then(() => {
        tl.kill()
  
        if(introHasTriggered === "true") {
          containerRef.current.classList.add("has-triggered");
          document.querySelector("#scroll-trigger").style.pointerEvents = "none";
          return
        }
        
        // Move Markers
  
        let allMarkers = document.querySelector(".gm-style").children[1].children[0].children[3].children
  
        gsap.to(allMarkers, {y: -1000, duration: 0})
  
        gsap.to(allMarkers, {y:0, duration: 1, opacity: 1})
  
        Array.from(allMarkers).forEach(item => item.classList.add("show"))
  
        document.querySelector("#scroll-trigger").style.pointerEvents = "none";
  
        sessionStorage.setItem('ArtAuCentreGeneveIntroAnim', 'true');
      })
  
      tl.pause()
  
  
      containerRef.current.addEventListener("click", () => {
        tl.play()
      })
  
      setTimeout(() => {
        tl.play()
      }, 5000)
  
      if(introHasTriggered === "true") {
        tl.progress(1)
      }
  


  }

  let initWrapper = () => {
    init(true)
  }


  useEffect(() => {

    init();

    setTimeout(() => {
      init(true);
    },100)

    window.addEventListener("resize", initWrapper)

    return () => {
      document.querySelector("body").style.overflow = "visible"
      window.removeEventListener("resize", initWrapper)
    }
  },[])

  useEffect(() => {
    if(window.innerWidth > 989) {
      setIsMobile(false);
    }
  },[])

  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>
      <Container ref={containerRef} className="has-not-triggered">
        <Trigger id="scroll-trigger" />
        <Title>
          <span id="index-title" className="geneve">Genève</span>
          <span id="index-title" className="au">au</span>
          <span id="index-title" className="centre">Centre</span>
          <span id="index-title" className="art">Art</span>
          
        </Title>
        <IntroText id="intro-text" className="large-font-size">
          <RichText render={data[0].node.intro_text} />
        </IntroText>
        <BackgroundContainer id="map-container">
            {!isMobile ?
              <Map 
              setCurrentIndex={(index) => setCurrentIndex(index)}
              currentIndex={currentIndex}
              data={allArtistPagesData}
              hasClicked={hasClicked}
              key="home"
              containerRef={containerRef}
              // hasClicked={(value) => setHasClicked(value)}
              />
              :
              null
            }
        </BackgroundContainer>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getHomePagesSlugs();

  let paths = lang.map((item) => ({
    params: {
      lang: item.node._meta.lang
    }
  }))


  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params, preview = false, previewData }) {

  // Cannot Make Large Get Requests So Split Query

  const data = await getHome(params.lang, previewData);

  const allArtistPagesData = await getAllArtistPages(params.lang, previewData);


  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, allArtistPagesData, menuData, footerData },
  };
}