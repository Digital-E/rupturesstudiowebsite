import { useEffect, useState } from "react"
import Head from 'next/head'
import styled from 'styled-components'
import Layout from "../../components/layout"
import { getMenu, getArchive, getAllProjects, getAllProjectsPaginate } from "../../lib/api"

import sanitizeTag from "../../lib/sanitizeTag"

import Images from "../../components/about/images"
import List from '../../components/archive/list'
import Filter from '../../components/archive/filter'


import { SITE_NAME } from "../../lib/constants"

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 43px);
    padding: 120px 0 0 0;

    @media(max-width: 989px) {
        padding: 70px 0 0 0;
    }

`

const Logo = styled.div`
    position: fixed;
    bottom: -250px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    margin: 10px;

    svg {
        width: 100%;
        height: 100%;
    }
`


export default function Index({ preview, data, allProjects, menuData, footerData }) {
    let [tagHoveredIndex, setTagHoveredIndex] = useState(null);

    let [selectedTagIndex, setSelectedTagIndex] = useState(0);

    let [allProjectsOrdered, setAllProjectsOrdered] = useState(allProjects)

    let [allProjectsInit, setAllProjectsInit] = useState(allProjects)

    let tags = data[0].node.tags

    useEffect(() => {

        if(sanitizeTag(tags[selectedTagIndex].tag) === "all") {
            document.querySelectorAll(".archive-row").forEach(item => {
                item.classList.remove("hide-row")
            })

            return
        }

        document.querySelectorAll(".archive-row").forEach(item => {
            let containsTag = false

            if(item.classList.contains(sanitizeTag(tags[selectedTagIndex].tag))) {
                containsTag = true
            } else {
                containsTag = false
            }

            if(containsTag) {
                item.classList.remove("hide-row")
            } else {
                item.classList.add("hide-row")
            }
        })


    }, [selectedTagIndex])

    useEffect(() => {

        // Get Tag
        let selectedTag = window.sessionStorage.getItem('selectedtag')

        if(selectedTag !== null) {
            
            tags.forEach((item, index) => {
                if(sanitizeTag(item.tag) === sanitizeTag(selectedTag)) {
                    setSelectedTagIndex(index)
                }
            })

            window.sessionStorage.removeItem('selectedtag')
        }

        let allYears = [];

        let currentYear = allProjects[0].node.year

        let newYear = [];

        allProjects.forEach((item, index) => {
            if(item.node.year !== currentYear) {
                allYears.push(newYear)
                newYear = []
                currentYear = item.node.year
                newYear.push(item)
            } else {
                newYear.push(item) 
            }

            if(index === allProjects.length - 1) {
                allYears.push(newYear)
            }

        })


        allYears.map(item => item.sort((a, b) => a.node.title.localeCompare(b.node.title)))

        let orderedArray = [];

        allYears.forEach(item => {
            item.forEach(item => orderedArray.push(item))
        })


       setAllProjectsInit(orderedArray)

       setAllProjectsOrdered(orderedArray)


       // Count tags

       tags = tags.map(itemOne => {
        let newItem = itemOne;

        newItem.count = 0;

        allProjects.forEach(itemTwo => {
            itemTwo.node.tags.forEach(itemThree => {
                if(sanitizeTag(itemThree.tag) === sanitizeTag(itemOne.tag)) {
                    newItem.count += 1;
                }
            })
        })

        return newItem
       })

    }, []);

    let setSelectedTag = (val) => {

        tags.forEach((item, index) => {
            if(val === item.tag) {
                setSelectedTagIndex(index)
            }
        })

    }


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
            <Images data={allProjectsOrdered} index={tagHoveredIndex} />
            <Container>
                <Filter tags={tags} selectedTagIndex={selectedTagIndex} setSelectedTagIndex={(i) => setSelectedTagIndex(i)}/>
                <List data={allProjectsOrdered} setTagHoveredIndex={(index) => setTagHoveredIndex(index)} tagHoveredIndex={tagHoveredIndex}  setSelectedTag={val => setSelectedTag(val)} />
            </Container>
        </Layout>
    )
  }

export async function getStaticProps({ params, preview = false, previewData }) {
    // Get Menu And Footer

    const menuData = await getMenu(); 

    const data = await getArchive(previewData);

    let allProjects = await getAllProjects(previewData);

    let allProjectsPaginate = [];

    allProjectsPaginate.push(...allProjects.edges);

    // Paginate if returning over 20 results

    while(allProjects.pageInfo.hasNextPage === true) {
        let after = allProjects.pageInfo.endCursor;
        let data = await getAllProjectsPaginate(after);
        allProjects = data;
        allProjectsPaginate.push(...data.edges)
    }

    allProjects = allProjectsPaginate

    return {
        props: { preview, data, allProjects, menuData }, // will be passed to the page component as props
    }
}