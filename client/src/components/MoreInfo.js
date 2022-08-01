import { QUERY_TAG } from '../utils/queries';
import { ADD_COMMENT, UPDATE_TAG } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { GetDate } from '../utils/helper';
import { useState } from "react";
import { Link } from 'react-router-dom';

import { TagSectionsCSS } from '../css/tagsSections';
import { Button } from '../css/button';

// Media
import { useMediaQuery } from "../utils/useMediaQuery";

import { FaRegArrowAltCircleLeft, FaMapPin, FaExclamation } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';

export const MoreInfo = () => {

    let newQuery = localStorage.getItem("currentTag");

    const [commentSection, showCommentSec] = useState(false);

    const { loading, error, data } = useQuery(QUERY_TAG, {
        variables: { _id: newQuery }
    });

    // CSS only
    const isMedium = useMediaQuery('(min-width: 900px)');
  
    const [newComment, createComment] = useState({
        description: "",
        user: "", 
        tag: "", 
        repliedUser: ""
    });

    const [ addComment, { error: addCommentError } ] = useMutation(ADD_COMMENT);
    const [ sendUpdate, { error: updateTagError } ] = useMutation(UPDATE_TAG);

    const updateTag = async () => {
        await sendUpdate({
            variables: {
                _id: data.tag._id,
                resolved: true
            }
        })
        updateTagError && console.log(updateTagError);

        alert("Tag Resolved.");
        window.location.assign("/dashboard");
    }

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
        showCommentSec(false)
    }

    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const { lat, lng, criteria, date, description, confirmed, denied, comments, user } = data.tag;
    const subString = criteria[0].toUpperCase() + criteria.substring(1);

    const changeComment = (event) => {
        const { name, value } = event.target;
        createComment({
          ...newComment,
          tag: data.tag._id, 
          [name]: value,
        });
    };
   
    return (
        <section id='moreInfoSection' style={TagSectionsCSS.tags.moreInfoSection}>
            <section id='moreInfoWrapper' style={isMedium? TagSectionsCSS.tags.moreInfoWrapper: TagSectionsCSS.tags.moreInfoWrapperMd}>
                <article id='moreInfoHead' style={TagSectionsCSS.tags.secLeft}>
                    <div style={TagSectionsCSS.tags.titles}>
                        <h2>YOUR TAG DETAILS</h2>
                    </div>
                    <div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.bold}>Criteria:</p>
                            <p>{subString}</p>
                        </div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.bold}>Posted:</p>
                            <p style={TagSectionsCSS.tags.dates}>{GetDate(date)}</p>
                        </div>
                        <div style={TagSectionsCSS.comments.confirmations}>
                            <p style={TagSectionsCSS.comments.bold}>Posted by:</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <div>
                        <p><FaExclamation /> {description}</p>
                    </div>
                    <div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.valid}>Confirmed:</p>
                            <p><span style={TagSectionsCSS.tags.invalid}>{confirmed}</span> times</p>
                        </div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.bold}>Denied:</p>
                            <p><span style={TagSectionsCSS.tags.dates}>{denied}</span> times</p>
                        </div>
                    </div>
                    <div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.bold}>Geo Coordinates:</p>
                            <p><a href={`https://maps.google.com/?q=${lat},${lng}`}><FaMapPin /> Find address</a></p>
                        </div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.bold}>Latitude:</p>
                            <p style={TagSectionsCSS.tags.dates}>{lat}</p>
                        </div>
                        <div style={TagSectionsCSS.tags.confirmations}>
                            <p style={TagSectionsCSS.tags.bold}>Longitude:</p>
                            <p style={TagSectionsCSS.tags.dates}>{lng}</p>
                        </div>
                    </div>
                    <div style={TagSectionsCSS.tags.confirmations}>
                        <div>
                            <p><span>Resolved:</span> No</p>
                        </div>
                        <div>
                            <button onClick={updateTag} style={Button.smallBlue}>Resolve Tag?</button>
                        </div>
                    </div>
                    <div>
                        <Link to="/dashboard" title="Back to dashboard"><FaRegArrowAltCircleLeft style={TagSectionsCSS.tags.previous} /></Link>
                    </div>
                </article>
                <section id='moreInfoComments' style={isMedium? TagSectionsCSS.tags.secRight: TagSectionsCSS.tags.secRightMd}>
                    <div style={TagSectionsCSS.tags.titles}>
                        <h2>COMMENTS</h2>
                    </div>
                    <section style={TagSectionsCSS.tags.comments}>
                            {comments.map((comment) => {
                                return (
                                    <article key={comment._id} className="altTagComment">
                                        <div style={TagSectionsCSS.tags.confirmations}>
                                            <p style={TagSectionsCSS.tags.bold}><BsPersonCircle /> {comment.user.username || "Anonymouse"}</p>
                                            <p style={TagSectionsCSS.tags.dates}>{GetDate(comment.date)}</p>
                                        </div>
                                        <div>
                                            <p>{comment.description}</p>
                                        </div>
                                    </article>
                                )
                            })}
                    </section>

                    {!commentSection ? (
                        <section>
                            <button onClick={() => showCommentSec(true)} style={Button.blue}>Make Comment</button>
                        </section>
                    ) : (
                        <section>
                            <form style={TagSectionsCSS.tags.comments}>
                                <input placeholder='Write your comment..' type="text" name='description' onChange={changeComment} style={TagSectionsCSS.tags.input}></input>
                                <button onClick={handleComment} style={Button.blue}>Submit Comment</button>
                            </form>
                        </section>
                    )}
                </section>
            </section>
        </section>
    )
}