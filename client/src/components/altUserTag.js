import { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../utils/mutations';

export const AltUserTag = () => {
    const tagInfo = JSON.parse(localStorage.getItem('altUserTag'));

    const [comments, addComments] = useState(tagInfo.comments)

    const [commentSection, showCommentSec] = useState({
        show: false
    })

    const [newComment, createComment] = useState({
        description: "",
        user: tagInfo.user._id, 
        tag: tagInfo._id, 
        repliedUser: ""
    })

    const [ addComment, { error: addCommentError } ] = useMutation(ADD_COMMENT);

    const makeComment = async (e) => {
        e.preventDefault();

        const addNewComments = await addComment({
            variables: { 
                _id: newComment.tag,
                description: newComment.description,
                user: newComment.user,
                repliedUser: newComment.repliedUser || null
            }
        });

        addCommentError && alert("Error");

        addComments(addNewComments.data.addComment.comments);
    }

    const makeReply = (e, id) => {
        e.preventDefault();

        showCommentSec({ show: true })
        createComment({ ...newComment, repliedUser: id })
    }

    const changeComment = (event) => {
        const { name, value } = event.target;
        createComment({
          ...newComment,
          [name]: value,
        });
    };

    const resetDescription = (e) => {
        document.querySelector("#description").value = ""
    }

    return (
        <section id="altUserTag">
            <section id="altUserTagSection">

                <section id="alTagContainer">
                    <div>
                        <h2>{tagInfo.criteria}: <a href={`https://maps.google.com/?q=${tagInfo.lat},${tagInfo.lng}`} target="blank">google search</a>.</h2>
                        <p aria-label='date-created'>{tagInfo.date}</p>
                    </div>

                    <div>
                        <h2>Description: {tagInfo.description}</h2>
                        <h2>Confirmed: {tagInfo.confirmed}</h2>
                        <h2>Denied: {tagInfo.denied}</h2>
                        <h2>Number of Comment: {comments.length}</h2>
                    </div>

                    <div>
                        <h2>COMMENTS</h2>
                        {comments.map((comment) => {
                            return (
                                <article key={comment._id} className="altTagComment">
                                    <p>{comment.user.username || "anonymouse"} wrote: {comment.description}</p>
                                    <p>Dated: {comment.date}</p>
                                    <button id="replyUser" onClick={(e) => makeReply(e, comment.user._id)}>Reply</button>
                                </article>
                            )
                        })}
                    </div>

                    {!commentSection.show ? (
                            <section id="makeComment">
                                <button id="makeComment" onClick={() => showCommentSec({ ...commentSection, show: true })}>Make a new comment</button>
                            </section>
                        ) : (
                            <section id="makeComment">
                                <form onSubmit={(e) => makeComment(e)}>
                                    <input placeholder="Write comment..." type="text" id="description" name="description" onChange={changeComment}></input>
                                    <button type="submit" id="createNewComment" onClick={resetDescription}>Make Comment</button>
                                </form>
                            </section>
                        )}
                </section>

            </section>
        </section>
    )
}