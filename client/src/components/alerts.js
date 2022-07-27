import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { QUERY_TAG } from '../utils/queries';


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



    return (checkedItems.alertChecked ? (
        <article id={alertInfo._id} onClick={updateAlertUsed}>
            <div>
                <p>Criteria: {alertInfo.criteria}</p>
                <p>Date: {alertInfo.date}</p>
                <p>Description: {alertInfo.description}</p>
            </div>

            <p>Number of Comments: {alertInfo.comments.length}</p>

            <div>
                <div>
                    <p id="confirmed">Confirmed: {alertInfo.confirmed}</p>
                    <p id="denied">Denied: {alertInfo.denied}</p>
                </div>
                <button><Link to="/altUserTag">More Information</Link></button>
            </div>
        </article>
    ) :
        <article id={alertInfo._id} onClick={() => checkNewAlert(alertInfo._id)}>
            <div>
                <h3>{alertInfo.criteria}</h3>
                <p>{alertInfo.date}</p>
            </div>
        </article>
    );
}
