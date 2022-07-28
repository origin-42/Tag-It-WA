import { QUERY_TAG } from '../utils/queries';
import { ADD_COMMENT, UPDATE_TAG } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { GetDate } from '../utils/helper';
import { useState } from "react";

export const CommentInfo = () => {

    const newQuery = localStorage.getItem("currentCommentTag");

    const [commentSection, showCommentSec] = useState(false);

    const { loading, error, data } = useQuery(QUERY_TAG, {
        variables: { _id: newQuery }
    });
    
    const [newComment, createComment] = useState({
        description: "",
        user: "", 
        tag: "", 
        repliedUser: ""
    });

    const [ addComment, { error: addCommentError } ] = useMutation(ADD_COMMENT);
    // const [ updateComment, { error: updateTagError } ] = useMutation(UPDATE_TAG);

    const handleComment = async (e) => {
        e.preventDefault()
       
        await addComment({
            variables: { 
                _id: newComment.tag,
                description: newComment.description,
                user: newComment.user,
                repliedUser: newComment.repliedUser || null
            }
        });

        if (addCommentError) {
            console.log(addCommentError)
            alert("Error")
            return 
        } 

        createComment({
            ...newComment,
            description: ""
        });
        showCommentSec(false);
    }
    
    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const changeComment = (event) => {
        const { name, value } = event.target;
        createComment({
          ...newComment,
          user: data.tag.user._id, 
          tag: data.tag._id, 
          [name]: value,
        });
    };

    // const confirmTag = async (confirmed) => {
    //     let confirmedInt = data.tag.confirmed;
    //     let deniedInt = data.tag.denied;
    //     confirmed?
    //         confirmedInt = confirmedInt++ :
    //         deniedInt = deniedInt++ ;

    //     await updateComment({
    //         variables: { _id: data.tag._id, confirmed: confirmedInt, denied: deniedInt }
    //     })

    //     if (updateTagError) {
    //         console.log(updateTagError)
    //     }
    // }
    
    const { criteria, date, confirmed, denied, description, comments } = data.tag;
    const subString = criteria[0].toUpperCase() + criteria.substring(1);
  
    return (
        <section id='moreInfoSection'>
            <section id='moreInfoWrapper'>

                <article id='moreInfoHead'>
                    <div>
                        <h2>{subString}</h2>
                        <h2> at: {GetDate(date)}</h2>
                        <h2>{description}</h2>
                    </div>
                    <div>
                        <div>
                            <h3>Confirmed: {confirmed}</h3>
                            <h3>Denied: {denied}</h3>
                            <h3>Number of Comments: {comments.length}</h3>
                        </div>
                    </div>
                </article>
                <section id='moreInfoComments'>
                        {comments.map((comment) => {
                            return (
                                <article key={comment._id} className="altTagComment">
                                    <p>{comment.user.username || "anonymouse"} wrote: {comment.description}</p>
                                    <p>Dated: {GetDate(comment.date)}</p>
                                </article>
                            )
                        })}
                </section>
                {!commentSection ? (
                    <section id='moreInfoComment'>
                        <button onClick={() => showCommentSec(true)}>Make Comment</button>
                    </section>
                ) : (
                    <section>
                        <form>
                            <input placeholder='Write your comment..' type="text" name='description' onChange={changeComment}></input>
                            <button onClick={handleComment}>Send Comment</button>
                        </form>
                    </section>
                )}
                <section>
                    <div>
                        <button title='This tag is legitimate' id='confirmTag'>Confirm</button>
                        <button title='This is a fabrication' id='denyTag'>Deny</button>
                    </div>
                </section>
            </section>
        </section>
    )
}