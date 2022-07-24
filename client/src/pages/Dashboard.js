import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Tags } from '../components/tags';
import { Comments } from '../components/comments';
import { Link } from 'react-router-dom';

export const Dashboard = () => {

    if (!Auth.loggedIn()) {
        alert("Please login")
        window.location.replace("/");
    }

    const { loading, error, data } = useQuery(QUERY_USER);
    if (error) {
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const removeAccount = () => {
        const confirmDelete = alert("Are you sure you want to delete your account?");

        if (confirmDelete) {
            // Await deleteAccount etc etc
            // If successful replace screen
            // Window.location.replace('/')
        }
    }

    return (
        <section id='dashboard'>
            <section id='dashboard-container'>

                <h2>Welcome to your <span>Dashboard,</span> {data.user.username}</h2>

                <article id='options-containers'>

                    <article id='yourTags'>
                        <h3>Your Tags</h3>
                        {/* Add each tag */}
                        {data.user.tags && data.user.tags.map((tag) => {
                            return <Tags tagInfo={tag} />
                        })}
                        {!data.user.tags && <h4>No tags made</h4>}

                    </article>

                    <article id='yourComments'>
                        <h3>Comments</h3>
                        {/* Add each comment to this tag */}
                        {data.user.tags.comments && data.user.tags.map((tag) => {
                            return <Comments tagInfo={tag} />
                        })}
                        {!data.user.tags.comments && <h4>No comments made</h4>}
                    </article>
                </article>

                <button id='manageNotifications'><Link to="/manageAlerts">Manage Alerts</Link></button>

                <button id='deleteProfile' onClick={removeAccount}>Remove Account</button>
            </section>
        </section>
    
    )
}