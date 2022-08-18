import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Button } from '../css/buttons';

export const ConfirmLocation = () => {
    const errorMessage = () => {
        const span = document.querySelector("#locErrorMessage");
        span.innerHTML = "Access Site to login";
        setTimeout(() => {
            span.innerHTML = "Confirm Location?";
        }, 2000);
    };
    
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
    );
};