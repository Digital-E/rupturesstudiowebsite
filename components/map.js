import { useEffect } from "react"
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 100%;

    #circle {
        position: fixed;
        top: 50%;
        left: 0;
        height: 40px;
        width: 40px;
        background-color: white;
        z-index: 99999;
        border-radius: 999px !important;
    }

    #map {    
        height: 100%;
        width: 100%;
    }

    .gm-style > div:nth-child(15) > div,
    .gm-style > div:nth-child(17)
     {
        display: none;
    }
`


const Map = () => {

    useEffect(() => {

        let map;

        let initMap = () => {
          map = new window.google.maps.Map(document.getElementById("map"), {
            center: { lat: 46.2050242, lng: 6.1090692 },
            zoom: 15,
            mapTypeId: 'satellite',
            mapTypeControl: false,
            disableDefaultUI: true
          });

          map.setTilt(0);
        }
        
        initMap();
        // setMarkers();

        let labelIndex = 1;  
          

        // Adds a marker to the map.
        function addMarker(location, map) {
            let marker = new window.google.maps.Marker({
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

            marker.addListener("click", () => {
                var scale = Math.pow(2, map.getZoom());
                var nw = new google.maps.LatLng(
                    map.getBounds().getNorthEast().lat(),
                    map.getBounds().getSouthWest().lng()
                );
                var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
                var worldCoordinate = map.getProjection().fromLatLngToPoint(marker.getPosition());
                var pixelOffset = new google.maps.Point(
                    Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
                    Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
                );   

                console.log(pixelOffset)

                let x = document.querySelectorAll('[title="marker"]')[parseInt(marker.label.text) - 1].getBoundingClientRect().x
                let y = document.querySelectorAll('[title="marker"]')[parseInt(marker.label.text) - 1].getBoundingClientRect().y

                document.querySelector('#circle').style.left = `${x}px`
                document.querySelector('#circle').style.top = `${y}px`

                console.log(x, y)
            })

            labelIndex += 1
        }  
        
        addMarker({ lat: 46.2050242, lng: 6.1030692 }, map);
        addMarker({ lat: 46.2080242, lng: 6.1090692 }, map);
        addMarker({ lat: 46.2020242, lng: 6.1320692 }, map);
        addMarker({ lat: 46.2030242, lng: 6.1190692 }, map);

    }, []);
    

    return (
        <Container>
            <div id="circle"></div>
            <div id="map"></div>
        </Container>
    )
}

export default Map;