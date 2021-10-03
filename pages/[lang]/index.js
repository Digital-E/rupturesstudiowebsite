import Head from 'next/head'
import Layout from "../../components/layout";


import { getHome, getHomePagesSlugs, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"


export default function Index({ preview, data, footerData }) {

  console.log(data)

  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>
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