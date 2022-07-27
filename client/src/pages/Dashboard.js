import Auth from '../utils/auth';
import { useState } from "react";
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Tags } from '../components/tags';
import { Comments } from '../components/comments';
import { Link } from 'react-router-dom';
import { Alerts } from '../components/alerts';

export const Dashboard = () => {

    if (!Auth.loggedIn()) {
        alert("Please login")
        window.location.replace("/");
    }

    const [ checkedItems, checkItem ] = useState({
        tagChecked: false,
        commentChecked: false,
        alertChecked: false
    })

    const { loading, error, data } = useQuery(QUERY_USER);
    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const removeAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if (confirmDelete) {
            // Await deleteAccount etc etc
            // If successful replace screen
            // Window.location.replace('/')
        }
    }
console.log(data.user)
    let userCriteria = JSON.parse(localStorage.getItem("userCriteria"))
    console.log(userCriteria)
    return (
        <section id='dashboard'>
            <section id='dashboard-container'>

                <h2>Welcome to your <span>Dashboard,</span> {data.user.username}</h2>

                <article id='options-containers'>

                    <article id='yourTags'>
                        <h3>Your Tags</h3>
                        {/* Add each tag */}
                        {data.user.tags[0] && data.user.tags.map((tag) => {
                            return (
                                <article key={tag._id}>
                                    <Tags tagInfo={tag} checkItems={checkItem} checkedItems={checkedItems} />
                                </article>
                            )
                        })}
                        {!data.user.tags && <h4>No tags made</h4>}
                    </article>

                    <article id='yourComments'>
                        <h3>Comments</h3>
                        {/* Add each comment to this tag */}
                        {data.user.tags.comments && data.user.tags.map((comment) => {
                            return (
                                <article key={comment._id}>
                                    <Comments commentInfo={comment} checkItems={checkItem} checkedItems={checkedItems} />
                                </article>
                            )
                        })}
                        {!data.user.tags.comments && <h4>No comments made</h4>}
                    </article>

                    <article id='yourAlerts'>
                        <h3>Alerts</h3>
                        {/* Add each alert */}
                        {userCriteria && userCriteria.map((alert) => {
                            return (
                                <article key={alert._id}>
                                    <Alerts alertInfo={alert} checkItems={checkItem} checkedItems={checkedItems} />
                                </article>
                            )
                        })}
                        {!userCriteria.description && <h4>No Alerts yet</h4>}
                    </article>
                </article>

                <button id='manageNotifications'><Link to="/manageAlerts">Manage Alerts</Link></button>

                <button id='deleteProfile' onClick={removeAccount}>Remove Account</button>
            </section>
        </section>
    
    )
}