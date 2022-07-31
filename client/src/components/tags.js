import { Link } from 'react-router-dom';
import { GetDate } from '../utils/helper';
import { Button } from '../css/button';
import { DashboardMods } from '../css/dashboard';

export const Tags = ({tagInfo, checkItems, checkedItems}) => {

    const updateTagUsed = (id) => {
        checkItems({ ...checkedItems, tagChecked: false })
        localStorage.setItem("currentTag", id)
    }

    const checkNewTag = (id) => {
        checkItems({ ...checkedItems, tagChecked: id })
    }

    // utils
    const newDate = GetDate(tagInfo.date)
    const subString = tagInfo.criteria[0].toUpperCase() + tagInfo.criteria.substring(1);

    return (checkedItems.tagChecked === tagInfo._id ? (
        <article id={tagInfo._id} onClick={() => updateTagUsed(tagInfo._id)} style={DashboardMods.Tags.Container}>
            <div style={DashboardMods.Tags.Container}>
                <p><span style={DashboardMods.spanHeader}>Criteria:</span> {subString}</p>
                <p><span style={DashboardMods.spanHeader}>Created:</span> {newDate}</p>
            </div>  
            <div>
                    <div id="notResolved" style={DashboardMods.Tags.Container}>
                        <p><span style={DashboardMods.spanHeader}>Resolved:</span> No</p>
                    </div>
            </div>
            <p><span style={DashboardMods.spanHeader}>Description:</span> {tagInfo.description}</p>
            <p><span style={DashboardMods.spanHeader}>Number of Comments:</span> {tagInfo.comments.length}</p>

            <div>
                <div style={DashboardMods.Tags.Container}>
                    <p id="confirmed"><span style={DashboardMods.spanHeader}>Confirmed:</span> {tagInfo.confirmed}</p>
                    <p id="denied"><span style={DashboardMods.spanHeader}>Denied:</span> {tagInfo.denied}</p>
                </div>
                <div style={DashboardMods.Tags.Container}>
                    <button style={Button.smallBlue}><Link to="/moreInfo">More Information</Link></button>
                </div>
                
            </div>
        </article>
    ) : (
        <article id={tagInfo._id} onClick={() => checkNewTag(tagInfo._id)}>
            <div>
                <h3>{subString}</h3>
                <h4>{newDate}</h4>
            </div>
        </article>
    ))
}
