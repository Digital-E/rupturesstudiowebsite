import { useEffect } from "react"
import router, { useRouter } from "next/router"
import Head from 'next/head'
import Layout from "../../components/layout"
import { getMenu, getHome } from "../../lib/api"

import { SITE_NAME } from "../../lib/constants"

import RichText from '../../components/rich-text'
import Carousel from "../../components/archive/carousel"

import Plyr from 'plyr';

import Filter from "../../components/archive/filter"

export default function Index({ preview, data, menuData, footerData }) {

    useEffect(() => {
        const players = Plyr.setup('.player');
    },[])

    return (
        <Layout 
        preview={preview} 
        name={data[0].node.title} content={data[0].node.content} 
        // footerData={footerData}
        >
            <Head>
                <title>
                    {data[0].node.title} | {SITE_NAME} 
                </title>
            </Head>
            <Filter />
            <Carousel />
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getHome(previewData);

    return {
        props: { data, menuData }, // will be passed to the page component as props
    }
}