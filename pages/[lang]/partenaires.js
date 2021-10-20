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
  font-size: 30px;
`

const ListMain = styled.div``

const List = styled.div`
  padding: 10px 0 0 0; 
  
  :last-child .divider-horizontal {
    display: none;
  }
`

const ListTitle = styled.div`
  padding: 0 20px;
`


const ListItem = styled.div`
  padding: 0 20px;

  margin-top: 30px;

  > a {
    display: flex;
    align-items: center;
    font-size: 34px;
    color: black;
    line-height: 1.2;
  }

  > a > div:nth-child(1) {
    flex-basis: 60%;
  }

  > a > div:nth-child(2) {
    flex-basis: 40%;
  }

  > a > div:nth-child(2) > img {
    height: 70px;
  }

  > a:hover {
    color: rgb(255,174,80);
  }
`

const ListTwo = styled.div`
  padding: 10px 20px;  
`

const ListTwoItem = styled.div`

  > a {
    font-size: 20px;
    color: black;
    line-height: 1.1;
    font-weight: 500;
  }

  > a:hover {
    color: rgb(255,174,80);
  }
`

const DividerHorizontal = styled.div`
  height: 1px;
  background-color: black;
  width: 100%;
  margin-top: 25px;
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
              <Divider><span>{data[0].node.link_list_one_title}</span></Divider>
              <ListMain>
                {
                  data[0].node.body?.map((item, index) => 
                    <List key={index}>
                      <ListTitle>{item.primary.list_title}</ListTitle>
                      {item.fields.map((item, index) => 
                        <ListItem key={index}>
                          <Link data={item.list_item_url}>
                            <div>
                              <div>{item.list_item_title}</div>
                              <div className="default-font-size">{item.list_item_subtitle}</div>
                            </div>
                            <div>
                              <img src={item.image.url}/>
                            </div>
                          </Link>
                        </ListItem>
                      )}
                    <DividerHorizontal className="divider-horizontal"/>
                    </List>
                  )
                }
              </ListMain>
            </ColLeft>
            <ColRight>
              <Divider>
                {data[0].node.link_list_two_title}
              </Divider>
              <ListTwo>
                {
                  data[0].node.link_list_two.map((item, index) => <ListTwoItem key={index}><Link data={item.link_url}>{item.link_text}</Link></ListTwoItem>)
                }
              </ListTwo>
            </ColRight>
          </InnerContainer>
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