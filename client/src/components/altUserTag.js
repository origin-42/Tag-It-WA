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

export const AltUserTag = () => {

    const newQuery = localStorage.getItem('altUserTag');

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

    // CSS only
    const isMedium = useMediaQuery('(min-width: 900px)');

    const [ addComment, { error: addCommentError } ] = useMutation(ADD_COMMENT);
    const [ updateComment, { error: updateTagError } ] = useMutation(UPDATE_TAG);
    
    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
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
        showCommentSec(false);
    }

    const changeComment = (event) => {
        const { name, value } = event.target;
        createComment({
          ...newComment,
          tag: data.tag._id,
          [name]: value,
        });
    };

    const handleConfirms = async (conf, num) => {

        if (conf) {
            await updateComment({
                variables: { _id: data.tag._id, confirmed: num + 1 }
            })
        } else {
            await updateComment({
                variables: { _id: data.tag._id, denied: num + 1 }
            })
        }

        // Reload to get around instance
        window.location.reload()

        if (updateTagError) {
            console.log(updateTagError)
        }
    }
    
    const { lat, lng, criteria, date, confirmed, denied, description, comments, user } = data.tag;
    const subString = criteria[0].toUpperCase() + criteria.substring(1);
    console.log(data.tag)
    return (
        <section id='alertsSection' style={TagSectionsCSS.alerts.alertsSection}>
            <section id='alertsWrapper' style={isMedium? TagSectionsCSS.alerts.alertsWrapper: TagSectionsCSS.alerts.alertsWrapperMd}>
                <article id='alertsHead' style={TagSectionsCSS.alerts.secLeft}>
                    <div style={TagSectionsCSS.alerts.titles}>
                        <h2>COMMENT DETAILS</h2>
                    </div>
                    <div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Criteria:</p>
                            <p>{subString}</p>
                        </div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Posted:</p>
                            <p style={TagSectionsCSS.alerts.dates}>{GetDate(date)}</p>
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
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.valid}>Confirmed:</p>
                            <p><span style={TagSectionsCSS.alerts.dates}>{confirmed}</span> times</p>
                        </div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.invalid}>Denied:</p>
                            <p><span style={TagSectionsCSS.alerts.dates}>{denied}</span> times</p>
                        </div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Number of Comments:</p>
                            <p style={TagSectionsCSS.alerts.dates}>{comments.length} comments</p>
                        </div>
                    </div>
                    <div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Geo Coordinates:</p>
                            <p><a href={`https://maps.google.com/?q=${lat},${lng}`}><FaMapPin /> Find address</a></p>
                        </div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Latitude:</p>
                            <p style={TagSectionsCSS.alerts.dates}>{lat}</p>
                        </div>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Longitude:</p>
                            <p style={TagSectionsCSS.alerts.dates}>{lng}</p>
                        </div>
                    </div>
                    <section>
                        <div style={TagSectionsCSS.alerts.confirmations}>
                            <p style={TagSectionsCSS.alerts.bold}>Is this comment valid?</p>
                            <div style={TagSectionsCSS.alerts.gapper}>
                                <button title='This tag is legitimate' id='confirmTag' style={Button.smallBlue} onClick={() => handleConfirms(true, confirmed)}>Accurate</button>
                                <button title='This is a fabrication' id='denyTag' style={Button.smallRed} onClick={() => handleConfirms(false, denied)}>Innacurate</button>
                            </div>
                        </div>
                    </section>
                    <div>
                        <Link to="/dashboard" title="Back to dashboard"><FaRegArrowAltCircleLeft style={TagSectionsCSS.alerts.previous} /></Link>
                    </div>
                </article>
                <section style={isMedium? TagSectionsCSS.alerts.secRight: TagSectionsCSS.alerts.secRightMd}>
                    <div style={TagSectionsCSS.alerts.titles}>
                        <h2>COMMENTS</h2>
                    </div>
                    <section style={TagSectionsCSS.alerts.comments}>
                            {comments.map((comment) => {
                             
                                return (
                                    <article key={comment._id} className="altTagComment">
                                        <div style={TagSectionsCSS.alerts.confirmations}>
                                            <p style={TagSectionsCSS.alerts.bold}><BsPersonCircle /> {comment.user.username || "Anonymouse"}</p>
                                            <p style={TagSectionsCSS.alerts.dates}>{GetDate(comment.date)}</p>
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
                            <form>
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