import Head from 'next/head'
import Layout from "../../../components/layout";
import styled from 'styled-components';


import { getArtistPage, getArtistPageSlugs, getMenu, getFooter } from "../../../lib/api";

import { SITE_NAME } from "../../../lib/constants"

import Carousel from "../../../components/artist-slices/carousel"

import ColRight from "../../../components/artist-slices/column-right"

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 4.8vw;
    height: calc(100vh - 4.8vw);
    width: 100vw;
    overflow: hidden;
    background: white;
    

    > div:nth-child(1) {
        flex-basis: 65.7%;
    }

    > div:nth-child(2) {
        flex-basis: calc( 34.3% + 1px);
    }
`




export default function Index({ preview, data, footerData }) {

  return (
    <Layout 
    preview={preview} name={data[0].node.name} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.name}</title>
      </Head>
      <Container>
          <Carousel data={data[0].node.images} />
          <ColRight data={data[0].node} />
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getArtistPageSlugs();

  let paths = lang.map((item) => ({
    params: {
      artist: item.node._meta.uid,
      lang: item.node._meta.lang
    }
  }))


  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params, preview = false, previewData }) {


  const data = await getArtistPage(params.artist, params.lang, previewData);


  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}