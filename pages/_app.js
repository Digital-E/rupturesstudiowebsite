import '../styles/globals.css'

import "../styles/flickity.css";

import Header from "../components/header";

import { motion, AnimatePresence } from "framer-motion"
import { StateProvider } from "../store"

import CookieConsent from "react-cookie-consent"
import RichText from '../components/rich-text';
import { useEffect } from 'react';

function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)
  },[])

  return (
    <StateProvider>
      <Header 
      data={ pageProps.menuData !== undefined ? pageProps.menuData[0].node : null } 
      />
      {
        pageProps.menuData !== undefined ?
          <CookieConsent
            buttonText={pageProps.menuData[0].node.accept_text}
            declineButtonText={pageProps.menuData[0].node.refuse_text}
            enableDeclineButton
            cookieName={"ArtAuCentreCookieConsent"}
            onAccept={() => {}}
            onDecline={() => {}}
          >
            <RichText render={pageProps.menuData[0].node.cookie_text} />
          </CookieConsent>
        :
        null
      }
      <AnimatePresence 
      // exitBeforeEnter 
      // exitBeforeEnter={router.route === "/[lang]/artistes" ? false : true}
      onExitComplete={() => { window.scrollTo(0,0) }}
      > 
      <motion.div 
      key={router.route} initial="pageInitial" animate="pageAnimate" exit= "pageExit"
        // variants={{
        //   pageInitial: {
        //     opacity: 0
        //   },
        //   pageAnimate: {
        //     opacity: 1,
        //     duration: 0.3,
        //   },
        //   pageExit: {
        //     opacity: 0,
        //     transition: {
        //       delay: 1,
        //       duration: 0.3,
        //     }
        //   }
        variants={{
          pageInitial: {
            opacity: 0,
            transition: {
              duration: 0
            }
          },
          pageAnimate: {
            opacity: 1,
            transition: {
              duration: 0
            }
          },
          pageExit: {
            opacity: 1,
            // y: "-100%",
            transition: {
              // delay: 1,
              duration: router.route === "/[lang]/artistes" ? 1 : 0,
              //duration: 1,
            }
          }
        }}
        >          
        <Component {...pageProps} />
      </motion.div>
      </AnimatePresence> 
    </StateProvider>
  )
}


export default MyApp
