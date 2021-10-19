import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';

import moment from "moment";

import Link from "../../components/link"


import Title from "../../components/title"

import { getRendezVousPageSlugs, getRendezVousPage, getMenu, getFooter } from "../../lib/api";

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
  flex-basis: 50%;
`

const ColRight = styled.div`
flex-basis: 50%;
border-left: 1px solid black;
`


const Divider = styled.div`
  background-color: rgb(255,174,80);
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 20px;
  font-size: 26px;
`

const Text = styled.div`
  padding: 20px;
  border-bottom: 1px solid black;
`


const ListLeft = styled.div`
  
  :last-child .divider-horizontal {
    display: none;
  }
`


const ListLeftItemTitle = styled.div`
  font-weight: normal;
`


const ListLeftItem = styled.div`
  padding: 0 20px;
  margin: 20px 0;
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


  > div > div:nth-child(2) {
      margin-left: 10px;
}
`

const ListRight = styled.div`
  
  :last-child .divider-horizontal {
    display: none;
  }
`


const ListRightItemTitle = styled.div`
  font-weight: normal;
`


const ListRightItem = styled.div`
  padding: 0 20px;
  margin: 20px 0;
`

const DividerHorizontal = styled.div`
  height: 1px;
  background-color: black;
  width: 100%;
  margin-top: 25px;
`




export default function Index({ preview, data, footerData }) {

    console.log(data[0].node)

    let eventsList = data[0].node.list_one.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.list_one_item_date) - new Date(a.list_one_item_date);
      });

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
              <Divider><span>{data[0].node.list_one_title}</span></Divider>
              <Text>{data != null && RichText.render(data[0].node.list_one_text)}</Text>
              <ListLeft>
                  {eventsList.map((item,index) => 
                      <>
                        <ListLeftItem>
                            <ListLeftItemTitle className="medium-font-size">{moment(item.list_one_item_date).format('dddd Do MMMM HH:mm')}</ListLeftItemTitle>
                            <ListLeftItemTitle className="medium-font-size">{item.list_one_item_title}</ListLeftItemTitle>
                            <ListLeftItemLinkWrapper>
                                <Link data={item.list_one_item_link_url}>{item.list_one_item_link_text}</Link>
                            </ListLeftItemLinkWrapper>
                            <ListLeftItemText>{item != null && RichText.render(item.list_one_item_text)}</ListLeftItemText>
                            <ListLeftItemInformation>
                                <div>
                                    <div>
                                        <svg version="1.1" height="35px" x="0px" y="0px"
                                            viewBox="0 0 15.7 17.23">
                                        <g>
                                            <path class="st0" d="M5.68,13.52v0.99l1.8-1.83v3.38h0.75v-3.38l1.8,1.83v-0.99l-2.18-2.28L5.68,13.52z M7.86,10.52
                                                c-1.07,0-1.92-0.86-1.92-1.9s0.85-1.91,1.92-1.91c1.05,0,1.9,0.86,1.9,1.91S8.91,10.52,7.86,10.52 M12.75,10.79h0.99l-1.83-1.8
                                                h3.38V8.24h-3.38l1.83-1.8h-0.99l-2.28,2.17L12.75,10.79z M2.95,6.44H1.96l1.83,1.8H0.42v0.75h3.38l-1.83,1.8h0.99l2.28-2.17
                                                L2.95,6.44z M10.03,3.71V2.72l-1.8,1.83V1.17H7.48v3.38l-1.8-1.83v0.99l2.17,2.28L10.03,3.71z"/>
                                        </g>
                                        </svg>                                        
                                    </div>
                                    <div className="small-font-size">{item.list_one_item_information_one}</div>
                                </div>
                                <div>
                                    <div>
                                        <svg 
                                            height="30px" x="0px" y="0px" viewBox="0 0 15.7 17.2"
                                            >
                                        <path d="M7.8,9.3C7.5,9.3,7.2,9,7.2,8.6S7.5,8,7.8,8c0.4,0,0.7,0.3,0.7,0.6C8.5,9,8.2,9.3,7.8,9.3"/>
                                        <line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="7.8" y1="8.7" x2="10.7" y2="8.7"/>
                                        <line fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" x1="7.8" y1="8.8" x2="7.8" y2="13.4"/>
                                        <circle fill="none" stroke="#000000" stroke-miterlimit="10" cx="7.8" cy="8.6" r="7.2"/>
                                        </svg>                                        
                                    </div>
                                    <div className="small-font-size">{item.list_one_item_information_two}</div>
                                </div>
                            </ListLeftItemInformation>
                        </ListLeftItem>
                        <DividerHorizontal />
                      </>
                  )}
              </ListLeft>
            </ColLeft>
            <ColRight>
              <Divider>
                {data[0].node.list_two_title}
              </Divider>
              <Text>{data != null && RichText.render(data[0].node.list_two_text)}</Text>
              <ListRight>
                  {data[0].node.list_two.map((item,index) => 
                      <>
                        <ListRightItem>
                            <ListRightItemTitle>{item.list_one_item_title}</ListRightItemTitle>
                            {/* <ListLeftItemLinkWrapper>
                                <Link data={item.list_one_item_link_url}>{item.list_one_item_link_text}</Link>
                            </ListLeftItemLinkWrapper> */}
                        </ListRightItem>
                        <DividerHorizontal />
                      </>
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