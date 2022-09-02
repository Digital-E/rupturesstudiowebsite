import { useEffect, useState } from "react"
import router, { useRouter } from "next/router"
import Head from 'next/head'
import Layout from "../../components/layout"
import { getMenu, getHome, getAllProjects } from "../../lib/api"
import Plyr from "plyr"

import { SITE_NAME } from "../../lib/constants"

import RichText from '../../components/rich-text'
import Carousel from "../../components/archive/carousel"

import Filter from "../../components/archive/filter"


let tags = [
    {
        label: "All",
        count: ""
    },
    {
        label: "Image",
        count: 14
    },
    {
        label: "Video",
        count: 3
    },
    {
        label: "Typography",
        count: 40
    },
]

export default function Index({ preview, data, allProjects, menuData, footerData }) {
    let players = null;
    let [selectedTagIndex, setSelectedTagIndex] = useState(0);

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
        // name={data[0].node.title} content={data[0].node.content} 
        name={"Index"} content={"Index"} 
        // footerData={footerData}
        >
            <Head>
                <title>
                    {/* {data[0].node.title} | {SITE_NAME}  */}
                    Index | {SITE_NAME} 
                </title>
            </Head>
            <Filter tags={tags} selectedTagIndex={selectedTagIndex} setSelectedTagIndex={(i) => setSelectedTagIndex(i)}/>
            <Carousel data={allProjects} selectedTag={tags[selectedTagIndex]}/>
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getHome(previewData);

    const allProjects = await getAllProjects(previewData);

    return {
        props: { data, allProjects, menuData }, // will be passed to the page component as props
    }
}