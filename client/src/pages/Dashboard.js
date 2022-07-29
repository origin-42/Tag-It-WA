import Auth from '../utils/auth';
import { useRef, useState } from "react";
import { QUERY_USER } from '../utils/queries';
import { DELETE_USER } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { Tags } from '../components/tags';
import { Comments } from '../components/comments';
import { Link } from 'react-router-dom';
import { Alerts } from '../components/alerts';
import { DashboardCSS, DashboardMods } from '../css/dashboard';
import { Button } from '../css/button';

export const Dashboard = () => {

    if (!Auth.loggedIn()) {
        alert("Please login")
        window.location.assign("/");
    }

    const [ checkedItems, checkItem ] = useState({
        tagChecked: false,
        commentChecked: false,
        alertChecked: false
    })

    const userCriteria = useRef(() => {
        let userData = ""
        if (localStorage.getItem("userCriteria")) {
            userData = JSON.parse(localStorage.getItem("userCriteria"))
        }
        return userData;
    })

    const [ removeUser, { error: removeUserError } ] = useMutation(DELETE_USER);

    const { loading, error, data } = useQuery(QUERY_USER);
    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const removeAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if (confirmDelete) {
            removeUserError && console.log(removeUserError)
            await removeUser({
                variables: { username: data.user.username }
            })
            if (!removeUserError) {
                Auth.logout();
            }
        }
    }

    return (
        <section id='dashboard'  style={DashboardCSS.dashboard}>
            <h2 style={DashboardCSS.centerHeaderLrg}>WELCOME TO YOUR <span>DASHBOARD,</span> {data.user.username}</h2>

            <section id='dashboard-container' style={DashboardCSS.dashboardContainer}>

                <article id='options-containers' style={DashboardCSS.optionsContainer}>

                    <article id='yourTags' style={DashboardCSS.optionsBox}>
                        <h3 style={DashboardCSS.centerHeader}>TAGS</h3>
                        {/* Add each tag */}
                        {data.user.tags[0] && data.user.tags.map((tag) => {
                            return (
                                <article key={tag._id} style={DashboardMods.All}>
                                    <Tags tagInfo={tag} checkItems={checkItem} checkedItems={checkedItems} />
                                </article>
                            )
                        })}
                        {!data.user.tags && <h4>No tags made</h4>}
                    </article>

                    <article id='yourComments' style={DashboardCSS.optionsBox}>
                        <h3 style={DashboardCSS.centerHeader}>COMMENTS</h3>
                        {/* Add each comment to this tag */}
                        {data.user.comments.length > 0 && data.user.comments.map((comment) => {
                            return (
                                <article key={comment._id} style={DashboardMods.All}>
                                    <Comments commentInfo={comment} checkItems={checkItem} checkedItems={checkedItems} />
                                </article>
                            )
                        })}
                        {!data.user.comments.length > 0 && <h4>No comments made</h4>}
                    </article>

                    <article id='yourAlerts' style={DashboardCSS.optionsBox}>
                        <h3 style={DashboardCSS.centerHeader}>ALERTS</h3>
                        {/* Add each alert */}
                        {userCriteria.current() && userCriteria.current().map((alert) => {
                            return (
                                <article key={alert._id} style={DashboardMods.All}>
                                    <Alerts alertInfo={alert} checkItems={checkItem} checkedItems={checkedItems} />
                                </article>
                            )
                        })}
                        {!userCriteria.current() && <h4>No Alerts set</h4>}
                    </article>
                </article>

                <button id='manageNotifications' style={Button.evenPaddingBlue}><Link to="/manageAlerts">Manage Alerts</Link></button>

                <button id='deleteProfile' onClick={removeAccount} style={Button.evenPaddingBlue}>Remove Account</button>
            </section>
        </section>
    
    )
}