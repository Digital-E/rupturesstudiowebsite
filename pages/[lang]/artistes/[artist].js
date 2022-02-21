import Head from 'next/head'
import Layout from "../../../components/layout";
import styled from 'styled-components';


import { getArtistPage, getArtistPageSlugs, getAllArtistPages, getAllArtistPagesPaginate, getMenu, getFooter } from "../../../lib/api";

import { SITE_NAME } from "../../../lib/constants"

import Carousel from "../../../components/artist-slices/carousel"

import ColRight from "../../../components/artist-slices/column-right"

import PodcastModal from "../../../components/artist-slices/podcast-modal"

const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 4.8vw;
    height: calc(100vh - 4.8vw);
    width: 100vw;
    overflow: hidden;
    background: white;
    

    > div:nth-child(1) {
        flex-basis: 65.65%;
    }

    > div:nth-child(2) {
        flex-basis: 34.35%;
    }

    @media(max-width: 989px) {
      position: relative;
      flex-direction: column;
      top: 53px;

      > div:nth-child(1) {
        flex-basis: auto;
      }

      > div:nth-child(2) {
        flex-basis: auto;
      }

      height: 100%;
    }
`




export default function Index({ preview, data, allArtistPagesDataPaginate, footerData }) {

  let currArtistIndex = 0;

  let nextPrevArtists = {
    next: "",
    prev: ""
  }

  if(data === undefined) return null


  allArtistPagesDataPaginate.forEach((item, index) => {
    if(item.node._meta.uid === data[0].node._meta.uid) {
      currArtistIndex = index

      if(currArtistIndex === allArtistPagesDataPaginate.length - 1) {
        nextPrevArtists.next = allArtistPagesDataPaginate[0].node._meta.uid
        nextPrevArtists.prev = allArtistPagesDataPaginate[index - 1].node._meta.uid
      } else if(currArtistIndex === 0) {
        nextPrevArtists.next = allArtistPagesDataPaginate[index + 1].node._meta.uid
        nextPrevArtists.prev = allArtistPagesDataPaginate[allArtistPagesDataPaginate.length - 1].node._meta.uid
      } else {
        nextPrevArtists.next = allArtistPagesDataPaginate[index + 1].node._meta.uid
        nextPrevArtists.prev = allArtistPagesDataPaginate[index - 1].node._meta.uid
      }
    }
  })

  return (
    <Layout 
    preview={preview} name={data[0].node.name} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.name}</title>
      </Head>
      <PodcastModal data={data[0].node}/>
      <Container>
          <Carousel key={`carousel-${data[0].node._meta.uid}`} data={data[0].node.images} />
          <ColRight key={`colright-${data[0].node._meta.uid}`} data={data[0].node} nextPrevArtists={nextPrevArtists}/>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getArtistPageSlugs();

  // let paths = lang.map((item) => ({
  //   params: {
  //     artist: item.node._meta.uid,
  //     lang: item.node._meta.lang
  //   }
  // }))

  let paths = lang.map((item => {

    if(item.node._meta.uid.split("__").length === 2) {
        return { 
            params: { 
                artist: item.node._meta.uid.split("__")[1], 
                lang: item.node._meta.lang 
            }
        }
    }

    return {
        params: { 
            artist: item.node._meta.uid, 
            lang: item.node._meta.lang
        }
    }

  })) 
  

  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps({ params, preview = false, previewData }) {


  const data = await getArtistPage(`artistes__${params.artist}`, params.lang, previewData);

  let dataAll = await getAllArtistPages(params.lang, previewData);

  let allArtistPagesDataPaginate = [];

  allArtistPagesDataPaginate.push(...dataAll.edges);

  // Paginate if returning over 20 results

  while(dataAll.pageInfo.hasNextPage === true) {
    let after = dataAll.pageInfo.endCursor;
    let data = await getAllArtistPagesPaginate(params.lang, after);
    dataAll = data;
    allArtistPagesDataPaginate.push(...data.edges)
  }
  

  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, allArtistPagesDataPaginate, menuData, footerData },
  };
}