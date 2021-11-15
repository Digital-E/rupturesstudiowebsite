import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import RichText from '../../components/rich-text';

import Title from "../../components/title"

import { getLegalPage, getLegalPagesSlugs, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"



const Container = styled.div`
  background-color: white;
  
  .page-title {
    position: relative;
    padding-top: 0.2vw;
    padding-bottom: 2.2vw;
  }

  @media(max-width: 989px) {
    margin-top: 53px;
  }

  @media(max-width: 989px) {
    width: 100vw;
  }
`

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 25px;
  font-size: 30px;

  @media(max-width: 989px) {
    padding: 5px 10px;
    font-size: 20px;
  }
`
const Text = styled.div`
  padding: 30px 25px;

  & .medium-font-size p {
    font-size: inherit;
  }

  & .large-font-size p {
    font-size: inherit;
  }

  @media(max-width: 989px) {
    padding: 20px 10px;
  }

  @media(min-width: 990px) {
    width: 75%;
    border-right: 1px solid black;
  }
`




export default function Legal({ preview, data, footerData }) {


  if(data === undefined) return null

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
          {/* <Divider className="orange-background">Art au Centre Genève</Divider> */}
          <Text className="medium-font-size">
            <RichText render={data[0].node.text} />
          </Text>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getLegalPagesSlugs();

  // let paths = lang.map((item) => ({
  //   params: {
  //     artist: item.node._meta.uid,
  //     lang: item.node._meta.lang
  //   }
  // }))

  let paths = lang.map((item => {

    if(item.node._meta.uid.split("__").length === 2) {
        return { 
            params: { 
                legal: item.node._meta.uid.split("__")[1], 
                lang: item.node._meta.lang 
            }
        }
    }

    return {
        params: { 
            legal: item.node._meta.uid, 
            lang: item.node._meta.lang
        }
    }

  })) 
  

  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps({ params, preview = false, previewData }) {


  const data = await getLegalPage(params.legal, params.lang, previewData);
  

  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}