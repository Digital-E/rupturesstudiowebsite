import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import RichText from '../../components/rich-text';

import Link from "../../components/link"

import Title from "../../components/title"

import EmailSubscribe from "../../components/email-subscribe";

import { getContactPageSlugs, getContactPage, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  .page-title {
    position: relative;
    padding-top: 0.2vw;
    padding-bottom: 0.2vw;
  }

  @media(max-width: 989px) {
    margin-top: 53px;
  }
`

const InnerContainer = styled.div`
  display: flex;

  @media(max-width: 989px) {
    flex-direction: column;
  }
`
const ColOne = styled.div`
    flex-basis: 50%;
`

const Socials = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;

    @media(max-width: 989px) {
        padding: 20px 10px;
    }
`

const SocialsTwo = styled.div`
    @media(max-width: 989px) {
        padding: 20px 10px;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
    }

    @media(min-width: 990px) {
        background-color: none !important;
    }
`

const Icons = styled.div`
    display: flex;

    > a {
        margin-left: 15px;
    }

    @media(max-width: 989px) {
        > a {
            margin-left: 10px;
        }

        svg {
            height: 30px;
        }
    }
`

const Email = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;

    > div {
        padding-top: 0 !important;
    }

    margin-bottom: 30px;

    @media(max-width: 989px) {
        padding: 0 10px;

        svg {
            display: none;
        }
    }
`


const ColTwo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 50%; 
    
`

const ColTwoTop = styled.div`
    display: flex;
    flex-grow: 1;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const ColTwoTopOne = styled.div`
    flex-basis: 50%;
    border-left: 1px solid black;

    @media(max-width: 989px) {
        border-left: none;
        border-top: 1px solid black;
    }
`

const ColTwoTopTwo = styled.div`
    flex-basis: 50%;
    border-left: 1px solid black;

    @media(max-width: 989px) {
        border-left: none;
        border-top: 1px solid black;
    }
`

const ColTwoBottom = styled.div`
  padding: 10px 20px;
  border-top: 1px solid black;
  border-left: 1px solid black;

  span {
      color: black;
  }

  @media(max-width: 989px) {
      padding: 10px;
      border-left: none;
}
`


const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 20px;
  font-size: 30px;

  @media(max-width: 989px) {
    padding: 5px 10px;
    font-size: 20px;
  }
`

const Text = styled.div`
    padding: 20px;

    & .small-font-size p
    {
       font-size: inherit;
    }

    & .medium-font-size p
     {
        font-size: inherit;
    }

    & .large-font-size p
     {
        font-size: inherit;
    }

    @media(max-width: 989px) {
        padding: 20px 10px;
    }
`

const TextSecondary = styled.div`
    padding: 20px 20px 0 20px;


    p {
        margin: 0 !important;
    }

    & .medium-font-size p
     {
        font-size: inherit;
    }

    & .large-font-size p
     {
        font-size: inherit;
    }

    a {
        font-size: 25px !important;
    }

    @media(min-width: 990px) {
        a {
            color: black;
        }
    }

    @media(max-width: 989px) {
        padding: 0;

        a {
            font-size: 20px !important;
        }
    }
`

const EmailSubscribeWrapper = styled.div`
    @media(max-width: 989px) {
        border-bottom: 1px solid black;
        margin-bottom: 20px;
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
              <ColOne>
                <Divider className="orange-background">{data[0].node.column_one_title}</Divider>
                <Socials>
                    <TextSecondary className="large-font-size">
                        <RichText render={data[0].node.socials_text_one} />
                    </TextSecondary>
                    <Icons>
                        <Link data={data[0].node.insta_link}>
                            <svg version="1.1" x="0px" y="0px"
                                height="50px"
                                viewBox="0 0 14.62 14.51">
                            <g>
                                <path className="st0" d="M5.96,7.37C5.99,7.6,6.02,7.74,6.05,7.78C6.3,8.34,6.71,8.62,7.26,8.62c0.7,0,1.12-0.43,1.25-1.29
                                    c0-0.16-0.01-0.26-0.04-0.29c-0.2-0.64-0.61-0.96-1.21-0.96H7.22C6.48,6.07,6.06,6.5,5.96,7.37 M5.42,6.74
                                    C5.76,5.85,6.36,5.4,7.22,5.4h0.04c0.39,0,0.76,0.12,1.12,0.38c0.53,0.45,0.79,0.94,0.79,1.46v0.09c0,0.92-0.5,1.55-1.5,1.91H6.85
                                    C5.82,8.89,5.3,8.26,5.3,7.37C5.34,7.01,5.38,6.8,5.42,6.74 M9.22,4.86c0.27,0,0.44,0.17,0.51,0.51C9.61,5.64,9.45,5.78,9.27,5.78
                                    S8.92,5.64,8.8,5.36C8.8,5.11,8.94,4.94,9.22,4.86 M4.47,4.78c-0.22,0-0.33,0.7-0.33,2.09v0.92c0,0.74,0.03,1.3,0.08,1.67
                                    c0.18,0.66,0.79,1,1.84,1c0.63-0.03,1.23-0.04,1.79-0.04h1.21c0.72,0,1.15-0.52,1.29-1.55V5.9c0-1.11-0.53-1.67-1.59-1.67H5.84
                                    C5.15,4.24,4.69,4.42,4.47,4.78 M3.54,5.15c0.37-1.06,1.09-1.59,2.17-1.59h3.04l0.53,0.04l0.52,0.17c0.78,0.34,1.17,1.06,1.17,2.17
                                    v2.8c0,0.88-0.24,1.5-0.71,1.88c-0.21,0.31-1.02,0.46-2.42,0.46c-1.83,0.05-2.92-0.02-3.25-0.21c-0.75-0.4-1.13-1.19-1.13-2.37
                                    V6.32C3.46,5.86,3.49,5.48,3.54,5.15 M2.59,1.94c-1.61,1.57-2.42,3.34-2.42,5.3c0,1.19,0.33,2.4,1,3.63
                                    c1.55,2.28,3.56,3.42,6.01,3.42c1.96,0,3.69-0.72,5.18-2.17c1.28-1.53,1.92-3.08,1.92-4.63V6.91c0-0.69-0.21-1.54-0.63-2.55
                                    c-0.47-1.06-1.22-1.99-2.25-2.8c-1.37-0.89-2.6-1.33-3.67-1.33h-1C5.47,0.23,4.09,0.8,2.59,1.94"/>
                            </g>
                            </svg>
                        </Link>
                        <Link data={data[0].node.facebook_link}>
                            <svg height="50px" x="0px" y="0px"
                                viewBox="0 0 14.62 14.51">
                            <g>
                                <path className="st0" d="M6.3,4.04C6.6,3.32,7.22,2.96,8.18,2.96H8.4c0.58,0,0.88,0.04,0.88,0.12v1.25H8.44
                                    c-0.5,0.05-0.75,0.28-0.75,0.71v1.01c0,0.05,0.03,0.08,0.08,0.08h1.42v0.08C9.1,7.13,9.03,7.59,8.98,7.59H7.77
                                    c-0.05,0-0.07,0.03-0.08,0.09v3.88H6.2l-0.02-0.25V7.72C6.14,7.63,6.1,7.59,6.06,7.59H5.35V6.13h0.71C6.14,6.09,6.18,6.04,6.18,6
                                    L6.14,4.71C6.2,4.41,6.25,4.19,6.3,4.04 M5.35,0.49c-1.81,0.6-3.14,1.6-4.01,3.01C0.79,4.34,0.43,5.44,0.25,6.8
                                    c0.03,0,0.04,0.02,0.04,0.05c-0.03,0.05-0.04,0.1-0.04,0.16v0.08c0,1.92,0.65,3.6,1.96,5.05c1.54,1.45,3.21,2.17,5.01,2.17h0.16
                                    c0.49,0,1.17-0.11,2.04-0.33c1.72-0.59,3.04-1.65,3.97-3.17c0.64-1.23,0.96-2.32,0.96-3.26V6.97c0-0.14-0.04-0.46-0.12-0.96
                                    c-0.11-1.07-0.71-2.27-1.8-3.59c-1.55-1.47-3.19-2.21-4.92-2.21H7.1C6.61,0.21,6.02,0.3,5.35,0.49"/>
                            </g>
                            </svg>
                        </Link>
                    </Icons>
                </Socials>

                <SocialsTwo className="orange-background">
                    <TextSecondary className="medium-font-size">
                            <RichText render={data[0].node.socials_text_two} />
                    </TextSecondary> 
                </SocialsTwo>  
                
                <EmailSubscribeWrapper>
                    <EmailSubscribe data={data[0].node}/>
                </EmailSubscribeWrapper>

                <Email>
                    <div>
                        <svg height="50px" x="0px" y="0px"
                                viewBox="0 0 30.82 31.19">
                            <g id="bg">
                            </g>
                            <g id="design">
                                <path className="st0" d="M15.41,2.41C8.14,2.41,2.22,8.33,2.22,15.6s5.91,13.19,13.19,13.19S28.6,22.87,28.6,15.6
                                    S22.68,2.41,15.41,2.41 M15.41,29.99c-1.94,0-3.83-0.38-5.6-1.13c-1.71-0.73-3.25-1.76-4.58-3.09c-1.32-1.32-2.36-2.86-3.08-4.58
                                    c-0.75-1.78-1.13-3.66-1.13-5.6c0-1.94,0.38-3.83,1.13-5.6c0.72-1.72,1.76-3.25,3.08-4.58C6.55,4.1,8.09,3.06,9.81,2.33
                                    c1.78-0.75,3.66-1.13,5.6-1.13s3.83,0.38,5.6,1.13c1.72,0.73,3.25,1.76,4.58,3.08c1.32,1.32,2.36,2.86,3.08,4.58
                                    c0.75,1.77,1.13,3.66,1.13,5.6c0,1.94-0.38,3.83-1.13,5.6c-0.73,1.71-1.76,3.25-3.08,4.58c-1.32,1.32-2.86,2.36-4.58,3.09
                                    C19.24,29.61,17.35,29.99,15.41,29.99"/>
                                <path className="st0" d="M7.15,20.35c1.76-1.59,3.5-3.17,5.25-4.76c-1.75-1.59-3.49-3.17-5.25-4.76V20.35z M18.42,15.6
                                    c1.75,1.59,3.49,3.17,5.25,4.76v-9.52C21.91,12.43,20.17,14.01,18.42,15.6 M7.75,20.89h15.33c-1.76-1.6-3.5-3.18-5.24-4.75
                                    c-0.35,0.31-0.68,0.61-1.03,0.89c-0.24,0.19-0.5,0.37-0.76,0.51c-0.42,0.23-0.85,0.22-1.27,0c-0.17-0.09-0.35-0.19-0.5-0.31
                                    c-0.4-0.33-0.79-0.67-1.18-1.01c-0.04-0.03-0.07-0.06-0.11-0.09C11.24,17.72,9.5,19.29,7.75,20.89 M7.78,10.3
                                    c-0.01,0.01-0.01,0.02-0.02,0.03c0.02,0.01,0.04,0.02,0.06,0.04c2.21,2,4.41,4,6.62,6c0.15,0.13,0.32,0.25,0.49,0.35
                                    c0.31,0.18,0.64,0.18,0.96,0c0.19-0.11,0.38-0.24,0.54-0.39c2.19-1.98,4.37-3.96,6.56-5.94c0.03-0.02,0.05-0.05,0.09-0.09H7.78z
                                    M24.55,21.69H6.27V9.5h18.28V21.69z"/>
                            </g>
                            </svg>                        
                    </div>
                    <TextSecondary className="medium-font-size">
                            <RichText render={data[0].node.text_four} />
                    </TextSecondary> 
                </Email>
                <Email>
                    <div>
                        <svg height="50px" x="0px" y="0px"
                                viewBox="0 0 30.82 31.19">
                            <g id="bg">
                            </g>
                            <g id="design">
                                <path className="st0" d="M15.41,2.41C8.14,2.41,2.22,8.33,2.22,15.6s5.91,13.19,13.19,13.19S28.6,22.87,28.6,15.6
                                    S22.68,2.41,15.41,2.41 M15.41,29.99c-1.94,0-3.83-0.38-5.6-1.13c-1.71-0.73-3.25-1.76-4.58-3.09c-1.32-1.32-2.36-2.86-3.08-4.58
                                    c-0.75-1.78-1.13-3.66-1.13-5.6c0-1.94,0.38-3.83,1.13-5.6c0.72-1.72,1.76-3.25,3.08-4.58C6.55,4.1,8.09,3.06,9.81,2.33
                                    c1.78-0.75,3.66-1.13,5.6-1.13s3.83,0.38,5.6,1.13c1.72,0.73,3.25,1.76,4.58,3.08c1.32,1.32,2.36,2.86,3.08,4.58
                                    c0.75,1.77,1.13,3.66,1.13,5.6c0,1.94-0.38,3.83-1.13,5.6c-0.73,1.71-1.76,3.25-3.08,4.58c-1.32,1.32-2.86,2.36-4.58,3.09
                                    C19.24,29.61,17.35,29.99,15.41,29.99"/>
                                <path className="st0" d="M7.15,20.35c1.76-1.59,3.5-3.17,5.25-4.76c-1.75-1.59-3.49-3.17-5.25-4.76V20.35z M18.42,15.6
                                    c1.75,1.59,3.49,3.17,5.25,4.76v-9.52C21.91,12.43,20.17,14.01,18.42,15.6 M7.75,20.89h15.33c-1.76-1.6-3.5-3.18-5.24-4.75
                                    c-0.35,0.31-0.68,0.61-1.03,0.89c-0.24,0.19-0.5,0.37-0.76,0.51c-0.42,0.23-0.85,0.22-1.27,0c-0.17-0.09-0.35-0.19-0.5-0.31
                                    c-0.4-0.33-0.79-0.67-1.18-1.01c-0.04-0.03-0.07-0.06-0.11-0.09C11.24,17.72,9.5,19.29,7.75,20.89 M7.78,10.3
                                    c-0.01,0.01-0.01,0.02-0.02,0.03c0.02,0.01,0.04,0.02,0.06,0.04c2.21,2,4.41,4,6.62,6c0.15,0.13,0.32,0.25,0.49,0.35
                                    c0.31,0.18,0.64,0.18,0.96,0c0.19-0.11,0.38-0.24,0.54-0.39c2.19-1.98,4.37-3.96,6.56-5.94c0.03-0.02,0.05-0.05,0.09-0.09H7.78z
                                    M24.55,21.69H6.27V9.5h18.28V21.69z"/>
                            </g>
                            </svg>                       
                    </div>
                    <TextSecondary className="medium-font-size">
                            <RichText render={data[0].node.text_five} />
                    </TextSecondary> 
                </Email>
                <Email>
                    <div>
                        <svg height="50px" x="0px" y="0px"
                            viewBox="0 0 30.82 31.19">
                        <g id="bg">
                        </g>
                        <g id="design">
                            <path className="st0" d="M15.41,2.41C8.14,2.41,2.22,8.33,2.22,15.6s5.91,13.19,13.19,13.19S28.6,22.87,28.6,15.6
                                S22.68,2.41,15.41,2.41 M15.41,29.99c-1.94,0-3.83-0.38-5.6-1.13c-1.71-0.73-3.25-1.76-4.58-3.09c-1.32-1.32-2.36-2.86-3.08-4.58
                                c-0.75-1.78-1.13-3.66-1.13-5.6c0-1.94,0.38-3.83,1.13-5.6c0.72-1.72,1.76-3.25,3.08-4.58C6.55,4.1,8.09,3.06,9.81,2.33
                                c1.78-0.75,3.66-1.13,5.6-1.13s3.83,0.38,5.6,1.13c1.72,0.73,3.25,1.76,4.58,3.08c1.32,1.32,2.36,2.86,3.08,4.58
                                c0.75,1.77,1.13,3.66,1.13,5.6c0,1.94-0.38,3.83-1.13,5.6c-0.73,1.71-1.76,3.25-3.08,4.58c-1.32,1.32-2.86,2.36-4.58,3.09
                                C19.24,29.61,17.35,29.99,15.41,29.99"/>
                            <path className="st0" d="M7.15,20.35c1.76-1.59,3.5-3.17,5.25-4.76c-1.75-1.59-3.49-3.17-5.25-4.76V20.35z M18.42,15.6
                                c1.75,1.59,3.49,3.17,5.25,4.76v-9.52C21.91,12.43,20.17,14.01,18.42,15.6 M7.75,20.89h15.33c-1.76-1.6-3.5-3.18-5.24-4.75
                                c-0.35,0.31-0.68,0.61-1.03,0.89c-0.24,0.19-0.5,0.37-0.76,0.51c-0.42,0.23-0.85,0.22-1.27,0c-0.17-0.09-0.35-0.19-0.5-0.31
                                c-0.4-0.33-0.79-0.67-1.18-1.01c-0.04-0.03-0.07-0.06-0.11-0.09C11.24,17.72,9.5,19.29,7.75,20.89 M7.78,10.3
                                c-0.01,0.01-0.01,0.02-0.02,0.03c0.02,0.01,0.04,0.02,0.06,0.04c2.21,2,4.41,4,6.62,6c0.15,0.13,0.32,0.25,0.49,0.35
                                c0.31,0.18,0.64,0.18,0.96,0c0.19-0.11,0.38-0.24,0.54-0.39c2.19-1.98,4.37-3.96,6.56-5.94c0.03-0.02,0.05-0.05,0.09-0.09H7.78z
                                M24.55,21.69H6.27V9.5h18.28V21.69z"/>
                        </g>
                        </svg>                      
                    </div>
                    <TextSecondary className="medium-font-size">
                            <RichText render={data[0].node.text_six} />
                    </TextSecondary> 
                </Email>
              </ColOne>

            <ColTwo>
                <ColTwoTop>
                    <ColTwoTopOne>
                        <Divider className="orange-background">{data[0].node.column_two_title}</Divider>
                        <Text className="small-font-size">
                            <RichText render={data[0].node.column_two_text} />
                        </Text>
                    </ColTwoTopOne>

                    <ColTwoTopTwo>
                        <Divider className="orange-background">{data[0].node.column_three_title}</Divider>
                        <Text className="small-font-size">
                            <RichText render={data[0].node.column_three_text} />
                        </Text>
                    </ColTwoTopTwo>
                </ColTwoTop>

                <ColTwoBottom>
                    <Link data={data[0].node.legal_link_url}><span className="small-font-size">{data[0].node.legal_link_text}</span></Link>
                </ColTwoBottom>
            </ColTwo>
          </InnerContainer>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getContactPageSlugs();

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


  const data = await getContactPage(params.lang, previewData);



  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, menuData, footerData },
  };
}