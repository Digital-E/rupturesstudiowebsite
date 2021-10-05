import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';


import { getHome, getHomePagesSlugs, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`

const BackgroundContainer = styled.div`
  opacity: 1;
  
  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: -1;
    filter: grayscale(100%);
    opacity: 1;
  }
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

  > span {
    position: absolute;
    z-index: 1;
    font-size: 30vh;
  }

  pointer-events: none;

  > span:nth-child(1) {
    top: 8%;
    left: 3%;
  }

  > span:nth-child(2) {
    top: 8%;
    right: 3%;
  }

  > span:nth-child(3) {
    top: 35%;
    left: 3%;
  }

  > span:nth-child(4) {
    right: 3%;
    bottom: 3%;
  }
`



export default function Index({ preview, data, footerData }) {

  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>
      <Container>
        <Title>
          <span>Art</span>
          <span>au</span>
          <span>Centre</span>
          <span>Genève</span>
        </Title>
        <BackgroundContainer>
          <Overlay />
          <img src="/map.png" />
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



  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}