import { useEffect } from "react"
import router, { useRouter } from "next/router"
import Head from 'next/head'
import styled from "styled-components"
import Layout from "../components/layout"
import { getMenu, getHome, getProject } from "../lib/api"
import { SITE_NAME } from "../lib/constants"
import Plyr from "plyr"

import LogoAppear from "../components/logo-appear"

import Carousel from "../components/home/carousel"

const Container = styled.div`
    position: relative;
    margin: 120px 0 0 0;

    @media(max-width: 989px) {
        margin: 70px 0 0 0;
    }
`




export default function Index({ preview, data, allProjects, menuData, footerData }) {
    let players = null;

    useEffect(() => {

        players = Plyr.setup('#player', {
            autoplay: true,
            muted: true,
            controls: ['play', 'progress', 'mute'
            // , 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
        ]
        });

        players?.forEach(item => {
            item.muted = true;
        })

        return () => {
            players?.forEach(item => item.destroy())
        }
    },[])

    return (
        <Layout 
        preview={preview} 
        name={data[0].node.title} content={data[0].node.content} 
        // footerData={footerData}
        >
            <Head>
                <title>
                    {SITE_NAME}
                </title>
            </Head>
            <Container>
                {allProjects[0]?.map(item => <Carousel data={item[0]?.node} />)}
            </Container>
            <LogoAppear />
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getHome(previewData);

    // const allProjects = await getAllProjects(previewData);

    // Fetch All Projects

    const allProjects = [];

    let fetchAll = [];

    data[0].node.featured.forEach(item => {
        console.log(item)
        if(item !== null) {
            let getProjectPromise = new Promise((resolve, reject) => {
                    let getClientResult = getProject(item.project._meta.id, previewData)
                    resolve(getClientResult);
            });

            fetchAll.push(getProjectPromise)
        }
    })

    let resolveAll = await Promise.all(fetchAll).then((values) => {
        allProjects.push(values)
    });    

    return {
        props: { data, allProjects, menuData } // will be passed to the page component as props
    }
}