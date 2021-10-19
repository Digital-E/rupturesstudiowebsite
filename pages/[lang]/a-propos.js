import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';


import Title from "../../components/title"

import { getAProposPageSlugs, getAProposPage, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

const Container = styled.div`
  .page-title {
    position: relative;
    padding-top: 0.2vw;
    padding-bottom: 2.2vw;
  }
`

const Divider = styled.div`
  background-color: rgb(255,174,80);
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 25px;

  font-size: 30px;
`
const Text = styled.div`
  padding: 30px 25px;

  & .medium-font-size p {
    font-size: inherit;
  }

  & .large-font-size p {
    font-size: inherit;
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
          <Title>{data[0].node.title}</Title>
          <Divider>Art au Centre Genève</Divider>
          <Text className="large-font-size">
            <RichText render={data[0].node.text} 
                              // htmlSerializer={htmlSerializer} 
            />
          </Text>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getAProposPageSlugs();

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


  const data = await getAProposPage(params.lang, previewData);



  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}