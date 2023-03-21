import '../styles/globals.css'

import "../styles/flickity.css";

import "../styles/locomotive-scroll.css";

import "plyr/dist/plyr.css";

import Header from "../components/header";

import { motion, AnimatePresence } from "framer-motion"
import { StateProvider } from "../store"

import CookieConsent from "react-cookie-consent"
import RichText from '../components/rich-text';
import { useEffect, useState } from 'react';

import { credits } from "../lib/credits"

import Bowser from 'bowser';

function MyApp({ Component, pageProps, router }) {
  let [isMobile, setIsMobile] = useState(false)

  useEffect(() => {

    if(window.innerWidth < 990) {
      setIsMobile(true)
    }

    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)

    const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();

    if(browser === "Safari") {
      document.querySelector("body").classList.add("safari");
    }

    // Credits

    console.clear();

    console.log(`
${credits}
samuelbassett.xyz
Design + Development
https://samuelbassett.xyz
    `)

  },[])
  
  let desktopVariants = {
    pageInitial: {
      opacity: 0
    },
    pageAnimate: {
      opacity: 1,
      transition: {
        duration: 1
      }
    },
    pageExit: {
      opacity: 0,
      filter: "blur(20px)",
      transition: {
        opacity: {
          duration: 0.5
        },
        filter: {
          duration: 0.5,
        }
      }
    }
  }

  let mobileVariants = {
    pageInitial: {
      opacity: 1
    },
    pageAnimate: {
      opacity: 1,
    },
    pageExit: {
      opacity: 1,
    }
  }

  return (
    <StateProvider>
      <Header 
      data={ pageProps.menuData !== undefined ? pageProps.menuData[0].node : null } 
      />
      {/* {
        pageProps.menuData !== undefined ?
          <CookieConsent
            buttonText={pageProps.menuData[0].node.accept_text}
            declineButtonText={pageProps.menuData[0].node.refuse_text}
            enableDeclineButton
            cookieName={"ArtAuCentreCookieConsent"}
            onAccept={() => {
              gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }}
            onDecline={() => {}}
          >
            <RichText render={pageProps.menuData[0].node.cookie_text} />
          </CookieConsent>
        :
        null
      } */}
      {
        !isMobile ?
        <AnimatePresence 
        exitBeforeEnter 
        // exitBeforeEnter={router.route === "/[lang]/artistes" ? false : true}
        onExitComplete={() => { window.scrollTo(0,0) }}
        > 
        <motion.div
        key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit"
          variants={isMobile ? mobileVariants : desktopVariants} >   
          <Component {...pageProps} />
        </motion.div>
        </AnimatePresence> 
        :
        <Component {...pageProps} />
      }
    </StateProvider>
  )
}


export default MyApp
