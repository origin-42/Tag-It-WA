import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TAG } from '../utils/queries';
import { GetDate } from '../utils/helper';
import { Button } from '../css/button';
import { DashboardMods } from '../css/dashboard';

export const Comments = ({ commentInfo, checkItems, checkedItems }) => {

    const { loading, error, data } = useQuery(QUERY_TAG, {
        variables: { _id: commentInfo.tag._id }
    });
    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const updateCommentUsed = (commId, tagId) => {
        checkItems({ ...checkedItems, commentChecked: false })
        localStorage.setItem("currentComment", commId)
        localStorage.setItem("currentCommentTag", tagId)
    }

    const checkCommentTag = (id) => {
        checkItems({ ...checkedItems, commentChecked: id })
    }

    // Utils
    const subString = data.tag.criteria[0].toUpperCase() + data.tag.criteria.substring(1);

    return (checkedItems.commentChecked === commentInfo._id ? (
        <article id={commentInfo._id} onClick={() => updateCommentUsed(commentInfo._id, data.tag._id)}>
            <div style={DashboardMods.Comments.Container}>
                <p>Criteria: {subString}</p>
                <p>Created: {GetDate(commentInfo.date)}</p>
            </div>  
            <p>Description: {commentInfo.description}</p>
            <p>Number of Comments: {data.tag.comments.length}</p>
            <div style={DashboardMods.Comments.Container}>
                <div style={DashboardMods.Comments.Container}>
                    <p id="confirmed">Confirmed: {data.tag.confirmed}</p>
                    <p id="denied">Denied: {data.tag.denied}</p>
                </div>
                <button style={Button.smallBlue}><Link to="/commentInfo">More Information</Link></button>
            </div>
        </article>
    ) : (
        <article id={commentInfo._id} onClick={() => checkCommentTag(commentInfo._id)}>
            <div>
                <div style={DashboardMods.Comments.Container}>
                    <h4>{subString}</h4>
                    <h4>{GetDate(commentInfo.date)}</h4>
                </div>
            </div>
        </article>
    )
    )
}
