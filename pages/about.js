import { useEffect, useState } from "react"
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
    height: 100vh;
    padding: 150px 0;

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
`
const ColOne = styled.div`
    position: relative;
    flex-basis: 70%;
    padding: 20px;
    z-index: 1;
`

const ColTwo = styled.div`
    flex-basis: 30%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-right: 20px;
`
const Tags = styled.div`
    display: flex;
    margin: 7px 0 20px 0;

    :nth-child(5) {
        margin: 7px 0 80px 0;
    }

    // > div {

    // }

    > div > div {
        // transition: color 0.3s, background 0.3s;
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
    width: 80%;

    svg {
        height: 100%;
        width: 100%;
    }
`


export default function Index({ preview, data, clientData, menuData, footerData }) {

    let [tagHoveredIndex, setTagHoveredIndex] = useState(null);

    let indexOfStar = [];


    useEffect(() => {
        // let splitHTML = document.querySelector(".about-col-one").innerHTML.split("")
        //     splitHTML.forEach((item, index) => {
        //             if(item === "*") indexOfStar.push(index)
        //     })

        //     indexOfStar.forEach((item, index) => {
        //         splitHTML.splice(item, 1, "<span class='ruptures-logo'></span>")
        //     })
        

        //     document.querySelector(".about-col-one").innerHTML = splitHTML.join("");

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
            <Container>
                <ColOne className="about-col-one">
                    <RichText render={data[0].node.information} />
                    <div>{data[0].node.tags_one_title}</div>
                    <Tags>
                        {data[0].node.tags_one.map((item, index) => <div onMouseEnter={() => setTagHoveredIndex(index)} 
                        onMouseLeave={() => setTagHoveredIndex(null)}
                        ><Tag>{item.tag}</Tag></div>)}
                        <Tag>...</Tag>
                    </Tags>
                    <div>{data[0].node.tags_two_title}</div>
                    <Tags>
                        {data[0].node.tags_two.map(item => <Tag>{item.tag}</Tag>)}
                        <Tag>...</Tag>
                    </Tags>
                    <RichText render={data[0].node.information_two} />
                </ColOne>
                <ColTwo>
                    {/* <Logo>
                        <svg viewBox="0 0 35 35" fill="none"><path d="M18.4542 18.4183L21.0743 20.3172L18.5057 18.2108L24.2617 20.8257L18.743 18.024L21.8273 18.9164L19.2897 17.9618L35 17.4948L19.2897 17.0382L21.8273 16.0836L18.743 16.976L24.2617 14.1743L18.5057 16.7892L21.0743 14.6828L18.4542 16.5817L26.1701 7.689L18.0519 16.5609L19.8777 13.2923L17.8146 16.426L20.0015 9.74355L18.0312 15.2016L18.4129 12.6282L17.763 15.2224L17.5052 0.155648V0L17.4948 0.0726356V0V0.155648L17.237 15.2224L16.5871 12.6282L16.9688 15.2016L14.9985 9.74355L17.1854 16.426L15.1223 13.2923L16.9481 16.5609L8.82994 7.689L16.5458 16.5817L13.9154 14.6828L16.4943 16.7892L10.728 14.1743L16.257 16.976L13.1727 16.0836L15.7103 17.0382L0 17.4948L15.7103 17.9618L13.1727 18.9164L16.257 18.024L10.728 20.8257L16.4943 18.2108L13.9154 20.3172L16.5458 18.4183L8.82994 27.311L16.9481 18.4391L15.1223 21.7077L17.1854 18.574L14.9985 25.2564L16.9688 19.788L16.5871 22.3718L17.237 19.788L17.4948 34.8444V35V34.9274L17.5052 35V34.8444L17.763 19.788L18.4129 22.3718L18.0312 19.788L20.0015 25.2564L17.8146 18.574L19.8777 21.7077L18.0519 18.4391L26.1701 27.311L18.4542 18.4183Z" fill="black"></path></svg>
                    </Logo> */}
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
                    console.log(item.client._meta.id)
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
        props: { data, clientData, menuData } // will be passed to the page component as props
    }
}