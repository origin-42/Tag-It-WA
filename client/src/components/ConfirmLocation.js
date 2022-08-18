import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Button } from '../css/buttons';
import { useRef } from 'react';

const APIKEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const ConfirmLocation = ({marker}) => {

    const address = useRef(async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=${APIKEY}`);
        const data = await response.json()
        return data
    })
console.log(address)

    const errorMessage = () => {
        const span = document.querySelector("#locErrorMessage");
        span.innerHTML = "Access Site to login";
        setTimeout(() => {
            span.innerHTML = "Confirm Location?";
        }, 2000)
    }
    
    return (
        Auth.loggedIn()? (
            <div id="locationSelection" style={Button.reportButton}>
                <span><Link to="/Issues">Confirm Location?</Link></span>
            </div>
        ) : (
            <div id="locationSelection" style={Button.reportButton}>
                <span id='locErrorMessage' onClick={errorMessage}>Confirm Location?</span>
            </div>
        )
    )
}