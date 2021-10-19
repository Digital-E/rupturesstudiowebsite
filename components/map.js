import { useEffect } from "react"
import styled from "styled-components";

import { useRouter } from "next/router"

import {Loader} from '@googlemaps/js-api-loader';



const Container = styled.div`
    height: 100%;
    width: 100%;

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
    }

    .gm-style > div:nth-child(15) > div,
    .gm-style > div:nth-child(17)
     {
        display: none;
    }
`


const Map = ({ data, currentIndex, setCurrentIndex, hasClicked }) => {

    let router = useRouter();

    let triggerTransparentCircle = (index) => {
        if(index === null) {
            removeTransparentCircle();
            return
        }

        let x = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().x
        let y = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().y

        let shadowCircle = document.querySelector('#shadow-circle');

        let mapDiv = document.querySelector('#map-container');

        setCurrentIndex(index)

        setTimeout(() => {
            shadowCircle.style.display = "block";
            shadowCircle.style.top =`${y}px`
            shadowCircle.style.left =`${x}px`

            mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 99%, black 100% )`
        }, 10)
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

        let x = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().x
        let y = document.querySelectorAll('[title="marker"]')[parseInt(index) - 1].getBoundingClientRect().y

        let mapDiv = document.querySelector('#map-container')

        let shadowCircle = document.querySelector('#shadow-circle');

        mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 100%, black 100% )`

        // Route to page

        let parent = artistData.node._meta.lang === "fr-fr" ? "artistes" : "artists";

        router.push(`/${artistData.node._meta.lang}/${parent}/${artistData.node._meta.uid}`)

        // Expand Circle

        let init = 20;

        let initTransform = 1;
      
        let interval = setInterval(() => {
          mapDiv.style.webkitMaskImage = `radial-gradient( ${init}px at ${ x + 20 }px ${ y + 20 }px, transparent 100%, black 100% )`
      
        //   shadowCircle.style.height = `${20 + init}px`;
        //   shadowCircle.style.width = `${20 + init}px`;
          shadowCircle.style.transform = `scale(${initTransform})`;
      
      
          init += 5;
          initTransform += 0.25;
      
          if(init === 2000) {
            clearInterval(interval)
          }
        }, 1);
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

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            version: 'weekly',
          });

          let map; 
        //   let google = window.google; // ADDED

          loader.load().then((google) => {

            initMap(google);
  
            data.forEach((item, index) => {
                addMarker({ lat: item.node.geo_point.latitude, lng: item.node.geo_point.longitude }, item, map, google);
            })
          })


        let initMap = (google) => {
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 46.2050242, lng: 6.1090692 },
            zoom: 15,
            mapTypeId: 'satellite',
            mapTypeControl: false,
            disableDefaultUI: true
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
                title: "marker"
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
    

    }, []);
    

    return (
        <Container>
            {/* <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHtpls0cGSxvFJrh1ZVR15y6bpVVaSdIk&callback=initMap&v=weekly" 
            onLoad={
                () => {}
            }
            /> */}
            <div id="map"></div>
        </Container>
    )
}

export default Map;