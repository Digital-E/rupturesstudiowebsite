import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';

import Title from "../../components/title"

import Commissaire from "../../components/commissaires-slices/commissaire"

import { getCommissairesPage, getCommissairesPageSlugs, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

import { gsap } from "gsap";

import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let Masonry = null;

if(typeof window !== "undefined") {
  Masonry = require("masonry-layout");
}

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

const Container = styled.div``

const ContainerInner = styled.div`
  overflow: hidden;
`


const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 0;
  width: 100vw;
  margin-top: 17.5vw;

  @media(max-width: 989px) {
    margin-top: 53px;
  }
`

const InnerContainerLeft = styled.div`
  flex-basis: 81.3%;

  @media(max-width: 989px) {
    flex-basis: 100%;
  }
`

const InnerContainerRight = styled.div`
  position: relative;
  flex-basis: 18.7%;
  border-left: 1px solid black;
  background-color: white;
  overflow: scroll;

  @media(max-width: 989px) {
    display: none;
  }
`

const ListItem = styled.div`
  border-bottom: 1px solid black;
  cursor: pointer;

  span {
    font-size: 20px;
    color: black;
    padding: 5px 10px;
    display: block;
    width: 100%;
    height: 100%;
  }
`

const Grid = styled.div`

margin-right: -1px;

> div {
  float: left;
  width: 50%;
  border-bottom: 1px solid black;
}

> div {
  border-right: 1px solid black;
}

@media(max-width: 989px) {
  > div {
    float: none;
    width: 100%;
    border-bottom: 1px solid black;
  }

  > div:nth-child(odd) {
    border-right: none;
  }
}
`





let scrollTriggerInstance = null;

export default function Index({ preview, data, footerData }) {

  let scrollTo = (id) => {
    gsap.to(window, {duration: 1, scrollTo: {y:`#${id}`, offsetY: 0.048 * window.innerWidth}});
  }

  let init = (reset) => {

    if(reset === true) {
      if(scrollTriggerInstance !== null) {
          ScrollTrigger.getById("scroll-trigger-one").kill(true);
      }
    }

    if(window.innerWidth > 989) {

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: "#inner-container-right",
        id: "scroll-trigger-one",
        start: `top top+=${0.048 * window.innerWidth}px`,
        pin: true,
      });

    } 
  }

  let initWrapper = () => {
    init(true)
  }

  useEffect(() => {
    var grid = document.querySelector('.grid');

    if(window.innerWidth > 989) {

      var msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      transitionDuration: 0
      // columnWidth: 500
      });

      init();

    } 

    window.addEventListener("resize", initWrapper)

    return () => {
        window.removeEventListener("resize", initWrapper)
    }

  },[]);

  let sanitizeTags = (item) => {
    let sanitized = item.item_title.toLowerCase().split(" ").filter(item => item !== "&")
    return sanitized.join("-")
  }


  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>

      <Container className="hello">
      <ContainerInner>
        <Title>{data[0].node.title}</Title>
        <InnerContainer id="inner-container">
          <InnerContainerLeft id="commissionners-grid">
            <Grid className="grid">
            {data[0].node.list.length > 0 && 
                data[0].node.list.map((item, index) => <Commissaire key={index} data={item} />)
            }
            </Grid>
          </InnerContainerLeft>
          <InnerContainerRight id="inner-container-right">
            {data[0].node.list.length > 0 && 
              data[0].node.list.map((item, index) => <ListItem key={index} onClick={() => scrollTo(sanitizeTags(item))}><span className="orange-hover">{index + 1}. {item.item_title}</span></ListItem>)
            }
          </InnerContainerRight>
        </InnerContainer>
      </ContainerInner>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getCommissairesPageSlugs();

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

  const data = await getCommissairesPage(params.lang, previewData);



  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}