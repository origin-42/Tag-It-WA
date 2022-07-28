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
    console.log(newTag)
        // Destructure necessary info from this tag only into an object and set that.
        localStorage.setItem("altUserTag", JSON.stringify(newTag));
    }

    // Utils
    const subString = alertInfo.criteria[0].toUpperCase() + alertInfo.criteria.substring(1);

    return (checkedItems.alertChecked ? (
        <article id={alertInfo._id} onClick={updateAlertUsed}>
            <div style={DashboardMods.Alerts.Container}>
                <p><span style={DashboardMods.spanHeader}>Criteria:</span> {subString}</p>
                <p><span style={DashboardMods.spanHeader}>Date:</span> {GetDate(alertInfo.date)}</p>
                
            </div>

            <div style={DashboardMods.Alerts.Container}>
                <p><span style={DashboardMods.spanHeader}>Description:</span> {alertInfo.description}</p>
                <p><span style={DashboardMods.spanHeader}>Number of Comments:</span> {alertInfo.comments.length}</p>
            </div>
            

            <div>
                <div style={DashboardMods.Alerts.Container}>
                    <p id="confirmed"><span style={DashboardMods.spanHeader}>Confirmed:</span> {alertInfo.confirmed}</p>
                    <p id="denied"><span style={DashboardMods.spanHeader}>Denied:</span> {alertInfo.denied}</p>
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
