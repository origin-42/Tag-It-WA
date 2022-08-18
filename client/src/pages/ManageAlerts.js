import Auth from '../utils/auth';
import { QUERY_USER, QUERY_CRITERIA } from '../utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { criteriaData } from '../utils/criteriaData';
import { GetDate, measureDistance } from '../utils/helper';
import { useState } from 'react';

import { TagSectionsCSS } from '../css/tagsSections';
import { Button } from '../css/button';

// Media
import { useMediaQuery } from "../utils/useMediaQuery";

import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineWarning, AiFillMessage } from 'react-icons/ai';

export const ManageAlerts = ({ setCriteriaState }) => {
    if (!Auth.loggedIn()) {
        alert("Please login")
        window.location.assign("/");
    }

    const [getCriteria, { error: newCriteriaError }] = useLazyQuery(QUERY_CRITERIA);

    const [alertSettings, changeCriteria] = useState({
        criteria: "",
        locationSet: false,
        currentPosition: false,
        distance: "",
        distanceConfirmed: false,
        criteriaData: [],
        staticCriteriaData: []
    });

    // CSS only
    const isMedium = useMediaQuery('(min-width: 900px)');
    
    const { loading, error } = useQuery(QUERY_USER);
    if (error) {
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    };
 
    const handleChange = async (e) => {

        const newCriteria = e.target.value.replace("alert", "");
      
        if (newCriteria === "No selections") {
            changeCriteria({
                criteria: "",
                locationSet: false,
                currentPosition: false,
                distance: "",
                criteriaData: [],
                staticCriteriaData: []
            });
            return
        }
        
        const newCriData = await getCriteria({
            variables: { criteria: newCriteria }
        });
        newCriteriaError && console.log(newCriteriaError);

        changeCriteria({
            ...alertSettings,
            criteria: e.target.value,
            criteriaData: newCriData.data.getCriteria,
            staticCriteriaData: newCriData.data.getCriteria
        });
    };
 
    const setCriteria = () => {
        localStorage.setItem("userCriteria", JSON.stringify(alertSettings.criteriaData));
        window.location.assign("/dashboard");
    };

    const changeDistance = (event) => {
        const { name, value } = event.target;
        changeCriteria({
          ...alertSettings,
          [name]: value,
        });
    };
    const confirmDistance = () => {
        // Manage distance info
        const distanceMod = alertSettings.staticCriteriaData.filter(item => {
            const itemCoords = {
                lat: item.lat,
                lng: item.lng
            };
            const setCoords = {
                lat: alertSettings.lat,
                lng: alertSettings.lng
            }
            return measureDistance(itemCoords, setCoords, alertSettings.distance)
        });
  
        changeCriteria({
            ...alertSettings,
            criteriaData: distanceMod,
            distanceConfirmed: true
        });
    }

    const changeCoords = (event, current) => {

        if (current) {
            navigator.geolocation.getCurrentPosition(
                (e) => {
                    if (e.coords.latitude) {
                        changeCriteria({
                            ...alertSettings,
                            lat: e.coords.latitude,
                            lng: e.coords.longitude,
                            locationSet: true
                        });
                        document.querySelector("#latitude").value = e.coords.latitude
                        document.querySelector("#longitude").value = e.coords.longitude
                    } else {
                        document.querySelector("#useCurLoc").innerHTML = "Location disallowed";
                        setTimeout(() => {
                            document.querySelector("#useCurLoc").innerHTML = "Use current location";
                        }, 2000)
                    }
                }
            )
        };

        if (event.target) {
            const { name, value } = event.target;
          
            changeCriteria({
                ...alertSettings,
                [name]: value,
            });
            if (alertSettings.loc && alertSettings.lng) {
                changeCriteria({
                    ...alertSettings,
                    locationSet: true
                });
            };
        };
    };

    return (
        <section id='manageAlertsPage' style={TagSectionsCSS.management.managementSection}>
            <section id='manageAlertsPageContainer' style={isMedium? TagSectionsCSS.management.managementWrapper: TagSectionsCSS.management.managementWrapperSm}>
                <article id='manageAlertsBox' style={TagSectionsCSS.management.secLeft}>
                    <div style={TagSectionsCSS.management.titles}>
                        <h2>MANAGE ALERTS</h2>
                    </div>
                    <div id='selectAlertCriteria' style={TagSectionsCSS.management.confirmations}>
                        <label htmlFor='alertsCriteria'>Select Criteria</label>
                        <select style={TagSectionsCSS.management.options} id='alertsCriteria' onChange={handleChange}>
                            <option>No selections</option>
                            {criteriaData.map((criteria) => {
                                let subString = criteria[0].toUpperCase() + criteria.substring(1);
                                return (
                                    <option key={criteria + "alert"} value={criteria + "alert"}>{subString}</option>
                                );
                            })};
                        </select>
                    </div>
                    
                    {alertSettings.criteria && (
                        <>
                            <div style={TagSectionsCSS.management.confirmations}>
                                <p style={TagSectionsCSS.management.yellowStyle}><AiOutlineWarning /> Criteria: </p>
                                <p style={TagSectionsCSS.management.yellowStyle}>{alertSettings.criteria[0] && alertSettings.criteria[0].toUpperCase() + alertSettings.criteria.replace("alert", "").substring(1)}</p>
                            </div>
                        </>
                    )}

                    {alertSettings.criteria && (
                        <>
                            <div style={TagSectionsCSS.management.titles}>
                                <h2>Set location</h2>
                            </div>

                            <div style={TagSectionsCSS.management.confirmations}>
                                <input onChange={changeCoords} id="latitude" name='lat' type="number" placeholder='latitude..'
                                style={TagSectionsCSS.management.options}></input>
                                <input onChange={changeCoords} id="longitude" name='lng' type="number" placeholder='longitude..'
                                style={TagSectionsCSS.management.options}></input>
                            </div>

                            <div style={TagSectionsCSS.management.titles}>
                                <button id='useCurLoc' style={Button.smallBlue} onClick={(e) => changeCoords(e, true)}>Use current location</button>
                            </div>
                        </>
                    )}

                    {alertSettings.locationSet && (
                        <>
                            <div title='distance from your location' style={TagSectionsCSS.management.confirmations}>
                                <p>Set distance for notifications</p>
                                <div>
                                    <label htmlFor='distanceFrom'></label>
                                    <input 
                                        style={TagSectionsCSS.management.options} 
                                        type="number" 
                                        placeholder='"124 ( kms )"'
                                        name='distance'
                                        onChange={changeDistance}></input>
                                </div>
                            </div>
                            {alertSettings.distance && (
                                <div style={TagSectionsCSS.management.titles}>
                                    <button style={Button.smallBlue} onClick={confirmDistance}>Confirm Distance</button>
                                </div>
                            )}
                        </>
                    )}

                    {alertSettings.distance && (
                        <>
                            <div style={TagSectionsCSS.management.confirmations}>
                                <p>Number of issues: </p>
                                <p>{alertSettings.criteriaData.length} issues</p>
                            </div>

                            {alertSettings.distanceConfirmed && (
                                <div>
                                    <button style={Button.blue} onClick={setCriteria}>Set Criteria</button>
                                </div>
                            )}
                        </>
                    )}
                    
                    
                </article>
                
                <section id='alertDetails' style={isMedium? TagSectionsCSS.management.secRight: TagSectionsCSS.management.secRightSm}>
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
