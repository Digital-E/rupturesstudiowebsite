import { useEffect } from "react"
import router, { useRouter } from "next/router"
import Head from 'next/head'
import styled from "styled-components"
import Layout from "../components/layout"
import { getMenu, getHome, getAllProjects } from "../lib/api"
import { SITE_NAME } from "../lib/constants"

import RichText from '../components/rich-text'
import Carousel from "../components/home/carousel"

const Container = styled.div`
    margin-top: 150px;
`


export default function Index({ preview, data, allProjects, menuData, footerData }) {

    useEffect(() => {

    },[])

    return (
        <Layout 
        preview={preview} 
        name={data[0].node.title} content={data[0].node.content} 
        // footerData={footerData}
        >
            <Head>
                <title>
                    {SITE_NAME} | {data[0].node.title}
                </title>
            </Head>
            <Container>
                {allProjects.map(item => <Carousel data={item.node} />)}
            </Container>
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getHome(previewData);

    const allProjects = await getAllProjects(previewData);

    return {
        props: { data, allProjects, menuData } // will be passed to the page component as props
    }
}