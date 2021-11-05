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


    .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) {
        position: relative;
        filter: 
        grayscale(1) 
        contrast(2)
        ;
    }


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

        if(document.querySelectorAll('.marker')[parseInt(index) - 1] === undefined) return
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

        let x = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().x
        let y = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().y

        let mapDiv = document.querySelector('#map-container')

        let shadowCircle = document.querySelector('#shadow-circle');

        mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`

        // Route to page

        let lang = artistData.node._meta.lang;

        let url = artistData.node._meta.uid.split("__");

        router.push(`/${lang}/${url[0]}/${url[1]}`)

      
        
        let browser = Bowser.getParser(window.navigator.userAgent).parsedResult.browser.name

        if(window.innerWidth > 990 && browser !== "Safari") {
            gsap.to(mapDiv, {webkitMaskImage: `radial-gradient( ${window.innerWidth}px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`, duration: 1 })

            // gsap.to(shadowCircle, {scale: 50})
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
        //   let google = window.google; // ADDED

          loader.load().then((google) => {

            initMap(google);

            data.forEach((item, index) => {
                addMarker({ lat: item.node.geo_point?.latitude || 0 , lng: item.node.geo_point?.longitude || 0 }, item, map, google);
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
            zoom: 14,
            mapTypeId: 'satellite',
            mapTypeControl: false,
            disableDefaultUI: true,
          });

          map.setTilt(0);

          map.addListener("center_changed", () => {
            removeTransparentCircle();
          })

          map.addListener("zoom_changed", () => {
            removeTransparentCircle();
          })
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
                
                triggerTransparentCircle(parseInt(marker.label.text));

            })

            marker.addListener("mouseout", () => {
                removeTransparentCircle();
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