import { useCallback, useEffect, useRef, useState } from 'react';
import { googleMapCSS } from '../css/googleMap';
import { ConfirmLocation } from '../components/ConfirmLocation';
import { SpeechBubbles } from '../css/speechBubbles';


import { convertAddress } from '../utils/helper';

// Map components
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { PanTo } from '../components/ReportPage/panTo';
import { Markers } from '../components/ReportPage/Markers';
import { Circle } from '@react-google-maps/api';
import Geocode from "react-geocode";



// Media
import { useMediaQuery } from "../utils/useMediaQuery";

const APIKEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const mapConfig = {
    style: {
        width: "100%",
        height: "100%"
    }
}

const circleConfig = {
    strokeColor: '#FF0000'
}

export const Report = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: APIKEY
    });

    const [marker, setMarker] = useState({ lat: -31.932012253587, lng: 115.85712796810994 });
    const [initialCoords, setInitialCoords] = useState({ lat: -31.932012253587, lng: 115.85712796810994 });
    const [markerCoords, setMarkers] = useState(false);
    const [circleInfo, setCircleInfo] = useState({})

    // CSS only
    const isLarge = useMediaQuery('(min-width: 1500px)');

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const currentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            (e) => {
                setMarker({
                    lat: e.coords.latitude,
                    lng: e.coords.longitude
                });
                setInitialCoords({
                    lat: e.coords.latitude,
                    lng: e.coords.longitude
                });
            }
        )
    };
    
    useEffect(() => {
        currentPosition()
    }, []);

    if (!isLoaded) {
        return <div id='mapLoadError'>
            Map Loading
        </div>
    }

    // Setup coords for Issues page
    localStorage.setItem("coords", JSON.stringify(marker))

    const options = {
        streetViewControl: false,
        fullscreenControl: false
    }

    const handleClick = async (e) => {
        if (e.latLng.lat && e.latLng.lng) {
            const reponse = await Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng());
            const address = convertAddress(reponse)
            console.log(address)
            setMarker({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                date: Date.now(),
                address
            });
        };
    };
    
    return (
        <section id="report" style={isLarge ? googleMapCSS.reportSection : googleMapCSS.reportSectionLg}>
            <section id="report-container" style={googleMapCSS.reportContainer}>

                <div style={isLarge ? googleMapCSS.mapContainer : googleMapCSS.mapContainerLg} id="map-grid">
                    <article id='directions-left' style={isLarge ? googleMapCSS.speechContainer : googleMapCSS.speechContainerLg}>
                        <div style={SpeechBubbles.speechBox}>Search by address or geolocation</div>
                        <div style={SpeechBubbles.speechBox}>Click to drop a pin</div>
                    </article>

                    <article id="map" style={googleMapCSS.googleMap}>
                        <GoogleMap 
                            center={marker}
                            zoom={13}
                            mapContainerStyle={mapConfig.style}
                            options={options}
                            onClick={(e) => handleClick(e)}
                            onLoad={onMapLoad}
                        >

                            <Circle 
                                center={marker}
                                radius={1000} // Represents metres from target click as radius
                                onLoad={(circle) => setCircleInfo(circle)}
                                options={circleConfig}
                            />
                            {/* Marker for user click */}
                            <Marker 
                                key={marker.date}
                                position={marker}
                            />

                            {/* Markers for criteria */}
                            {markerCoords && (
                                <Markers circleInfo={circleInfo} marker={marker} />
                            )}

                        </GoogleMap>

                        <button onClick={() => markerCoords? setMarkers(false): setMarkers(true)}>Show Neaby Issues</button>
                        <PanTo initialCoords={initialCoords} setMarker={setMarker} />
                    </article>

                    <article id='directions-right' style={isLarge ? googleMapCSS.speechContainer : googleMapCSS.speechContainerLg}>
                        <div style={SpeechBubbles.speechBox}>Confirm your location</div>
                        <div style={SpeechBubbles.speechBox}>Add it for others to find</div>
                    </article>
                </div>
                
                <ConfirmLocation marker={marker} />

            </section>
        </section>
    )
};