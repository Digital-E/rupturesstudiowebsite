import '../styles/globals.css'

import "../styles/flickity.css";

import Header from "../components/header";

import { motion, AnimatePresence } from "framer-motion"
import { StateProvider } from "../store"

function MyApp({ Component, pageProps, router }) {

  return (
    <StateProvider>
      <Header 
      data={pageProps.menuData !== undefined ? pageProps.menuData[0].node : null} 
      />
      <AnimatePresence 
      // exitBeforeEnter 
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
