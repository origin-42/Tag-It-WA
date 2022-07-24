import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { googleMapCSS } from '../css/googleMap';
import { ConfirmLocation } from '../components/ConfirmLocation';
import { SpeechBubbles } from '../css/speechBubbles';

const APIKEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapConfig = {
    style: {
        width: "100%",
        height: "100%"
    }
}

export const Report = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: APIKEY
    });

    const [marker, setMarker] = useState({ lat: -31.932012253587, lng: 115.85712796810994 });

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
                })
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
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false
    }

    const handleClick = (e) => {
        if (e.latLng.lat && e.latLng.lng) {
            setMarker({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                date: Date.now()
            })
        }
    }
    
    return (
        <section id="report" style={googleMapCSS.reportSection}>
            <section id="report-container" style={googleMapCSS.reportContainer}>

                <div style={googleMapCSS.mapContainer}>
                    <article id='directions-left' style={googleMapCSS.speechContainer}>
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
                            <Marker 
                                key={marker.date}
                                position={marker}
                            />
                        </GoogleMap>
                    </article>

                    <article id='directions-right' style={googleMapCSS.speechContainer}>
                        <div style={SpeechBubbles.speechBox}>Confirm your location</div>
                        <div style={SpeechBubbles.speechBox}>Add it for others to find</div>
                    </article>
                </div>
                
                <ConfirmLocation marker={marker} />

            </section>
        </section>
    )
};