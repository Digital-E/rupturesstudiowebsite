import Head from 'next/head'
import Layout from "../components/layout";
import styled from 'styled-components';

import { getMenu } from "../lib/api";

import { SITE_NAME } from "../lib/constants"

const Container = styled.div`
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        margin-top: 25px;
    }
`


export default function Custom404() {
    return (
    <Layout 
    name={"404 - Page Not Found"} content={""} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | 404 - Page Not Found</title>
      </Head>
      <Container>
          <div>
            <h1>404 - Page Not Found</h1>
            <a href="/en-gb">Go Home</a>
          </div>
      </Container>
    </Layout>
    )
  }

export async function getStaticProps({}) {



    // Get Menu And Footer

    const menuData = await getMenu("en-gb");

    // const footerData = await getFooter(lang);

    const footerData = null;

    return {
        props: { menuData, footerData },
    };
}