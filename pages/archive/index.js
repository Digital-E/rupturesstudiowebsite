import { useEffect, useState } from "react"
import Head from 'next/head'
import styled from 'styled-components'
import Layout from "../../components/layout"
import { getMenu, getArchive, getAllProjects } from "../../lib/api"
import Plyr from "plyr"

import Images from "../../components/about/images"
import List from '../../components/archive/list'

import { SITE_NAME } from "../../lib/constants"

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 33px);
    padding: 120px 0 0 0;

    @media(max-width: 989px) {
        padding: 70px 0 0 0;
    }

`


export default function Index({ preview, data, allProjects, menuData, footerData }) {
    let [tagHoveredIndex, setTagHoveredIndex] = useState(null);

    return (
        <Layout 
        preview={preview} 
        name={data[0].node.title} content={data[0].node.content} 
        footerData={footerData}
        >
            <Head>
                <title>
                    {data[0].node.title} | {SITE_NAME} 
                </title>
            </Head>
            <Images data={allProjects} index={tagHoveredIndex} />
            <Container>
                <List data={allProjects} setTagHoveredIndex={(index) => setTagHoveredIndex(index)} tagHoveredIndex={tagHoveredIndex} />
            </Container>
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getArchive(previewData);

    const allProjects = await getAllProjects(previewData);

    return {
        props: { preview, data, allProjects, menuData }, // will be passed to the page component as props
    }
}