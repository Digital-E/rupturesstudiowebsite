import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import Link from "../../components/link"


import Title from "../../components/title"

import { getPartenairesPageSlugs, getPartenairesPage, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

const Container = styled.div`
  .page-title {
    position: relative;
    padding-top: 0.2vw;
    padding-bottom: 2.2vw;
  }
`

const InnerContainer = styled.div`
  display: flex;
`

const ColLeft = styled.div`
  flex-basis: 75%;

  // > div:first-child > span {
  //   opacity: 0;
  // }
`

const ColRight = styled.div`
flex-basis: 25%;
border-left: 1px solid black;
`


const Divider = styled.div`
  background-color: rgb(255,174,80);
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 20px;
  font-size: 26px;
`

const ListOne = styled.div`
  padding: 10px 10px;  
`

const ListOneItem = styled.div`

  > a {
    font-size: 34px;
    color: black;
    line-height: 1.2;
  }

  > a:hover {
    color: rgb(255,174,80);
  }
`

const ListTwo = styled.div`
  padding: 10px 30px;  
`

const ListTwoItem = styled.div`

  > a {
    font-size: 16px;
    color: black;
    line-height: 1.2;
  }

  > a:hover {
    color: rgb(255,174,80);
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
          <InnerContainer>
            <ColLeft>
              <Divider><span>{data[0].node.title}</span></Divider>
              <ListOne>
                {
                  data[0].node.link_list_one.map((item, index) => <ListOneItem><Link data={item.link_url}>{item.link_text}</Link></ListOneItem>)
                }
              </ListOne>
            </ColLeft>
            <ColRight>
              <Divider>
                {data[0].node.link_list_two_title}
              </Divider>
              <ListTwo>
                {
                  data[0].node.link_list_two.map((item, index) => <ListTwoItem><Link data={item.link_url}>{item.link_text}</Link></ListTwoItem>)
                }
              </ListTwo>
            </ColRight>
          </InnerContainer>
          {/* <Divider>Art au Centre Genève</Divider>
          <Text>{data != null && RichText.render(data[0].node.text)}</Text> */}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getPartenairesPageSlugs();

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


  const data = await getPartenairesPage(params.lang, previewData);



  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}