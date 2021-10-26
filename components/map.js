import { useEffect, useRef } from "react"
import styled from "styled-components";

import { useRouter } from "next/router"

import {Loader} from '@googlemaps/js-api-loader';

import { gsap } from "gsap";

import html2canvas from "html2canvas";

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

    .marker {
        height: 39px;
        width: 39px;
        line-height: 1.9;
    }
`


const Map = ({ data, currentIndex, setCurrentIndex, hasClicked }) => {
    let mapRef = useRef();

    let router = useRouter();
    

    let triggerTransparentCircle = (index) => {
        if(index === null) {
            removeTransparentCircle();
            return
        }

        // let x = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().x
        // let y = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().y
        let x = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().x
        let y = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().y

        let shadowCircle = document.querySelector('#shadow-circle');

        let mapDiv = document.querySelector('#map-container');

        setCurrentIndex(index)

        setTimeout(() => {
            shadowCircle.style.display = "block";
            shadowCircle.style.top =`${y}px`
            shadowCircle.style.left =`${x}px`

            mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`
            // mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px,rgba(0,0,0,0) 80%, rgba(0,0,0,1) 90%, rgba(0,0,0,1) 100% )`
            // radial-gradient( 20px at 420px 420px,rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)
        }, 0)
    }

    let removeTransparentCircle = () => {
        let mapDiv = document.querySelector('#map-container')
        let shadowCircle = document.querySelector('#shadow-circle');

        shadowCircle.style.display = "none";

        setCurrentIndex(null)

        mapDiv.style.WebkitMaskImage = ``
    }

    let triggerTransition = (index) => {
        let artistData = data[parseInt(index) - 1]

        // let x = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().x
        // let y = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().y
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

        // html2canvas(mapDiv, {allowTaint: true, useCORS: true}).then(function(canvas) {
        //     // mapDiv.innerHTML = "";
        //     mapDiv.appendChild(canvas);
        //     // gsap.to(mapDiv, {webkitMaskImage: `radial-gradient( 1500px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`, duration: 1.5 })
        // });
      
        
        let browser = Bowser.getParser(window.navigator.userAgent).parsedResult.browser.name

        if(window.innerWidth > 990 && browser !== "Safari") {
            gsap.to(mapDiv, {webkitMaskImage: `radial-gradient( 1500px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`, duration: 1 })

            // gsap.to(shadowCircle, {scale: 50})
            shadowCircle.style.display = "none";
        }

        // let init = 20;

        // let initTransform = 1;
      
        // let interval = setInterval(() => {
        //   mapDiv.style.webkitMaskImage = `radial-gradient( ${init}px at ${ x + 20 }px ${ y + 20 }px, transparent 100%, black 100% )`
      
        // //   shadowCircle.style.height = `${20 + init}px`;
        // //   shadowCircle.style.width = `${20 + init}px`;
        //   shadowCircle.style.transform = `scale(${initTransform})`;
      
      
        //   init += 5;
        //   initTransform += 0.25;
      
        //   if(init === 2000) {
        //     clearInterval(interval)
        //   }
        // }, 1);
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

        // let createOverlay = (map) => {
        //     console.log(document.querySelector(".gm-style"))
        //     let overlay = document.createElement("div");
        //     overlay.setAttribute("className", "map-orange-overlay");

        //     let mapDiv = document.querySelector(".gm-style").children[2].children[0].children[5]

        //     mapDiv.appendChild(overlay)
        // }

        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            version: 'weekly',
          });

          let map; 
        //   let google = window.google; // ADDED

          loader.load().then((google) => {

            initMap(google);

            // createOverlay(map);

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
            }, 500)
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

                let mapPos = map.getDiv().getBoundingClientRect().y


                // var scale = Math.pow(2, map.getZoom());
                // var nw = new google.maps.LatLng(
                //     map.getBounds().getNorthEast().lat(),
                //     map.getBounds().getSouthWest().lng()
                // );
                // var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
                // var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
                // var pixelOffset = new google.maps.Point(
                //     Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
                //     Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
                // );

                // var scale = Math.pow(2, map.getZoom());
                // var nw = new google.maps.LatLng(
                //     map.getBounds().getNorthEast().lat(),
                //     map.getBounds().getSouthWest().lng()
                // );
                // var worldCoordinateNW = map.getProjection().fromLatLngToPoint(map.getCenter());
                // var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
                // var pixelOffset = new google.maps.Point(
                //     Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale + map.getDiv().getBoundingClientRect().width / 2),
                //     Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale + map.getDiv().getBoundingClientRect().height / 2)
                // );                

                // var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
                // var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
                // var scale = Math.pow(2, map.getZoom());
                // var worldPoint = map.getProjection().fromLatLngToPoint(marker.getPosition());
                // var markerCoords = new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
                
                triggerTransparentCircle(parseInt(marker.label.text));

            })

            marker.addListener("mouseout", () => {
                removeTransparentCircle();
            })

            marker.addListener("click", () => {
                triggerTransition(marker.label.text)
            })
        }  

        // setTimeout(() => {
        //     gsap.to("#map-container", {webkitMaskImage: `radial-gradient( 999px at 500px 500px, transparent 100%, black 100% )`})
        // }, 3000)

    }, []);
    

    return (
        <Container>
            <div id="map" ref={mapRef}></div>
            <svg>
                <filter id="svg-filter-orange" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" values="1 0 0 0 0
                1 0 0 0 0
                1 0 0 0 0
                0 0 0 1 0" in="SourceGraphic" result="colormatrix"/>
                    <feComponentTransfer in="colormatrix" result="componentTransfer">
                        <feFuncR type="table" tableValues="1"/>
                        <feFuncG type="table" tableValues="0.68"/>
                        <feFuncB type="table" tableValues="0.31"/>
                        <feFuncA type="table" tableValues="0 0.75"/>
                    </feComponentTransfer>
                    <feBlend mode="normal" in="componentTransfer" in2="SourceGraphic" result="blend"/>
                </filter>  
            </svg>                
        </Container>
    )
}

export default Map;