import { useEffect, useState, useRef } from "react"
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
    .gm-style > div:nth-child(17) {
        display: none;
    }

    @media(min-width: 990px) {
        .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div {
            opacity: 0;
        }
    }

    .has-triggered & .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div {
        opacity: 1;
    }

    .gm-style > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div.show {
        opacity: 1;
    }


    .marker {
        height: 39px;
        width: 39px;
        line-height: 1.9;
    }
`


const Map = ({ data, currentIndex, setCurrentIndex, hasClicked, containerRef }) => {
    let mapRef = useRef();
    // let [allCoords, setAllCoords] = useState([]);
    let timelines = [];
    let allCoords = [];
    
    let [map, setMap] = useState();

    let router = useRouter();

    

    let triggerTransparentCircle = (index) => {

        if(index === null) {
            removeTransparentCircle(index);
            return
        }

        let marker = allCoords[parseInt(index) - 1];

        if(marker === undefined) return
        let markerCoords = getMarkerCoords(marker);
        let x = markerCoords.x;
        let y = markerCoords.y;

        // if(document.querySelectorAll('.marker')[parseInt(index) - 1] === undefined) return
        // let x = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().x
        // let y = document.querySelectorAll('.marker')[parseInt(index) - 1].getBoundingClientRect().y


        // Change class to expanded

        
        let shadowCircle = document.querySelector(`.shadow-circle-home-map-${index - 1}`);
        
        let textCircle = document.querySelector(`.text-circle-home-map-${index - 1}`);

        textCircle.classList.add("expanded");

        shadowCircle.style.top = `${y}px`;
        shadowCircle.style.left = `${x}px`;

        textCircle.style.top = `${y}px`;
        textCircle.style.left = `${x}px`;

        if(timelines[index] !== undefined) {
            timelines[index].play()
            return
        }

        timelines[index] = gsap.timeline();

        timelines[index].to(shadowCircle, {display: "block", scale: 5, duration: 0.3}, "start")

        timelines[index].to(textCircle, {display: "flex", opacity: 1, duration: 0.3, delay: 0.1}, "start")

    }

    let removeTransparentCircle = (index) => {
        if(timelines[index]) {
            timelines[index].reverse();
        }
        
    }

    let triggerTransition = (index, data) => {
 
        // Route to page

        let lang = data._meta.lang;

        let url = data._meta.uid.split("__");

        let textCircle = document.querySelector(`.text-circle-home-map-${index - 1}`);

        if(textCircle.classList.contains("expanded")) {
            router.push(`/${lang}/${url[0]}/${url[1]}`)
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

    const getMarkerCoords = (marker) => {
        var scale = Math.pow(2, map.getZoom());
        var nw = new google.maps.LatLng(
            map.getBounds().getNorthEast().lat(),
            map.getBounds().getSouthWest().lng()
        );
        var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
        var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
        // var pixelOffset = new google.maps.Point(
        //     Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        //     Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
        // );

        var scale = Math.pow(2, map.getZoom());
        var nw = new google.maps.LatLng(
            map.getBounds().getNorthEast().lat(),
            map.getBounds().getSouthWest().lng()
        );
        var worldCoordinateNW = map.getProjection().fromLatLngToPoint(map.getCenter());
        var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
        var pixelOffset = new google.maps.Point(
            Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale + map.getDiv().getBoundingClientRect().width / 2),
            Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale + map.getDiv().getBoundingClientRect().height / 2)
        );                

        var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        var scale = Math.pow(2, map.getZoom());
        var worldPoint = map.getProjection().fromLatLngToPoint(marker.getPosition());
        var markerCoords = new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
        
        return markerCoords;
    }
    

    useEffect(() => {

        let loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            version: 'weekly',
          });

          loader.load().then((google) => {

            initMap(google);

            data.forEach((item, index) => {
                addMarker({ lat: item.node.geo_point?.latitude || 0 , lng: item.node.geo_point?.longitude || 0 }, item, map, google);

                // Create Circle DOM Nodes

                let shadowCircleDiv = document.createElement("div")
                shadowCircleDiv.setAttribute("id", "shadow-circle-home-map")
                shadowCircleDiv.classList.add(`shadow-circle-home-map-${index}`);
                containerRef.current.appendChild(shadowCircleDiv);


                let textCircleDiv = document.createElement("div")
                let textCircleSpan = document.createElement("span")
                textCircleSpan.innerHTML = `${item.node.name}<br>${item.node.arcade_name}`
                textCircleDiv.appendChild(textCircleSpan)
                textCircleDiv.setAttribute("id", "text-circle-home-map")
                textCircleDiv.classList.add(`text-circle-home-map-${index}`)
                containerRef.current.appendChild(textCircleDiv)
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
            }, 1000)
          })


        let initMap = (google) => {
          map = new google.maps.Map(mapRef.current, {
            center: { lat: 46.2050242, lng: 6.1290692 },
            zoom: 13,
            mapTypeId: 'satellite',
            mapTypeControl: false,
            disableDefaultUI: true,
            styles: [{
                stylers: [{
                  saturation: -100
                }]
              }]
          });

          setMap(map);

          map.setTilt(0);

          map.addListener("center_changed", () => {
            setCurrentIndex(null)
            timelines.forEach(item => { item.restart().pause() })

            document.querySelectorAll(`#text-circle-home-map`).forEach(item => {
                item.classList.remove("expanded");
            });

          })

          map.addListener("zoom_changed", () => {
            setCurrentIndex(null)
            timelines.forEach(item => item.restart().pause() )
          })

        //   map.addListener("click", () => {
        //       console.log("hello")
        //     setCurrentIndex(null)
        //     timelines.forEach(item => item.restart().pause() )
        //   })

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

            // setAllCoords(prev => [...prev, marker])

            allCoords.push(marker)

            marker.addListener("mouseover", () => {
                setCurrentIndex(parseInt(marker.label.text))
                triggerTransparentCircle(parseInt(marker.label.text), allCoords);
            })

            marker.addListener("mouseout", () => {
                setCurrentIndex(null)
                removeTransparentCircle(parseInt(marker.label.text));
            })

            marker.addListener("click", () => {
                //setCurrentIndex(parseInt(marker.label.text))
                triggerTransition(parseInt(marker.label.text), data.node)
                triggerTransparentCircle(parseInt(marker.label.text), allCoords)
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