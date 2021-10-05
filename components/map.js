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


const Map = ({ currentIndex }) => {

    let router = useRouter();

    useEffect(() => {

        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            version: 'weekly',
          });

          let map; 
        //   let google = window.google; // ADDED

          loader.load().then((google) => {

            initMap(google);
  
            addMarker({ lat: 46.2050242, lng: 6.1030692 }, map, google);
            addMarker({ lat: 46.2080242, lng: 6.1090692 }, map, google);
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
        
        // setMarkers();

        let labelIndex = 1;  
          

        // Adds a marker to the map.
        function addMarker(location, map, google) {
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
                    text: `${labelIndex}`,
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
                

                let x = document.querySelectorAll('[title="marker"]')[parseInt(marker.label.text) - 1].getBoundingClientRect().x
                let y = document.querySelectorAll('[title="marker"]')[parseInt(marker.label.text) - 1].getBoundingClientRect().y

                let mapDiv = document.querySelector('#map-container')

                mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 100%, black 100% )`

                currentIndex(marker.label.text)
            })

            marker.addListener("click", () => {
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

                // console.log(pixelOffset)

                let x = document.querySelectorAll('[title="marker"]')[parseInt(marker.label.text) - 1].getBoundingClientRect().x
                let y = document.querySelectorAll('[title="marker"]')[parseInt(marker.label.text) - 1].getBoundingClientRect().y

                let mapDiv = document.querySelector('#map-container')

                mapDiv.style.WebkitMaskImage = `radial-gradient( 20px at ${ x + 20 }px ${ y + 20 }px, transparent 100%, black 100% )`

                // Route to page

                router.push("/fr-fr/artistes/flora-mottini")

                // Expand Circle

                let init = 20;

                let initTransform = 1;
              
                let interval = setInterval(() => {
                  mapDiv.style.webkitMaskImage = `radial-gradient( ${init}px at ${ x + 20 }px ${ y + 20 }px, transparent 100%, black 100% )`
              
                  // shadow.style.height = `${20 + init}px`;
                  // shadow.style.width = `${20 + init}px`;
                  //   shadow.style.transform = `scale(${initTransform})`;
              
              
                  init += 5;
                  initTransform += 0.25;
              
                  if(init === 2000) {
                    clearInterval(interval)
                  }
                }, 1);
            })

            labelIndex += 1
        }  
        
        // addMarker({ lat: 46.2050242, lng: 6.1030692 }, map);
        // addMarker({ lat: 46.2080242, lng: 6.1090692 }, map);
        // addMarker({ lat: 46.2020242, lng: 6.1320692 }, map);
        // addMarker({ lat: 46.2030242, lng: 6.1190692 }, map);

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