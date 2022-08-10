import Head from 'next/head'
import Layout from "../../components/layout";
import styled from 'styled-components';


import { getProjectPage, getProjectPageSlugs, getMenu, getFooter } from "../../lib/api";

import { SITE_NAME } from "../../lib/constants"

// import Carousel from "../../../components/artist-slices/carousel"

import Hero from "../../components/project-slices/hero"

import Slices from "../../components/project-slices/index"


const Container = styled.div``




export default function Index({ preview, data, allArtistPagesDataPaginate, footerData }) {

data = data[0].node

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

  return (
    <Layout 
    preview={preview} name={data.title} content={data.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{data.title} | {SITE_NAME}</title>
      </Head>
      <Container>
        <Hero data={data} />
        <Slices data={data} />
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
    fallback: true
  }
}

export async function getStaticProps({ params, preview = false, previewData }) {


  const data = await getProjectPage(`${params.uid}`, params.lang, previewData);

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
  

  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, allProjectPagesDataPaginate, menuData, footerData },
  };
}