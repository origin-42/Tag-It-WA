import { useMemo, useState } from "react";
import Auth from '../utils/auth';
import { IssuesCSS } from '../css/issues';
import { criteriaData } from '../utils/criteriaData';
import { ADD_TAG } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { Button } from '../css/button';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { toBase64 } from '../utils/helper';

// Media
import { useMediaQuery } from "../utils/useMediaQuery";

// Animations
import '../css/animations.css';

export const Issues = () => {

    // Get the coordinates once user accepts.
    const coords = useMemo(() => JSON.parse(localStorage.getItem("coords")), []);
    const [details, changeDetails] = useState({
        lat: coords.lat,
        lng: coords.lng,
        date: Date.now,
        image: "",
        criteria: "",
        description: "",
        active: true,
        resolved: false,
        notifyUser: false,
        confirmed: 0,
        denied: 0
    });

    // CSS only
    const isSmall = useMediaQuery('(min-width: 600px)');

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
    };

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
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const convertFile = await toBase64(file);
        changeDetails({ ...details, image: convertFile });
    };
    
   return (
    // Pick from a bunch of criteria
    // Make a description
    <section id="issues-section" style={IssuesCSS.issuesSection}>
        <section id="issues-container" style={isSmall? IssuesCSS.issuesContainer: IssuesCSS.issuesContainerSm}>

            <div style={IssuesCSS.quoteContainer}>
                <h2 style={IssuesCSS.mainTitle}><FaQuoteLeft /> Add some information to help others address this issue <FaQuoteRight style={IssuesCSS.quote} /></h2>
            </div>
            

            <form 
                onSubmit={(e) => handleSubmit(e)} 
                style={IssuesCSS.form}
            >

                {/* Criteria Selection */}
                <label htmlFor="criteria" title="Criteria for issue" style={IssuesCSS.title}>Select Criteria</label>
                <select 
                    type="select" 
                    id="criteria" 
                    name="criteria" 
                    onChange={() => updateCriteria()}
                    style={IssuesCSS.options}
                    >
                    <option>No Selection</option>
                    {criteriaData.map((criteria) => {
                        const subString = criteria[0].toUpperCase() + criteria.substring(1);
                        return <option key={criteria} value={criteria}>{subString}</option>
                    })}
                </select>

                {/* Description */}
                <label htmlFor="description" title="Description of issue" style={IssuesCSS.title}>Make a Description</label>
                <input 
                    id="description" 
                    name="description" 
                    type="text" 
                    placeholder="Golden retriever puppy" 
                    onChange={changeDescription}
                    style={IssuesCSS.options}
                    ></input>

                {/* Image */}
                <label htmlFor="image" title="Image upload" style={IssuesCSS.title}>Add an Image of the Issue</label>
                <input 
                    id="image" 
                    name="image" 
                    type="file" 
                    placeholder="Golden retriever puppy" 
                    accept="image/*"
                    size={14000}
                    onChange={handleImage}
                    style={IssuesCSS.options}
                    ></input>

                {/* User Notifications */}
                <label htmlFor="notifyUser" title="Would you like ot receive notifications?" style={IssuesCSS.title}>Would you like to receive notifications on updates?</label>
                <button 
                    id="notifyUser" 
                    name="notifyUser" 
                    onClick={(e) => handleNotifications(e)}
                    style={Button.smallBlue} 
                    >Yes</button>

                <input 
                    type="submit" 
                    value="Add this Tag" 
                    style={Button.smallBlue}
                    ></input>
            </form>

        </section>
    </section>
   )
}