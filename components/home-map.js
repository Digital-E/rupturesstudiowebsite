import { useEffect, useRef } from "react"
import styled from "styled-components";

import { useRouter } from "next/router"

import { Loader } from '@googlemaps/js-api-loader';

import { gsap } from "gsap";

import Bowser from "bowser";



const Container = styled.div`
    height: 100%;
    width: 100%;

    // [title="marker"] {
    //     pointer-events: none;
    // }

    .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) {
        position: relative;
        filter: 
        grayscale(1) 
        contrast(2)
        // url(#svg-filter-orange)
        ;
    }

    // .gm-style > div:nth-child(2) > div:nth-child(2):after {
    //     content: "";
    //     position: fixed;
    //     z-index: 999;
    //     top: 0;
    //     left: 0;
    //     height: 100vh;
    //     width: 100vw;
    //     background-color: rgb(255, 148, 67, 0.5);
    // }

    // #circle {
    //     position: fixed;
    //     top: 50%;
    //     left: 50%;
    //     height: 40px;
    //     width: 40px;
    //     background-color: white;
    //     z-index: 999;
    //     border-radius: 999px !important;
    // }

    #map {    
        position: fixed !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition-duration: 0.3s;
    }

    #map > div {
        background-color: white !important;
    }

    .gm-style > div:nth-child(15) > div,
    .gm-style > div:nth-child(17)
     {
        display: none;
    }

    .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div {
        opacity: 0;
    }

    .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div.show {
        opacity: 1;
    }


    // .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(odd):not(:last-child):after {
    //     content: "";
    //     position: absolute;
    //     // left: -19px;
    //     // top: -19px;
    //     left: 0;
    //     top: 0;
    //     height: 38px;
    //     width: 38px;
    //     background-color: transparent;
    //     box-shadow: inset 1px 0px 3px black;
    //     border-radius: 999px;
    //   }

    .marker {
        height: 39px;
        width: 39px;
        line-height: 1.9;
    }
`


const Map = ({ data, currentIndex, setCurrentIndex, hasClicked }) => {
    let mapRef = useRef();

    let router = useRouter();
    

    let triggerTransparentCircle = (index, data) => {
        if(index === null) {
            removeTransparentCircle();
            return
        }

        // let x = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().x
        // let y = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().y

        // let shadowCircle = document.querySelector('#shadow-circle');

        // let mapDiv = document.querySelector('#map-container');

        console.log(data)

        let allMarkers = document.querySelector(".gm-style").children[1].children[0].children[3].children

        gsap.to(allMarkers[index * 2 - 2], {scale: 5, duration: 1})

        allMarkers[index * 2 - 1].children[0].children[0].children[0].innerText = data.name;



        // setCurrentIndex(index)

        // setTimeout(() => {
        //     shadowCircle.style.display = "block";
        //     shadowCircle.style.top =`${y}px`
        //     shadowCircle.style.left =`${x}px`

        //     mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`
        // }, 0)
    }

    let removeTransparentCircle = (index) => {

        if(document.querySelector(".gm-style")) {
            let allMarkers = document.querySelector(".gm-style").children[1].children[0].children[3].children
            gsap.to(allMarkers[index * 2 - 2], {scale: 1, duration: 1})
            allMarkers[index * 2 - 1].children[0].children[0].children[0].innerText = index;
        }

        // let mapDiv = document.querySelector('#map-container')
        // let shadowCircle = document.querySelector('#shadow-circle');

        // shadowCircle.style.display = "none";

        // setCurrentIndex(null)

        // mapDiv.style.WebkitMaskImage = ``
    }

    let triggerTransition = (index) => {
        let artistData = data[parseInt(index) - 1]

        let x = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().x
        let y = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().y

        let mapDiv = document.querySelector('#map-container')

        let shadowCircle = document.querySelector('#shadow-circle');

        mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`

        // Route to page

        let lang = artistData.node._meta.lang;

        let url = artistData.node._meta.uid.split("__");

        router.push(`/${lang}/${url[0]}/${url[1]}`)

        // Expand Circle
      
        let browser = Bowser.getParser(window.navigator.userAgent).parsedResult.browser.name

        if(window.innerWidth > 990 && browser !== "Safari") {
            gsap.to(mapDiv, {webkitMaskImage: `radial-gradient( 1500px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`, duration: 1 })

            shadowCircle.style.display = "none";
        }
    }

    useEffect(() => {
        triggerTransparentCircle(currentIndex)
    }, [currentIndex])

    useEffect(() => {
        if(hasClicked === true) {
            triggerTransition(currentIndex)
        }
    }, [hasClicked])
    

    useEffect(() => {

        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            version: 'weekly',
          });

          let map; 

          loader.load().then((google) => {

            initMap(google);

            data.forEach((item, index) => {
                addMarker({ lat: item.node.geo_point.latitude, lng: item.node.geo_point.longitude }, item, map, google);
            })

            let bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-84.999999, -179.999999),
                new google.maps.LatLng(84.999999, 179.999999));
            
            new google.maps.Rectangle({
                bounds: bounds,
                fillColor: "#ff9443",
                fillOpacity: 0.8,
                strokeWeight: 0,
                map: map
            });

            setTimeout(() => {
                mapRef.current.style.opacity = 1
            }, 1500)
          })


        let initMap = (google) => {
          map = new google.maps.Map(mapRef.current, {
            center: { lat: 46.2050242, lng: 6.1090692 },
            zoom: 15,
            mapTypeId: 'satellite',
            mapTypeControl: false,
            disableDefaultUI: true,
            styles: [{
                stylers: [{
                  saturation: -100
                }]
              }]
          });

          map.setTilt(0);
        }

          

        // Adds a marker to the map.
        function addMarker(location, data, map, google) {
            let marker = new google.maps.Marker({
                position: location,
                icon: {
                    path: "M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0",
                    fillColor: "white",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    rotation: 0,
                    scale: 0.25,
                    anchor: new google.maps.Point(location.lat, location.lng),
                    labelOrigin: new google.maps.Point(100, 100),
                },
                label: {
                    text: `${data.node.number}`,
                    className: 'marker',
                    fontFamily: 'Es Allianz Book',
                    fontSize: "20px"
                },
                map: map,
                // title: "marker"
            });

            marker.addListener("mouseover", () => {
                
                triggerTransparentCircle(parseInt(marker.label.text), data.node);

            })

            marker.addListener("mouseout", () => {
                removeTransparentCircle(parseInt(marker.label.text));
            })

            marker.addListener("click", () => {
                triggerTransition(marker.label.text)
            })
        }  


    }, []);
    

    return (
        <Container>
            <div id="map" ref={mapRef}></div>
        </Container>
    )
}

export default Map;