import { useMemo, useState } from "react";
import Auth from '../utils/auth';
import { IssuesCSS } from '../css/issues';
import { criteriaData } from '../utils/criteriaData';
import { ADD_TAG } from '../utils/mutations';
import { useMutation } from '@apollo/client';

export const Issues = () => {

    // Get the coordinates once user accepts.
    const coords = useMemo(() => JSON.parse(localStorage.getItem("coords")), []);
    const [details, changeDetails] = useState({
        lat: coords.lat,
        lng: coords.lng,
        date: Date.now,
        criteria: "",
        description: "",
        active: true,
        resolved: false,
        notifyUser: false,
        confirmed: 0,
        denied: 0
    });

    const [ addTag, { error } ] = useMutation(ADD_TAG);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!details.criteria) {
            alert("Please add criteria")
        }

        if (!Auth.loggedIn()) {
            alert("Please login")
        }

        await addTag({
            variables: { ...details }
        });

        if (error) {
            alert("Error")
        }

        console.log(details)
        window.location.assign("/dashboard");
        
    }

    const handleNotifications = (e) => {
        e.preventDefault();
        if (details.notifyUser === false) {
            document.querySelector("#notifyUser").innerHTML = "No";
            changeDetails({
                ...details,
                notifyUser: true
            });
        } else {
            document.querySelector("#notifyUser").innerHTML = "Yes";
            changeDetails({
                ...details,
                notifyUser: false
            });
        };
    }

    const changeDescription = (event) => {
        const { name, value } = event.target;
        changeDetails({
          ...details,
          [name]: value,
        });
    };

    const updateCriteria = () => {
        let value = document.querySelector("#criteria").value
        value = value[0].toUpperCase() + value.substring(1)
        changeDetails({ ...details, criteria: value })
    }
    
   return (
    // Pick from a bunch of criteria
    // Make a description
    <section id="issues-section">
        <section id="issues-container">

            <h2>Add some information to help address this issue</h2>

            <form onSubmit={(e) => handleSubmit(e)} style={IssuesCSS.issuesContainer}>

                {/* Criteria Selection */}
                <label htmlFor="criteria">Select Criteria</label>
                <select type="select" id="criteria" name="criteria" onChange={() => updateCriteria()}>
                    <option>No Selection</option>
                    {criteriaData.map((criteria) => {
                        const subString = criteria[0].toUpperCase() + criteria.substring(1);
                        return <option key={criteria} value={criteria}>{subString}</option>
                    })}
                </select>

                {/* Description */}
                <label htmlFor="description">Make a Description</label>
                <input id="description" name="description" type="text" placeholder="Golden retriever puppy" onChange={changeDescription}></input>

                {/* User Notifications */}
                <label htmlFor="notifyUser">Would you like to receive notifications on updates?</label>
                <button id="notifyUser" name="notifyUser" onClick={(e) => handleNotifications(e)}>Yes</button>

                <input type="submit" value="Add this Tag"></input>
            </form>

        </section>
    </section>
   )
}