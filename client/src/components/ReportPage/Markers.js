import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth';

// Map components
import { Marker, InfoWindow } from '@react-google-maps/api';

// Queries
import { QUERY_ALL_TAGS } from '../../utils/queries';

// Helpers
import { criteriaIcon, measureDistance } from '../../utils/helper';

export const Markers = ({circleInfo, marker}) => {
    const { loading, error, data } = useQuery(QUERY_ALL_TAGS);

    const [activeMarker, setActiveMarker] = useState(null);

    if (error) {
        console.log(error)
        alert("Error")
        return 
    } else if (loading) {
        return <div>Loading data</div>
    }

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
    };

    const { getAllTags } = data;

    const tagsData = getAllTags.map(user => {
        let tagsData = user.tags.filter(tag => measureDistance(marker, tag, circleInfo.radius));

        tagsData = tagsData.map(tag => {
            return { ...tag, criteriaIcon: criteriaIcon(tag.criteria) }
        });

        return tagsData;
    });

    const updateCommentUsed = (tagId) => {
        if (!Auth.loggedIn()) {
            return alert("Please sign in");
        }

        localStorage.setItem("currentCommentTag", tagId);
        window.location.assign('/commentInfo');
    }
 
    return (
        <>
            {tagsData[0].map((tag) => {
                return (
                    <Marker 
                        icon={tag.criteriaIcon}
                        key={tag.date}
                        position={tag}
                        onClick={() => handleActiveMarker(tag._id)}
                    >
                        {activeMarker === tag._id && (
                            <InfoWindow 
                            position={tag}
                            >
                                <article>
                                    <h3>Criteria: {tag.criteria}</h3>
                                    <h4>User: {tag.user.username}</h4>
                                    <p>"{tag.description}"</p>
                                    <button onClick={() => updateCommentUsed(tag._id)}>Reply</button>
                                </article>
                            </InfoWindow>
                        )}
                    </Marker>
                )
            })}
        </>
    )
}