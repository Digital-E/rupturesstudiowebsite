import { useEffect, useState, useRef } from "react";
import Head from 'next/head'
import Layout from "../../../components/layout";
import styled from 'styled-components';

import Link from "../../../components/menu-link";

import Image from "../../../components/image"

import Map from "../../../components/map"

import HomeMap from "../../../components/home-map"

import Title from "../../../components/title"

import { getArtistsPage, getArtistsPageSlugs, getAllArtistPages, getAllArtistPagesPaginate, getMenu, getFooter } from "../../../lib/api";

import { SITE_NAME } from "../../../lib/constants"

const Container = styled.div`
  position: fixed;

  #background-image {
    position: absolute;
    top: 0;
    left: 0;
    // height: 100%;
    top: 4.8vw;
    // height: calc(100vh - 4.8vw);
    width: 65.65%;

    > div {
      // padding: 0;
      // height: 100%;
      // opacity: 0;
      position: absolute;
    }

    // > div > picture > img {
    //   object-fit: cover;
    // }
}

#shadow-circle {
  position: absolute;
  height: 40px;
  width: 40px;
  box-shadow: inset 0 1px 3px black;
  z-index: 999;
  border-radius: 999px !important;
  pointer-events: none;
  display: none;
}

#shadow-circle-home-map {
  position: absolute;
  height: 40px;
  width: 40px;
  box-shadow: inset 0 1px 3px black;
  z-index: 999;
  border-radius: 999px !important;
  pointer-events: none;
  display: none;
  background-color: white;
}

#text-circle-home-map {
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 200px;
  border-radius: 999px !important;
  pointer-events: none;
  opacity: 0;
  z-index: 999;
  transform: translate(-40%, -40%);
  padding: 20px;
}

`

const ContainerInner = styled.div`
  position:relative;
  overflow: hidden;
  background-color: white;
`


const InnerContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  z-index: 0;
  width: 100vw;
  height: 100vh;
`

const InnerContainerLeft = styled.div`
  flex-grow: 1;
`

const InnerContainerRight = styled.div`
  position: relative;
  top: 17.5vw;
  flex-basis: 18.8%;
  border-left: 1px solid black;
  background-color: white;
  height: calc(100vh - 17.5vw);
  overflow: scroll;

  @media(max-width: 989px) {
    top: 53px;
    flex-basis: 100%;
    border-left: none;
    height: 100%;
    padding-bottom: 53px;
  }
`

const ListItem = styled.div`
  border-bottom: 1px solid black;
  cursor: pointer;

  span {
    font-size: 20px;
    color: black;
    padding: 5px 10px;
    display: block;
    width: 100%;
    height: 100%;
  }

  a {
    pointer-events: none;
  }
`

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px 20px;
  font-size: 30px;
  display: none;

  @media(max-width: 989px) {
    display: block;
    padding: 5px 10px;
    font-size: 20px;
  }
`






export default function Index({ preview, data, allArtistPagesDataPaginate, footerData }) {
  let [currentIndex, setCurrentIndex] = useState(null);
  let [hasClicked, setHasClicked] = useState(false);
  let [isMobile, setIsMobile] = useState(true);
  let [isParcoursInteractif, setIsParcoursInteractif] = useState(false);

  let containerRef = useRef();

  useEffect(() => {
    if(hasClicked) return;
    
    let backgroundImages = document.querySelector("#background-image").children;

    Array.from(backgroundImages).forEach(item => {
      item.style.opacity = 0;
    });

    if(currentIndex === null) return;
    backgroundImages[currentIndex - 1].style.opacity = 1;

  }, [currentIndex])

  useEffect(() => {
    if(window.innerWidth > 989) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }

    if(window.location.hash === "#parcours-interactif") {
      setIsParcoursInteractif(true)
    } else {
      setIsParcoursInteractif(false)
    }
  })

  let handleSetCurrentIndex = (index) => {
    if(window.innerWidth > 989) {
      setCurrentIndex(index)
    }
  }


  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>

      <Container ref={containerRef}>
      <div id="background-image">
        {
          allArtistPagesDataPaginate.map((item, index) => <Image key={index} src={item.node.images[0].image} />)
        }
      </div>
      <div id="shadow-circle"></div>
      <ContainerInner id="map-container">
        <Title>{data[0].node.title}</Title>
        <InnerContainer>
          <InnerContainerLeft>
            {
              !isMobile ?
                <Map 
                setCurrentIndex={(index) => setCurrentIndex(index)}
                currentIndex={currentIndex}
                data={allArtistPagesDataPaginate}
                hasClicked={hasClicked}
                key="artists"
                // hasClicked={(value) => setHasClicked(value)}
                />
                :
                ( isMobile && isParcoursInteractif ) ?
                <HomeMap
                  setCurrentIndex={(index) => setCurrentIndex(index)}
                  currentIndex={currentIndex}
                  data={allArtistPagesDataPaginate}
                  hasClicked={hasClicked}
                  key="artists-mobile" 
                  containerRef={containerRef}
                />
                :
                null
            }
          </InnerContainerLeft>
          {
            ( !isParcoursInteractif || !isMobile ) ?
              <InnerContainerRight>
              {/* <Divider className="orange-background">{data[0].node.title}</Divider> */}
                {allArtistPagesDataPaginate.map((item, index) => {
                  return <ListItem 
                  key={index} className={index + 1 === parseInt(currentIndex) ? "is-active orange-hover" : "orange-hover"}
                  onMouseEnter={() => handleSetCurrentIndex(index + 1)}
                  onMouseLeave={() => handleSetCurrentIndex(null)}
                  onClick={() => setHasClicked(true)}
                  >
                    <Link href={`${item.node._meta.uid}`}>
                      <span>{item.node.number}. {item.node.name}</span>
                    </Link>
                    </ListItem>
                })}
            </InnerContainerRight>
            :
            null
          }
        </InnerContainer>
      </ContainerInner>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths({}) {

  let lang = await getArtistsPageSlugs();

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

  const data = await getArtistsPage(params.lang, previewData);

  let allArtistPagesData = await getAllArtistPages(params.lang);

  let allArtistPagesDataPaginate = [];

  allArtistPagesDataPaginate.push(...allArtistPagesData.edges);

  // Paginate if returning over 20 results

  while(allArtistPagesData.pageInfo.hasNextPage === true) {
    let after = allArtistPagesData.pageInfo.endCursor;
    let data = await getAllArtistPagesPaginate(params.lang, after);
    allArtistPagesData = data;
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