import { useEffect } from "react"
import router, { useRouter } from "next/router"
import Head from 'next/head'
import Layout from "../components/layout"
import { getMenu } from "../lib/api"

import { SITE_NAME } from "../lib/constants"

import RichText from '../components/rich-text'
import Carousel from "../components/carousel"

export default function Index({ preview, data, menuData, footerData }) {

    useEffect(() => {

    },[])

    return (
        <Layout 
        preview={preview} 
        // name={data[0].node.title} content={data[0].node.content} 
        // footerData={footerData}
        >
            <Head>
                <title>
                    {SITE_NAME} | 
                    {/* {data[0].node.title} */}
                </title>
            </Head>
            <Carousel />
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    return {
        props: { menuData }, // will be passed to the page component as props
    }
}