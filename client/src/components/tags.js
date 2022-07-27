import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TAG } from '../utils/mutations';
import { Link } from 'react-router-dom';

export const Tags = ({tagInfo, checkItems, checkedItems}) => {

    const [ isResolved, resolveTag ] = useState(tagInfo.resolved);

    // todo is checked

    const [ resolveTagData, { error } ] = useMutation(UPDATE_TAG);

    const resolve = async () => {
    
       await resolveTagData({ variables: { _id: tagInfo._id, resolved: true } })

       if (error) {
        alert("Update error")
       }

       resolveTag(true)
    }

    const updateTagUsed = (id) => {
        checkItems({ ...checkedItems, tagChecked: false })
        localStorage.setItem("currentTag", id)
    }

    const checkNewTag = (id) => {
        checkItems({ ...checkedItems, tagChecked: id })
    }

    return (checkedItems.tagChecked === tagInfo._id ? (
        <article id={tagInfo._id} onClick={() => updateTagUsed(tagInfo._id)}>
            <div>
                <p>Criteria: {tagInfo.criteria}</p>
                <p>Created: {tagInfo.date}</p>
            </div>  
            <div>
                {isResolved && <p data-resolved="true">Resolved: Yes</p>}
                {!isResolved && (
                    <div id="notResolved">
                        <p>Resolved: No</p>
                        <button onClick={resolve}>Resolved: No</button>
                    </div>
                )}
            </div>
            <p>Description: {tagInfo.description}</p>
            <p>Number of Comments: {tagInfo.comments.length}</p>

            <div>
                <div>
                    <p id="confirmed">Confirmed: {tagInfo.confirmed}</p>
                    <p id="denied">Denied: {tagInfo.denied}</p>
                </div>
                <button><Link to="/moreInfo">More Information</Link></button>
            </div>
        </article>
    ) : (
        <article id={tagInfo._id} onClick={() => checkNewTag(tagInfo._id)}>
            <div>
                <h3>{tagInfo.criteria}</h3>
                <p>{tagInfo.date}</p>
            </div>
        </article>
    ))
}
