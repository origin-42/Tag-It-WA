import Auth from '../utils/auth';
import { Button } from '../css/buttons';

export const ConfirmLocation = ({address}) => {
    const errorMessage = () => {
        const span = document.querySelector("#locErrorMessage");
        span.innerHTML = "Access Site to login";
        setTimeout(() => {
            span.innerHTML = "Confirm Location?";
        }, 2000);
    };

    const confirmLoc = () => {
        if (address === "WA") {
            window.location.assign("/Issues");
        } else {
            alert("Address not in WA");
        };
    };
    
    return (
        Auth.loggedIn()? (
            <div id="locationSelection" style={Button.reportButton}>
                <button onClick={confirmLoc}>Confirm Location?</button>
            </div>
        ) : (
            <div id="locationSelection" style={Button.reportButton}>
                <button id='locErrorMessage' onClick={errorMessage}>Confirm Location?</button>
            </div>
        )
    );
};