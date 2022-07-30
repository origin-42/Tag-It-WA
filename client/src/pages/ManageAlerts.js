import Auth from '../utils/auth';
import { QUERY_USER, QUERY_CRITERIA } from '../utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { criteriaData } from '../utils/criteriaData';
import { GetDate } from '../utils/helper';
import { useState } from 'react';

import { TagSectionsCSS } from '../css/tagsSections';
import { Button } from '../css/button';

import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineWarning, AiFillMessage } from 'react-icons/ai';

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
        <section id='manageAlertsPage' style={TagSectionsCSS.management.managementSection}>
            <section id='manageAlertsPageContainer' style={TagSectionsCSS.management.managementWrapper}>
                <article id='manageAlertsBox' style={TagSectionsCSS.management.secLeft}>
                    <div style={TagSectionsCSS.management.titles}>
                        <h2>MANAGE ALERTS</h2>
                    </div>
                    <div id='selectAlertCriteria' style={TagSectionsCSS.management.confirmations}>
                        <label htmlFor='alertsCriteria'>Select Criteria</label>
                        <select style={TagSectionsCSS.management.options} id='alertsCriteria' onChange={(e) => handleChange(e)}>
                            <option>No selections</option>
                            {criteriaData.map((criteria) => {
                                let subString = criteria[0].toUpperCase() + criteria.substring(1);
                                return (
                                    <option key={criteria + "alert"} value={criteria + "alert"}>{subString}</option>
                                );
                            })};
                        </select>
                    </div>
                    <div style={TagSectionsCSS.management.confirmations}>
                        <p style={TagSectionsCSS.management.yellowStyle}><AiOutlineWarning /> Criteria: </p>
                        <p style={TagSectionsCSS.management.yellowStyle}>{alertSettings.criteria[0] && alertSettings.criteria[0].toUpperCase() + alertSettings.criteria.replace("alert", "").substring(1)}</p>
                    </div>
                    <div style={TagSectionsCSS.management.confirmations}>
                        <p>Number of issues: </p>
                        <p>{alertSettings.criteriaData.length} issues</p>
                    </div>
                    <div>
                        <button style={Button.blue} onClick={setCriteria}>Set Criteria</button>
                    </div>
                    
                </article>
                
                <section id='alertDetails' style={TagSectionsCSS.management.secRight}>
                    <div style={TagSectionsCSS.management.titles}>
                        <h2>Issues Related to Criteria</h2>
                    </div>
                    {alertSettings.criteriaData && (
                        alertSettings.criteriaData.map((criteriaInfo) => {
                            return (
                                <article key={criteriaInfo._id} id={"CRI" + criteriaInfo._id} style={TagSectionsCSS.management.gapper}>
                                    <div style={TagSectionsCSS.management.confirmations}>
                                        <p style={TagSectionsCSS.management.bold}><BsPersonCircle /> {criteriaInfo.user ? criteriaInfo.user.username : "Anonymouse"}</p>
                                        <p>{GetDate(criteriaInfo.date)}</p>
                                    </div>
                                    <div style={TagSectionsCSS.management.gapperDesc}>
                                        <p><AiFillMessage /> {criteriaInfo.description}; </p>
                                    </div>
                                    <div style={TagSectionsCSS.management.confirmationsManagement}>
                                        <div style={TagSectionsCSS.management.confirmations}>
                                            <p title='This tag is legitimate'style={TagSectionsCSS.management.bold}>Denied by users: </p>
                                            <p>{criteriaInfo.confirmed} times</p>
                                        </div>
                                        <div style={TagSectionsCSS.management.confirmations}>
                                            <p title='This is a fabrication'style={TagSectionsCSS.management.bold}>Confirmed by users: </p>
                                            <p>{criteriaInfo.denied} times</p>
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
