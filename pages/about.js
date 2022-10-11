import { useEffect, useState, useRef } from "react"
import router, { useRouter } from "next/router"
import Head from 'next/head'
import styled from "styled-components"
import Layout from "../components/layout"
import { getMenu, getAbout, getAllProjects, getClient } from "../lib/api"
import { SITE_NAME } from "../lib/constants"

import Tag from "../components/tags/tag"

import Images from "../components/about/images"

import RichText from '../components/rich-text'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    min-height: 100vh;
    padding: 120px 0;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.3s;

    .ruptures-logo {
        position: relative;
        display: inline-block;
        height: 15px;
        width: 15px;
        top: 2px;
    }

    .ruptures-logo:after {
        content: url("images/logo.svg");
        height: 100%;
        width: 100%;
        position: relative;
    }

    .hide-on-hover {
        opacity: 1;
        transition: opacity 1.5s;
    }

    &&.hovering-tag .hide-on-hover {
        opacity: 0;
        transition: opacity 0.5s;
    }

    @media(max-width: 989px) {
        flex-direction: column;
        padding: 70px 0;
    }

`
const ColOne = styled.div`
    position: relative;
    flex-basis: 70%;
    padding: 15px;
    z-index: 1;

    @media(max-width: 989px) {
        flex-basis: 100%;
    }

    > div:nth-child(2) {
        margin: 0 0 50px 0;
    }
`

const ColTwo = styled.div`
    flex-basis: 30%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-right: 20px;

    @media(max-width: 989px) {
        flex-basis: 0;
    }
`
const Tags = styled.div`
    display: flex;
    margin: 2px 0 15px 0;
    flex-wrap: wrap;

    :nth-child(6) {
        margin: 0 0 80px 0;
    }

    > div {
        margin-top: 5px;
    }

    > div > div {
        cursor: pointer;
    }

    > div > div:hover {
        background: black;
        color: white;
        transition: color 0s, background 0s;
    }
`

const Logo = styled.div`
    // position: fixed;
    // width: 50vw;
    // // bottom: -50%;
    // bottom: calc(-0.5 * 50vw);
    // left: 50%;
    // transform: translateX(-50%);
    // z-index: 0;
    width: 220px;
    margin-bottom: 50px;

    svg {
        height: 100%;
        width: 100%;
    }

    @media(max-width: 989px) {
        width: 180px;
    }
`


export default function Index({ preview, data, clientData, menuData, footerData }) {

    let [tagHoveredIndex, setTagHoveredIndex] = useState(null);

    let containerRef = useRef();

    let indexOfStar = [];


    useEffect(() => {
        let splitHTML = document.querySelector(".about-text").innerHTML.split("")

        splitHTML.forEach((item, index) => {
                if(item === "*") indexOfStar.push(index)
        })

        indexOfStar.forEach((item, index) => {
            splitHTML.splice(item, 1, "<span class='ruptures-logo'></span>")
        })
        

        document.querySelector(".about-text").innerHTML = splitHTML.join("");
        
        
        containerRef.current.style.opacity = 1;

    }, []);

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
            <Container className={tagHoveredIndex !== null ? "hovering-tag" : ""} ref={containerRef}>
                <ColOne>
                    <Logo className="hide-on-hover">
                        <svg viewBox="0 0 113.39 113.39"><polygon points="59.71 59.58 68 65.52 59.86 58.93 78.06 67.15 60.63 58.35 70.36 61.14 62.34 58.13 111.95 56.69 62.34 55.26 70.36 52.25 60.63 55.04 78.06 46.24 59.86 54.46 68 47.86 59.71 53.81 84.07 25.89 58.45 53.75 64.2 43.48 57.67 53.32 64.6 32.34 58.37 49.49 59.59 41.41 57.53 49.53 56.7 2.24 56.7 1.76 56.69 2 56.69 1.76 56.69 2.24 55.86 49.53 53.8 41.41 55.02 49.49 48.78 32.34 55.72 53.32 49.19 43.48 54.94 53.75 29.32 25.89 53.68 53.81 45.39 47.86 53.52 54.46 35.32 46.24 52.76 55.04 43.03 52.25 51.05 55.26 1.43 56.69 51.05 58.13 43.03 61.14 52.76 58.35 35.32 67.15 53.52 58.93 45.39 65.52 53.68 59.58 29.32 87.5 54.94 59.63 49.19 69.91 55.72 60.07 48.78 81.04 55.02 63.89 53.8 71.97 55.86 63.86 56.69 111.15 56.69 111.63 56.69 111.39 56.7 111.63 56.7 111.15 57.53 63.86 59.59 71.97 58.37 63.89 64.6 81.04 57.67 60.07 64.2 69.91 58.45 59.63 84.07 87.5 59.71 59.58"/></svg>
                    </Logo>
                    <div className="hide-on-hover about-text">
                        <RichText render={data[0].node.information} />
                    </div>
                    <div className="hide-on-hover">{data[0].node.tags_one_title}</div>
                    <Tags>
                        {data[0].node.tags_one.map((item, index) => <div onMouseEnter={() => setTagHoveredIndex(index)} 
                        onMouseLeave={() => setTagHoveredIndex(null)}
                        ><Tag>{item.tag}</Tag></div>)}
                        <Tag>...</Tag>
                    </Tags>
                    <div className="hide-on-hover">{data[0].node.tags_two_title}</div>
                    <Tags className="hide-on-hover">
                        {data[0].node.tags_two.map(item => <Tag>{item.tag}</Tag>)}
                        <Tag>...</Tag>
                    </Tags>
                    <div className="hide-on-hover">
                        <RichText render={data[0].node.information_two} />
                    </div>
                </ColOne>
                <ColTwo>
                </ColTwo>
            </Container>
            <Images data={clientData} index={tagHoveredIndex} />
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getAbout(previewData);


    // Fetch All Clients

    const clientData = [];

    let fetchAll = [];

    data[0].node.tags_one.forEach(item => {
        if(item.client !== null) {
            let getClientPromise = new Promise((resolve, reject) => {
                    let getClientResult = getClient(item.client._meta.id, previewData)
                    resolve(getClientResult);
            });

            fetchAll.push(getClientPromise)
        }
    })

    let resolveAll = await Promise.all(fetchAll).then((values) => {
        clientData.push(values)
    });

    return {
        props: { preview, data, clientData, menuData } // will be passed to the page component as props
    }
}