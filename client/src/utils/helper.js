export const GetDate = (epoch) => new Date(parseInt(epoch)).toLocaleDateString();

export const measureDistance = (point1, point2, distance) => {

    // haversine formula
    const earthRad = 6371;
    const dLat = deg2rad(point2.lat - point1.lat);
    const dLng = deg2rad(point2.lng - point1.lng); 

    const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distanceData = earthRad * c; // Distance in km

    if (Math.floor(distanceData  * 1000) < distance) {
        return true;
    }
    return false;
};

const strayImg = require('../images/criteriaIcons/stray.png');
const hazardImg = require('../images/criteriaIcons/hazard.png');
const soundImg = require('../images/criteriaIcons/sound.png');
const destructionImg = require('../images/criteriaIcons/destruction.png');
const pestsImg = require('../images/criteriaIcons/pests.png');
const faultImg = require('../images/criteriaIcons/fault.png');
const obstructionImg = require('../images/criteriaIcons/obstruction.png');
const smokeImg = require('../images/criteriaIcons/smoke.png');
const fireImg = require('../images/criteriaIcons/fire.png');
const rubbishImg = require('../images/criteriaIcons/rubbish.png');
const smellImg = require('../images/criteriaIcons/smell.png');
const collisionImg = require('../images/criteriaIcons/collision.png');
const propertyImg = require('../images/criteriaIcons/property.png');
export const criteriaIcon = (criteria) => {
    const lowerCr = criteria.toLowerCase();
    let icon = "";
   
    if (lowerCr === "stray") {
        icon = strayImg
    } else if (lowerCr === "hazard") {
        icon = hazardImg
    } else if (lowerCr === "noise") {
        icon = soundImg
    } else if (lowerCr === "destruction") {
        icon = destructionImg
    } else if (lowerCr === "pests") {
        icon =  pestsImg
    } else if (lowerCr === "fault") {
        icon = faultImg
    } else if (lowerCr === "obstruction") {
        icon = obstructionImg
    } else if (lowerCr === "smoke") {
        icon = smokeImg
    } else if (lowerCr === "fire") {
        icon = fireImg
    } else if (lowerCr === "rubbish") {
        icon = rubbishImg
    } else if (lowerCr === "smell") {
        icon = smellImg
    } else if (lowerCr === "collision") {
        icon = collisionImg
    } else if (lowerCr === "property") {
        icon = propertyImg
    } else {
        icon = "";
    }
    
    return icon;
}


// Helping helpers
const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}
