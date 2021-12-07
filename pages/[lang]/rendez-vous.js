import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import RichText from '../../components/rich-text';

import moment from "moment";

import 'moment/locale/fr' 

import Link from "../../components/link"

import Title from "../../components/title"

import { getRendezVousPageSlugs, getRendezVousPage, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { useRouter } from "next/router";

import Prismic from '@prismicio/client';

const apiEndpoint = 'https://artaucentregeneve.cdn.prismic.io/api/v2'
const client = Prismic.client(apiEndpoint)

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Container = styled.div`
  background-color: white; 
  
  .newTab {
    display: none;
  }

  .page-title {
    position: relative;
    padding-top: 0.2vw;
    padding-bottom: 0.2vw;
  }

  @media(max-width: 989px) {
    margin-top: 53px;
  }

  img {
    width: 25%;
  }

  @media(max-width: 989px) {
    img {
      width: 25%;
    }
  }
`

const InnerContainer = styled.div`
  display: flex;

  @media(max-width: 989px) {
    flex-direction: column;
  }
`

const ColLeft = styled.div`
  flex-basis: 50%;
`

const ColRight = styled.div`
  flex-basis: 50%;
  border-left: 1px solid black;

  @media(max-width: 989px) {
    border-left: none;
    border-top: 1px solid black;
  }
`


const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 20px;
  font-size: 30px;
  z-index: 999;

  @media(max-width: 989px) {
    padding: 5px 10px;
    font-size: 20px;
  }
`

const Text = styled.div`
  padding: 20px;
  border-bottom: 1px solid black;

  @media(max-width: 989px) {
    padding: 20px 10px;

    p {
      margin: 0;
    }
  }
`


const ListLeft = styled.div`
    > div:last-child > .divider-horizontal {
        display: none;
    }

    .old-event {
      opacity: 0.2;
      pointer-events: none;
      // filter: blur(1px);
    }
`


const ListLeftItemTitle = styled.div`
  font-weight: normal;
`


const ListLeftItem = styled.div`
  padding: 0 20px;
  margin: 20px 0;

  @media(max-width: 989px) {
    padding: 0px 10px;
  }
`

const ListLeftItemLinkWrapper = styled.div`
  margin: 20px 0;
`

const ListLeftItemText = styled.div`

`
const ListLeftItemInformation = styled.div`
  display: flex;
  margin-top: 25px;

  > div {
      display: flex;
      align-items: center;
      margin-right: 25px;
  }


  > div > div:nth-child(2),
  > div > a:nth-child(2),
  > div > span:nth-child(2)
   {
      margin-left: 10px;
  }

  & .small-font-size a {
    font-size: inherit !important;
  }

  @media(max-width: 989px) {
    flex-direction: column;

    > div:nth-child(1)
     {
        margin-bottom: 10px;
    }

    svg {
      height: 25px;
    }
  }
`

const ListRight = styled.div`
  
`


const ListRightItemTitle = styled.div`
  font-weight: normal;

  a {
    color: black;
  }
`


const ListRightItem = styled.div`
  display: flex;
  padding: 0 20px;
  margin: 20px 0;

  > div:nth-child(2) {
      margin-left: 25px;
  }


@media(max-width: 989px) {
  padding: 0px 10px;

  svg {
    height: 30px;
  }
}
`

const ListRightItemLinkWrapper = styled.div``


const DividerHorizontal = styled.div`
  height: 1px;
  background-color: black;
  width: 100%;
`


let scrollTriggerInstanceOne = null;
let scrollTriggerInstanceTwo = null;

export default function Index({ preview, data, footerData }) {

  let router = useRouter();

  let [allDates, setAllDates] = useState([]);

  useEffect(() => {
    if(window.innerWidth < 990) {
      if(window.location.hash === "#podcasts") {
        gsap.to(window, {scrollTo: {y: "#podcasts", offsetY: 53}, duration: 1})
      } else {
        gsap.to(window, {scrollTo: {y: "#visites-guidees", offsetY: 53}, duration: 1})
      }
    }

  });

  let init = (reset) => {

    if(reset === true) {
      if(
        scrollTriggerInstanceOne !== null || scrollTriggerInstanceTwo !== null
        ) {
          if(ScrollTrigger.getById("scroll-trigger-one") !== undefined && ScrollTrigger.getById("scroll-trigger-two") !== undefined) {
            ScrollTrigger.getById("scroll-trigger-one").kill(true);
            ScrollTrigger.getById("scroll-trigger-two").kill(true);
          }
      }
    }

    if(window.innerWidth > 989) {

      scrollTriggerInstanceOne = ScrollTrigger.create({
          trigger: "#divider-one",
          id: "scroll-trigger-one",
          start: `top top+=${0.048 * window.innerWidth}px`,
          end: `top+=${document.querySelector(".inner-container").offsetHeight}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true
        });

      scrollTriggerInstanceTwo = ScrollTrigger.create({
          trigger: "#divider-two",
          id: "scroll-trigger-two",
          start: `top top+=${0.048 * window.innerWidth}px`,
          end: `top+=${document.querySelector(".inner-container").offsetHeight}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true
      });   
    }    
  }

    let initWrapper = () => {
      init(true)

      document.querySelectorAll(".rendez-vous-intro-text").forEach(item => {
        item.style.height = "auto"
      })

      if(window.innerWidth < 989) return

      introTextHeight();
    } 

    let introTextHeight = () => {

      // document.querySelectorAll(".rendez-vous-intro-text").forEach(item => {
      //   item.style.height = "auto"
      // })

      let maxHeight = 0

      document.querySelectorAll(".rendez-vous-intro-text").forEach(item => {
        if(item.getBoundingClientRect().height > maxHeight) {
          maxHeight = item.getBoundingClientRect().height
        }
      })

      document.querySelectorAll(".rendez-vous-intro-text").forEach(item => {
        item.style.height = `${maxHeight}px`
      })
    }

    useEffect(() => {
      setTimeout(() => {
        init(true) 
      }, 1000)

      window.addEventListener("resize", initWrapper)

      setTimeout(() => {
        introTextHeight();
      }, 100)

      return () => {
          window.removeEventListener("resize", initWrapper)
      }
    },[])

    // let eventsList = data[0].node.list_one.sort(function(a,b){
    //     return new Date(b.list_one_item_date) - new Date(a.list_one_item_date);
    // });

    const getDataOnLoad = async () => {
      const response = await client.query(
        Prismic.Predicates.at('document.type', 'rendez-vous_page'),
        { lang :  router.query.lang }
      )
      if (response) {
        let res = response.results[0].data.list_one;
        let now = new Date();
        now = now.getTime();

        let orderedDates = res.sort(function(a,b) {
          var aToDate = (new Date(a.list_one_item_date)).getTime();
          var bToDate = (new Date(b.list_one_item_date)).getTime();
          return Math.abs(aToDate - now) - Math.abs(bToDate - now);
        })

        let allDates = orderedDates.filter(item => {
          if(new Date(item.list_one_item_date) > new Date()) {
            return item
          }
        })

        let previousDates = orderedDates.filter(item => {
          if(new Date(item.list_one_item_date) < new Date()) {
            return item
          }
        })

        setAllDates([...allDates, ...previousDates])
      }
    }

    
    useEffect(() => {
      getDataOnLoad();
    }, [])


      let getDate = (date) => {
        if(router.query.lang === "fr-fr") {
          return moment(date).locale('fr').format('dddd Do MMMM HH:mm')
        }

        return moment(date).locale('en').format('dddd Do MMMM HH:mm')
      }

    const newTabFunction = (index) => {
      if(document.querySelector(`#newTab-${index}`).children[0].children[0].children[0].src === "") return

      let name = document.querySelector(`#newTab-${index}`).getAttribute("data-name");

      var w = window.open();
      var html = document.querySelector(`#newTab-${index}`).innerHTML;

      w.document.body.innerHTML = html;
      w.document.title = `Podcast | ${name}`;
    }      

  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>

      <Container>
          <Title>{data[0].node.title}</Title>
          <InnerContainer className="inner-container">
            <ColLeft id="visites-guidees">
              <Divider id="divider-one" className="orange-background"><span>{data[0].node.list_one_title}</span></Divider>
              <Text className="medium-font-size rendez-vous-intro-text">
                <RichText render={data[0].node.list_one_text} />
              </Text>
              <ListLeft>
                  {allDates.map((item,index) => 
                      <div key={index} className={new Date(item.list_one_item_date) < new Date() ? "old-event" : ""}>
                        <ListLeftItem>
                            <ListLeftItemTitle className="medium-font-size">{getDate(item.list_one_item_date)}</ListLeftItemTitle>
                            <ListLeftItemTitle className="medium-font-size">{item.list_one_item_title}</ListLeftItemTitle>
                            <ListLeftItemLinkWrapper>
                                <Link data={item.list_one_item_link_url}>{item.list_one_item_link_text}</Link>
                            </ListLeftItemLinkWrapper>
                            <ListLeftItemText>
                                <RichText render={item.list_one_item_text} />                                
                            </ListLeftItemText>
                            <ListLeftItemInformation>
                                <div className="small-font-size">
                                    <div>
                                        <svg version="1.1" height="35px" x="0px" y="0px"
                                            viewBox="0 0 15.7 17.23">
                                        <g>
                                            <path className="st0" d="M5.68,13.52v0.99l1.8-1.83v3.38h0.75v-3.38l1.8,1.83v-0.99l-2.18-2.28L5.68,13.52z M7.86,10.52
                                                c-1.07,0-1.92-0.86-1.92-1.9s0.85-1.91,1.92-1.91c1.05,0,1.9,0.86,1.9,1.91S8.91,10.52,7.86,10.52 M12.75,10.79h0.99l-1.83-1.8
                                                h3.38V8.24h-3.38l1.83-1.8h-0.99l-2.28,2.17L12.75,10.79z M2.95,6.44H1.96l1.83,1.8H0.42v0.75h3.38l-1.83,1.8h0.99l2.28-2.17
                                                L2.95,6.44z M10.03,3.71V2.72l-1.8,1.83V1.17H7.48v3.38l-1.8-1.83v0.99l2.17,2.28L10.03,3.71z"/>
                                        </g>
                                        </svg>                                        
                                    </div>
                                    <Link data={item.list_one_item_information_one_link}>{item.list_one_item_information_one}</Link>
                                </div>
                                <div>
                                    <div>
                                        <svg 
                                            height="30px" x="0px" y="0px" viewBox="0 0 15.7 17.2"
                                            >
                                        <path d="M7.8,9.3C7.5,9.3,7.2,9,7.2,8.6S7.5,8,7.8,8c0.4,0,0.7,0.3,0.7,0.6C8.5,9,8.2,9.3,7.8,9.3"/>
                                        <line fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" x1="7.8" y1="8.7" x2="10.7" y2="8.7"/>
                                        <line fill="none" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" x1="7.8" y1="8.8" x2="7.8" y2="13.4"/>
                                        <circle fill="none" stroke="#000000" strokeMiterlimit="10" cx="7.8" cy="8.6" r="7.2"/>
                                        </svg>                                        
                                    </div>
                                    <div className="small-font-size">{item.list_one_item_information_two}</div>
                                </div>
                            </ListLeftItemInformation>
                        </ListLeftItem>
                        <DividerHorizontal className="divider-horizontal"/>
                      </div>
                  )}
              </ListLeft>
            </ColLeft>
            <ColRight id="podcasts">
              <Divider id="divider-two" className="orange-background">
                {data[0].node.list_two_title}
              </Divider>
              <Text className="medium-font-size rendez-vous-intro-text">
                <RichText render={data[0].node.list_two_text} />                       
              </Text>
              <ListRight>
                  {data[0].node.list_two.map((item,index) => 
                      <div key={index}>
                        <ListRightItem>
                            <div>
                                {/* <Link data={item.list_two_item_link_url}>
                                    <svg version="1.1" id="podcast" xmlns="http://www.w3.org/2000/svg" width="30px" x="0px" y="0px"
                                    viewBox="0 0 15.7 17.23">
                                    <g>
                                    <defs>
                                    <rect id="SVGID_1_" x="0.31" y="0.27" width="14.95" height="16.59"/>
                                    </defs>
                                    <clipPath id="SVGID_2_">
                                    <use />
                                    </clipPath>
                                    <path className="st0" d="M7.66,0.27c1.74,0,3.27,0.49,4.62,1.51c1.36,1.03,2.28,2.38,2.72,4.03c0.49,1.88,0.28,3.7-0.64,5.42
                                    c-0.72,1.34-1.77,2.36-3.12,3.07c-0.29,0.15-0.62,0.06-0.78-0.2c-0.17-0.28-0.07-0.64,0.23-0.8c0.42-0.22,0.82-0.48,1.18-0.79
                                    c1.17-1.01,1.91-2.27,2.15-3.8c0.27-1.69-0.09-3.26-1.1-4.66c-1.07-1.48-2.54-2.34-4.35-2.58C5.38,1.06,2.37,3.11,1.65,6.22
                                    c-0.53,2.31,0.07,4.32,1.75,6.01c0.42,0.43,0.92,0.76,1.45,1.04c0.38,0.2,0.44,0.66,0.14,0.95c-0.18,0.16-0.43,0.19-0.67,0.07
                                    c-0.48-0.25-0.92-0.55-1.33-0.89c-1.12-0.95-1.93-2.12-2.34-3.52c-0.65-2.21-0.36-4.3,0.9-6.23c1.16-1.77,2.82-2.85,4.91-3.25
                                    c0.21-0.04,0.41-0.07,0.62-0.08C7.29,0.29,7.5,0.28,7.66,0.27"/>
                                    <path className="st0" d="M8.09,2.56c1.75,0.09,3.33,1,4.29,2.84c0.99,1.89,0.66,4.17-0.77,5.76c-0.08,0.09-0.17,0.18-0.26,0.26
                                    c-0.23,0.21-0.58,0.2-0.8-0.02c-0.22-0.22-0.22-0.58,0-0.8c0.25-0.25,0.47-0.52,0.66-0.82c0.88-1.43,0.74-3.34-0.35-4.63
                                    C9.62,3.67,7.53,3.27,5.84,4.2C4.36,5,3.54,6.69,3.81,8.34c0.14,0.87,0.54,1.61,1.17,2.23c0.17,0.16,0.22,0.36,0.16,0.58
                                    c-0.06,0.21-0.21,0.35-0.43,0.39c-0.2,0.05-0.38-0.01-0.53-0.16c-0.73-0.72-1.22-1.57-1.44-2.57c-0.5-2.27,0.55-4.55,2.6-5.65
                                    C6.08,2.77,6.93,2.56,8.09,2.56"/>
                                    <path className="st0" d="M7.78,10.57c0.94,0,1.71,0.75,1.71,1.69c0,0.3-0.07,0.59-0.12,0.89C9.24,14,9.08,14.86,8.94,15.72
                                    c-0.05,0.31-0.13,0.6-0.37,0.82c-0.33,0.3-0.72,0.4-1.14,0.26C7,16.66,6.74,16.36,6.66,15.92c-0.2-1.09-0.37-2.18-0.57-3.27
                                    c-0.16-0.89,0.29-1.52,0.78-1.83C7.14,10.66,7.46,10.56,7.78,10.57"/>
                                    <path className="st0" d="M7.78,9.42c-0.95,0-1.73-0.77-1.73-1.72c0-0.94,0.77-1.71,1.72-1.71c0.96,0,1.73,0.76,1.73,1.71
                                    C9.5,8.65,8.73,9.42,7.78,9.42"/>
                                    </g>
                                    </svg>   
                                </Link> */}
                                <a href="javascript:;" id="podcast-link-open" className="default-font-size" onClick={() => newTabFunction(index)}>
                                    <svg version="1.1" id="podcast" xmlns="http://www.w3.org/2000/svg" width="30px" x="0px" y="0px"
                                    viewBox="0 0 15.7 17.23">
                                    <g>
                                    <defs>
                                    <rect id="SVGID_1_" x="0.31" y="0.27" width="14.95" height="16.59"/>
                                    </defs>
                                    <clipPath id="SVGID_2_">
                                    <use />
                                    </clipPath>
                                    <path className="st0" d="M7.66,0.27c1.74,0,3.27,0.49,4.62,1.51c1.36,1.03,2.28,2.38,2.72,4.03c0.49,1.88,0.28,3.7-0.64,5.42
                                    c-0.72,1.34-1.77,2.36-3.12,3.07c-0.29,0.15-0.62,0.06-0.78-0.2c-0.17-0.28-0.07-0.64,0.23-0.8c0.42-0.22,0.82-0.48,1.18-0.79
                                    c1.17-1.01,1.91-2.27,2.15-3.8c0.27-1.69-0.09-3.26-1.1-4.66c-1.07-1.48-2.54-2.34-4.35-2.58C5.38,1.06,2.37,3.11,1.65,6.22
                                    c-0.53,2.31,0.07,4.32,1.75,6.01c0.42,0.43,0.92,0.76,1.45,1.04c0.38,0.2,0.44,0.66,0.14,0.95c-0.18,0.16-0.43,0.19-0.67,0.07
                                    c-0.48-0.25-0.92-0.55-1.33-0.89c-1.12-0.95-1.93-2.12-2.34-3.52c-0.65-2.21-0.36-4.3,0.9-6.23c1.16-1.77,2.82-2.85,4.91-3.25
                                    c0.21-0.04,0.41-0.07,0.62-0.08C7.29,0.29,7.5,0.28,7.66,0.27"/>
                                    <path className="st0" d="M8.09,2.56c1.75,0.09,3.33,1,4.29,2.84c0.99,1.89,0.66,4.17-0.77,5.76c-0.08,0.09-0.17,0.18-0.26,0.26
                                    c-0.23,0.21-0.58,0.2-0.8-0.02c-0.22-0.22-0.22-0.58,0-0.8c0.25-0.25,0.47-0.52,0.66-0.82c0.88-1.43,0.74-3.34-0.35-4.63
                                    C9.62,3.67,7.53,3.27,5.84,4.2C4.36,5,3.54,6.69,3.81,8.34c0.14,0.87,0.54,1.61,1.17,2.23c0.17,0.16,0.22,0.36,0.16,0.58
                                    c-0.06,0.21-0.21,0.35-0.43,0.39c-0.2,0.05-0.38-0.01-0.53-0.16c-0.73-0.72-1.22-1.57-1.44-2.57c-0.5-2.27,0.55-4.55,2.6-5.65
                                    C6.08,2.77,6.93,2.56,8.09,2.56"/>
                                    <path className="st0" d="M7.78,10.57c0.94,0,1.71,0.75,1.71,1.69c0,0.3-0.07,0.59-0.12,0.89C9.24,14,9.08,14.86,8.94,15.72
                                    c-0.05,0.31-0.13,0.6-0.37,0.82c-0.33,0.3-0.72,0.4-1.14,0.26C7,16.66,6.74,16.36,6.66,15.92c-0.2-1.09-0.37-2.18-0.57-3.27
                                    c-0.16-0.89,0.29-1.52,0.78-1.83C7.14,10.66,7.46,10.56,7.78,10.57"/>
                                    <path className="st0" d="M7.78,9.42c-0.95,0-1.73-0.77-1.73-1.72c0-0.94,0.77-1.71,1.72-1.71c0.96,0,1.73,0.76,1.73,1.71
                                    C9.5,8.65,8.73,9.42,7.78,9.42"/>
                                    </g>
                                    </svg>   
                                </a>                                                                  
                            </div>
                            <div>
                                <ListRightItemTitle>
                                    {/* <Link data={item.list_two_item_link_url}>
                                        <span className="default-font-size">{item.list_two_item_title}</span>
                                    </Link> */}
                                    <div><a href="javascript:;" id="podcast-link-open" className="default-font-size" onClick={() => newTabFunction(index)}>{item.list_two_item_title}</a></div>
                                </ListRightItemTitle>
                                <ListRightItemTitle>{item.list_two_item_title_two}</ListRightItemTitle>
                                <ListRightItemLinkWrapper>
                                    <Link data={item.list_two_item_link_two_url}>{item.list_two_item_link_two_text}</Link>
                                </ListRightItemLinkWrapper>
                            
                            <div id={`newTab-${index}`} className="newTab" data-name={item.list_two_item_title}>
                                <div style={{display: "flex", height: "100vh", width: "100vw", alignItems: "center", justifyContent: "center"}}>
                                    <audio controls>
                                    <source src={item.list_two_item_link_url?.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>                                  
                            </div>
                        </ListRightItem>
                        <DividerHorizontal className="divider-horizontal" />
                      </div>
                  )}
              </ListRight>
            </ColRight>
          </InnerContainer>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getRendezVousPageSlugs();


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

  const data = await getRendezVousPage(params.lang, previewData);


  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}