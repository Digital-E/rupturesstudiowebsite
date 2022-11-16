import { useEffect, useState } from 'react';
import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';
import Plyr from "plyr"; 
import Link from "../../components/menu-link";

import Tag from "../../components/tags/tag"


import { getProjectPage, getProjectPageSlugs, getAllProjects, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

import Hero from "../../components/project-slices/hero"

import Slices from "../../components/project-slices/index"

import Carousel from "../../components/project-slices/carousel"


const Container = styled.div`
  overflow: hidden;
`
const Back = styled.div`
  position: fixed;
  top: 15px;
  left: 70px;
  z-index: 1;
  cursor: pointer;

  :hover > a > div {
    background: black;
    color: white;
  }
`


export default function Index({ preview, data, allArtistPagesDataPaginate, allProjects, footerData }) {

let players = null;

data = data[0]?.node

let [linkURL, setLinkURL] = useState('/')

//   let currArtistIndex = 0;

//   let nextPrevArtists = {
//     next: "",
//     prev: ""
//   }

//   if(data === undefined) return null


//   allArtistPagesDataPaginate.forEach((item, index) => {
//     if(item.node._meta.uid === data[0].node._meta.uid) {
//       currArtistIndex = index

//       if(currArtistIndex === allArtistPagesDataPaginate.length - 1) {
//         nextPrevArtists.next = allArtistPagesDataPaginate[0].node._meta.uid
//         nextPrevArtists.prev = allArtistPagesDataPaginate[index - 1].node._meta.uid
//       } else if(currArtistIndex === 0) {
//         nextPrevArtists.next = allArtistPagesDataPaginate[index + 1].node._meta.uid
//         nextPrevArtists.prev = allArtistPagesDataPaginate[allArtistPagesDataPaginate.length - 1].node._meta.uid
//       } else {
//         nextPrevArtists.next = allArtistPagesDataPaginate[index + 1].node._meta.uid
//         nextPrevArtists.prev = allArtistPagesDataPaginate[index - 1].node._meta.uid
//       }
//     }
//   })


  useEffect(() => {

    setTimeout(() => {
      players = Plyr.setup('#player', {
        autoplay: true,
        muted: true,
        controls: ['play', 'progress', 'mute', 'fullscreen'
        // , 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
      ]
      });

      players?.forEach(item => {
          item.muted = true;
          item.on('ready', (event) => {
              event.currentTarget.classList.add("show-video")
          })
      })
    }, 100)

    let backLink = window.sessionStorage.getItem("ruptures-history")
    
    if(backLink.split(",").length === 1) {
      setLinkURL('/')
    } else {
      backLink = backLink.split(",")
      setLinkURL(backLink[backLink.length - 2])
    }


    return () => {
        players?.forEach(item => item.destroy())
    }
},[])

  return (
    <Layout 
    preview={preview} name={data.title} content={data.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{data.title} | {SITE_NAME}</title>
      </Head>
      <Container>
        <Back>
          <Link href={linkURL}>
            <Tag>
              <span>Back</span>
            </Tag> 
          </Link>       
        </Back>
        <Hero data={data} />
        <Slices data={data} />
        <Carousel data={allProjects.edges} projectPage={true}/>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let slugs = await getProjectPageSlugs();

  let paths = slugs.map((item) => ({
    params: {
      uid: item.node._meta.uid
    }
  }))
  
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params, preview = false, previewData }) {


  const data = await getProjectPage(`${params.uid}`, previewData);

  let dataAll = null;

//   let dataAll = await getAllArtistPages(params.lang, previewData);

let allProjectPagesDataPaginate = [];

//   allArtistPagesDataPaginate.push(...dataAll.edges);

//   // Paginate if returning over 20 results

//   while(dataAll.pageInfo.hasNextPage === true) {
//     let after = dataAll.pageInfo.endCursor;
//     let data = await getAllArtistPagesPaginate(params.lang, after);
//     dataAll = data;
//     allArtistPagesDataPaginate.push(...data.edges)
//   }

const allProjects = await getAllProjects(previewData);
  

  // Get Menu And Footer

  const menuData = await getMenu();

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, allProjectPagesDataPaginate, allProjects, menuData, footerData },
  };
}