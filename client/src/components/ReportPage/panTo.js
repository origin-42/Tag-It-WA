import { googleMapCSS } from '../../css/googleMap';
import { Button } from '../../css/button';

export const PanTo = ({initialCoords, setMarker}) => {

    const panView = () => {
        setMarker(initialCoords);
    }

    return (
        <div style={googleMapCSS.panTo}>
            <button
            style={Button.blue}
            onClick={panView}
            >Re-center
            </button>
        </div>
        
    )
}