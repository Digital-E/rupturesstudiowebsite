import Head from 'next/head'
import Layout from "../../../components/layout";
import styled from 'styled-components';

import Map from "../../../components/map"


import { getArtistsPage, getArtistsPageSlugs, getMenu, getFooter } from "../../../lib/api";

import { SITE_NAME } from "../../../lib/constants"

const Container = styled.div`
  position:relative;
  // top: 55px;
  top: 3.795vw;
`


const Title = styled.div`
 position: relative;
 font-size: 15vw;
 text-transform: lowercase;
 line-height: 0.9;
 border-bottom: 1px solid black;
//  padding: 0 20px;
 padding: 0 1.38vw;
`

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 13.6vw - 3.795vw);
`

const InnerContainerLeft = styled.div`
  flex-basis: 83%;
`

const InnerContainerRight = styled.div`
  flex-basis: 17%;
  border-left: 1px solid black;
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
        <Title>{data[0].node.title}</Title>
        <InnerContainer>
          <InnerContainerLeft>
            <Map />
          </InnerContainerLeft>

          <InnerContainerRight>

          </InnerContainerRight>
        </InnerContainer>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getArtistsPageSlugs();

  let paths = lang.map((item) => ({
    params: {
      artists:  item.node._meta.uid,
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

  const data = await getArtistsPage(params.lang, previewData);


  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}