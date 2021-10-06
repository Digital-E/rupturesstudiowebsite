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

let Masonry = null;

if(typeof window !== "undefined") {
  Masonry = require("masonry-layout");
}

gsap.registerPlugin(ScrollToPlugin);

const Container = styled.div``

const ContainerInner = styled.div`
  overflow: hidden;
`


const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  z-index: 0;
  width: 100vw;
  margin-top: 17.6vw;
  height: calc(100vh - 17.6vw);
`

const InnerContainerLeft = styled.div`
  flex-basis: 81.2%;
  overflow: scroll;
`

const InnerContainerRight = styled.div`
  position: relative;
  flex-basis: 18.8%;
  border-left: 1px solid black;
  background-color: white;
  overflow: scroll;
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

  &.is-active {
    background-color: rgb(255,174,80);
  }

  span:hover {
    background-color: rgb(255,174,80);
  }
`

const Grid = styled.div`

> div {
  float: left;
  width: 50%;
}

> div:nth-child(odd) {
  border-right: 1px solid black;
}
`







export default function Index({ preview, data, footerData }) {

  let scrollTo = (id) => {
    gsap.to("#commissionners-grid", {duration: 1, scrollTo: `#${id}`});
  }

  useEffect(() => {
    var grid = document.querySelector('.grid');
    var msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    // columnWidth: 500
    });
  },[]);


  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>

      <Container>
      <ContainerInner>
        <Title>{data[0].node.title}</Title>
        <InnerContainer>
          <InnerContainerLeft id="commissionners-grid">
            <Grid className="grid">
            {data[0].node.list.length > 0 && 
                data[0].node.list.map((item, index) => <Commissaire key={index} data={item} />)
            }
            </Grid>
          </InnerContainerLeft>
          <InnerContainerRight>
            {data[0].node.list.length > 0 && 
              data[0].node.list.map((item, index) => <ListItem onClick={() => scrollTo(item.item_title.toLowerCase().split(" ").join("-"))}><span>{index + 1}. {item.item_title}</span></ListItem>)
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