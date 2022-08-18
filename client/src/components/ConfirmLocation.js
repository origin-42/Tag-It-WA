import Auth from '../utils/auth';
import { Button } from '../css/button';

export const ConfirmLocation = ({marker}) => {
 console.log(marker)
    const errorMessage = () => {
        const span = document.querySelector("#locErrorMessage");
        span.innerHTML = "Access Site to login";
        setTimeout(() => {
            span.innerHTML = "Confirm Location?";
        }, 2000);
    };

    const confirmLoc = () => {
        if (marker.address === "WA") {
            window.location.assign("/Issues");
        } else {
            alert("Address not in WA");
        };
    };
    
    return (
        Auth.loggedIn()? (
            <div id="locationSelection">
                <button style={Button.blue} onClick={confirmLoc}>Confirm Location?</button>
            </div>
        ) : (
            <div id="locationSelection">
                <button style={Button.blue} id='locErrorMessage' onClick={errorMessage}>Confirm Location?</button>
            </div>
        )
    );
};