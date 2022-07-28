import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_TAG } from '../utils/queries';
import { GetDate } from '../utils/helper';
import { Button } from '../css/button';
import { DashboardMods } from '../css/dashboard';


export const Alerts = ({alertInfo, checkItems, checkedItems}) => {

    const [getTag] = useLazyQuery(QUERY_TAG);

    const updateAlertUsed = () => {
        checkItems({ ...checkedItems, alertChecked: false });
    }

    const checkNewAlert = async (id) => {
        checkItems({ ...checkedItems, alertChecked: id })
       
        const selectedTagData = await getTag({
            variables: { _id: id }
        })
        const newTag = selectedTagData.data.tag
    
        // Destructure necessary info from this tag only into an object and set that.
        localStorage.setItem("altUserTag", JSON.stringify(newTag));
    }

    // Utils
    const subString = alertInfo.criteria[0].toUpperCase() + alertInfo.criteria.substring(1);

    return (checkedItems.alertChecked ? (
        <article id={alertInfo._id} onClick={updateAlertUsed}>
            <div style={DashboardMods.Alerts.Container}>
                <p>Criteria: {subString}</p>
                <p>Date: {GetDate(alertInfo.date)}</p>
                <p>Description: {alertInfo.description}</p>
            </div>

            <p>Number of Comments: {alertInfo.comments.length}</p>

            <div>
                <div style={DashboardMods.Alerts.Container}>
                    <p id="confirmed">Confirmed: {alertInfo.confirmed}</p>
                    <p id="denied">Denied: {alertInfo.denied}</p>
                </div>
                <button style={Button.smallBlue}><Link to="/altUserTag">More Information</Link></button>
            </div>
        </article>
    ) :
        <article id={alertInfo._id} onClick={() => checkNewAlert(alertInfo._id)}>
            <div style={DashboardMods.Alerts.Container}>
                <h3>{subString}</h3>
                <p>{GetDate(alertInfo.date)}</p>
            </div>
        </article>
    );
}
