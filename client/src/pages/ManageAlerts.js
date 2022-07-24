import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

export const ManageAlerts = () => {
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

    console.log(data)

    return (
        <h2>Manage Alerts Page</h2>
    )
}