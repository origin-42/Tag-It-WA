import Auth from '../utils/auth';
import { QUERY_USER, QUERY_CRITERIA } from '../utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { criteriaData } from '../utils/criteriaData';
import { GetDate } from '../utils/helper';
import { useState } from 'react';

import { BsPersonCircle } from 'react-icons/bs';

export const ManageAlerts = ({ setCriteriaState }) => {
    if (!Auth.loggedIn()) {
        alert("Please login")
        window.location.assign("/");
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
        });

        changeCriteria({
            ...alertSettings,
            criteria: e.target.value,
            criteriaData: newCriData.data.getCriteria
        });

        
    }
  
    const setCriteria = () => {
        localStorage.setItem("userCriteria", JSON.stringify(alertSettings.criteriaData));
        window.location.assign("/dashboard");
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
                    <div>
                        <p>Criteria: </p>
                        <p>{alertSettings.criteria[0] && alertSettings.criteria[0].toUpperCase() + alertSettings.criteria.substring(1)}</p>
                    </div>
                    <div>
                        <p>Number of issues: </p>
                        <p>{alertSettings.criteriaData.length} issues</p>
                    </div>
                    <div>
                        <button onClick={setCriteria}>Set Criteria</button>
                    </div>
                    
                </article>
                <section id='alertDetails'>
                    <div>
                        <h2>Issues Related to Criteria</h2>
                    </div>
                    {alertSettings.criteriaData && (
                        alertSettings.criteriaData.map((criteriaInfo) => {
                            return (
                                <article key={criteriaInfo._id} id={"CRI" + criteriaInfo._id}>
                                    <div>
                                        <p><BsPersonCircle /> {criteriaInfo.user ? criteriaInfo.user.username : "Anonymouse"}</p>
                                        <p>{GetDate(criteriaInfo.date)}</p>
                                    </div>
                                    <div>
                                        <h4>{criteriaInfo.description}; </h4>
                                    </div>
                                    <div>
                                        <div>
                                            <p title='This tag is legitimate'>Denied by users: </p>
                                            <p>{criteriaInfo.confirmed}</p>
                                        </div>
                                        <div>
                                            <p title='This is a fabrication'>Confirmed by users: </p>
                                            <p>{criteriaInfo.denied}</p>
                                        </div>
                                    </div>
                                </article>
                            )
                        })
                    )}
                </section>
                
            </section>
        </section>
    )
}
