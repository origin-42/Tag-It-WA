import Auth from '../utils/auth';
import { QUERY_USER, QUERY_CRITERIA } from '../utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { criteriaData } from '../utils/criteriaData';
import { useState } from 'react';

export const ManageAlerts = () => {
    if (!Auth.loggedIn()) {
        alert("Please login")
        window.location.replace("/");
    }

    const [getCriteria] = useLazyQuery(QUERY_CRITERIA);

    const [alertSettings, changeCriteria] = useState({
        criteria: "",
        criteriaData: []
    })
    
    const { loading, error } = useQuery(QUERY_USER);
    if (error) {
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }
 
    const handleChange = async (e) => {

        const newCriteria = e.target.value.replace("alert", "");
       
        const newCriData = await getCriteria({
            variables: { criteria: newCriteria }
        })

        changeCriteria({
            ...alertSettings,
            criteria: e.target.value,
            criteriaData: newCriData.data.getCriteria
        })
    }
   
    const setCriteria = () => {
        alertSettings.criteriaData && localStorage.setItem("userCriteria", JSON.stringify(alertSettings.criteriaData))
        window.location.replace("/dashboard")
    }

    return (
        <section id='manageAlertsPage'>
            <section id='manageAlertsPageContainer'>

                <article id='manageAlertsBox'>
                    <div id='selectAlertCriteria'>
                        <label htmlFor='alertsCriteria'>Select Criteria</label>
                        <select id='alertsCriteria' onChange={(e) => handleChange(e)}>
                            <option>No selections</option>
                            {criteriaData.map((criteria) => {
                                const subString = criteria[0].toUpperCase() + criteria.substring(1);
                                return (
                                    <option key={criteria + "alert"} value={criteria + "alert"}>{subString}</option>
                                );
                            })};
                        </select>
                    </div>
                    <section id='alertDetails'>
                            {alertSettings.criteriaData && (
                                alertSettings.criteriaData.map((criteriaInfo) => {
                                    return (
                                        <article key={criteriaInfo._id} id={"CRI" + criteriaInfo._id}>
                                            <h4>{criteriaInfo.description}; </h4>
                                            <p>Confirmed: {criteriaInfo.confirmed}, </p>
                                            <p>Denied: {criteriaInfo.denied}</p>
                                        </article>
                                    )
                                })
                            )}
                    </section>
                </article>
                <button onClick={setCriteria}>Set Criteria</button>
            </section>
        </section>
    )
}
