import { useEffect, useState } from "react";
import Head from 'next/head'
import Layout from "../../../components/layout";
import styled from 'styled-components';

import Link from "../../../components/menu-link";

import Image from "../../../components/image"

import Map from "../../../components/map"

import Title from "../../../components/title"

import { getArtistsPage, getArtistsPageSlugs, getAllArtistPages, getMenu, getFooter } from "../../../lib/api";

import { SITE_NAME } from "../../../lib/constants"

const Container = styled.div`

  #background-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    top: 4.8vw;
    height: calc(100vh - 4.8vw);
    width: 65.65%;

    > div {
      padding: 0;
      height: 100%;
      opacity: 0;
      position: absolute;
    }

    > div > picture > img {
      object-fit: cover;
    }
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

`

const ContainerInner = styled.div`
  position:relative;
  overflow: hidden;
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
  top: 17.6vw;
  flex-basis: 18.8%;
  border-left: 1px solid black;
  background-color: white;
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





export default function Index({ preview, data, allArtistPagesData, footerData }) {
  let [currentIndex, setCurrentIndex] = useState(null);
  let [hasClicked, setHasClicked] = useState(false);


  useEffect(() => {
    let backgroundImages = document.querySelector("#background-image").children;

    Array.from(backgroundImages).forEach(item => {
      item.style.opacity = 0;
    });

    if(currentIndex === null) return;
    backgroundImages[currentIndex - 1].style.opacity = 1;

  }, [currentIndex])

  return (
    <Layout 
    preview={preview} name={data[0].node.title} content={data[0].node.content} 
    // footerData={footerData}
    >
      <Head>
        <title>{SITE_NAME} | {data[0].node.title}</title>
      </Head>

      <Container>
      <div id="background-image">
        {
          allArtistPagesData.map((item, index) => <Image key={index} src={item.node.images[0].image} />)
        }
      </div>
      <div id="shadow-circle"></div>
      <ContainerInner id="map-container">
        <Title>{data[0].node.title}</Title>
        <InnerContainer>
          <InnerContainerLeft>
            <Map 
            setCurrentIndex={(index) => setCurrentIndex(index)}
            currentIndex={currentIndex}
            data={allArtistPagesData}
            hasClicked={hasClicked}
            key="artists"
            // hasClicked={(value) => setHasClicked(value)}
            />
          </InnerContainerLeft>
          <InnerContainerRight>
            {allArtistPagesData.map((item, index) => {
              return <ListItem 
              key={index} className={index + 1 === parseInt(currentIndex) ? "is-active orange-hover" : "orange-hover"}
              onMouseEnter={() => setCurrentIndex(index + 1)}
              onMouseLeave={() => setCurrentIndex(null)}
              onClick={() => setHasClicked(true)}
              >
                <Link href={`${item.node._meta.uid}`}>
                  <span>{item.node.number}. {item.node.name}</span>
                </Link>
                </ListItem>
            })}
          </InnerContainerRight>
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

  const allArtistPagesData = await getAllArtistPages(params.lang, previewData);


  // Get Menu And Footer

  const menuData = await getMenu(params.lang);

  // const footerData = await getFooter(lang);

  const footerData = null;

  return {
    props: { preview, data, allArtistPagesData, menuData, footerData },
  };
}