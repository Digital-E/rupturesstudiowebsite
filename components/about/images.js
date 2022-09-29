import { useEffect, useRef, useState } from 'react'
import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    img {
        position: absolute;
        width: 200px;
        transition: opacity 0.3s;
    }

    .hide-image {
        opacity: 0;
        transition: opacity 0.3s;
    }

    @media(max-width: 989px) {
        img {
            width: 100px;
        }
    }
`
let interval = null;

let prevIndex = 0;

let timeout = null;

const Component = ({ data, index }) => {
    let containerRef = useRef();

    let margin = 10;


    let randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    let checkForCollision = (currImage, compareImage) => {
        if (
            currImage.x1 > compareImage.x2 ||
            currImage.x2 < compareImage.x1 ||
            currImage.y1 > compareImage.y2 ||
            currImage.y2 < compareImage.y1
        ) {
            return false
        }
        return true
    }

    let newCoordinates = (data, indexOfImage) => {

        let allImages = Array.from(containerRef.current.children)

        let x = 0;
        let y = 0;

        if(indexOfImage === 0) {
            let height = data.getBoundingClientRect().height;
            let width = data.getBoundingClientRect().width;
            x = randomIntFromInterval(0, window.innerWidth - width);
            y = randomIntFromInterval(0, window.innerHeight - height);

            return {x, y}
        }
        

        while(true) {
            let height = data?.getBoundingClientRect().height;
            let width = data?.getBoundingClientRect().width;
            x = randomIntFromInterval(0, window.innerWidth - width);
            y = randomIntFromInterval(0, window.innerHeight - height);
            let isColliding = 0;

            let currImage = {
                x1: x,
                x2: x + width,
                y1: y,
                y2: y + height
            }

            // for(let i = 0; i < indexOfImage; i++) {

            //     let item = containerRef.current.children[i]

            //     let compareImage = {
            //         x1: item.getBoundingClientRect().x,
            //         x2: item.getBoundingClientRect().x + item.getBoundingClientRect().width,
            //         y1: item.getBoundingClientRect().y,
            //         y2: item.getBoundingClientRect().y + item.getBoundingClientRect().height
            //     }

            //     if(checkForCollision(currImage, compareImage)) {
            //         isColliding += 1;
            //     }

            // }


            allImages.forEach((item, index) => {

                let compareImage = {
                    x1: item.getBoundingClientRect().x,
                    x2: item.getBoundingClientRect().x + item.getBoundingClientRect().width,
                    y1: item.getBoundingClientRect().y,
                    y2: item.getBoundingClientRect().y + item.getBoundingClientRect().height
                }


                if(checkForCollision(currImage, compareImage)) {
                    isColliding += 1;
                }
                
            })



            if(isColliding === 0) {
                break;
            }

        }

        return {x, y}

    }

    let createImages = (data, index) => {
        if(index === null || data === undefined) return
        let indexOfImage = 0;
        let revealRound = true;

        // Create Images

        data.node.slices[0].variation.items.forEach((item, index) => {
            let img = document.createElement('img')
            img.src = item.image.url
            img.classList.add('hide-image')
    
            containerRef.current.appendChild(img)
        })


        let coordinates = newCoordinates(containerRef.current.children[indexOfImage], indexOfImage);

        if(coordinates === undefined) return;

        containerRef.current.children[indexOfImage].style.left = `${coordinates.x}px`;
        containerRef.current.children[indexOfImage].style.top = `${coordinates.y}px`;

        containerRef.current.children[indexOfImage].classList.remove('hide-image');
        
        indexOfImage += 1;

        interval = setInterval(() => {
            if(revealRound) {
                let coordinates = newCoordinates(containerRef.current.children[indexOfImage], indexOfImage);

                if(coordinates === undefined ||  containerRef.current.children[indexOfImage] === undefined) return;

                containerRef.current.children[indexOfImage].style.left = `${coordinates.x}px`;
                containerRef.current.children[indexOfImage].style.top = `${coordinates.y}px`;

                containerRef.current.children[indexOfImage].classList.remove('hide-image')
                indexOfImage += 1;
                if(indexOfImage === data.node.slices[0].variation.items.length) {
                    indexOfImage = 0;
                    revealRound = false;
                }
            } 
            // else {
            //     containerRef.current.children[indexOfImage].classList.add('hide-image')
            //     indexOfImage += 1;
            //     if(indexOfImage === data.node.slices[0].variation.items.length) {
            //         indexOfImage = 0;
            //         revealRound = true;
            //     }
            // }
        }, 250)

    }

    let clearAll = (timeout) => {
        clearInterval(interval)
        Array.from(containerRef.current.children).forEach(item => {
            item.classList.add('hide-image')
        })

        if(timeout) {
            timeout = setTimeout(() => {
                containerRef.current.innerHTML = ""
            }, 300)
        } else {
            containerRef.current.innerHTML = ""
        }
    }


    useEffect(() => {
        clearTimeout(timeout)

        if(index === null) {
            clearAll(true);
            return
        }

        if(data[0][index]) {
            if(index !== prevIndex) {
                clearAll(true);
                timeout = setTimeout(() => {
                    createImages(data[0][index][0], index);
                }, 350)
            } else {
                createImages(data[0][index][0], index);
            }
            
            prevIndex = index;
        }
        
    }, [index])

    return (
        <Container ref={containerRef}></Container>
    )
}

export default Component