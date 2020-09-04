import Location from "../Entities/Location/Location";

const loadSubLocationData = (locations) => { //should recursively search the sublocations and add more sublocations
    let subLocations = [];
    locations.forEach((locationData, index) => {
        if (locationData.buttons) {
            locationData.buttons.forEach(button => {
                subLocations.push(new Location(index, Object.values(button)[0])) })
        }
    })
    return subLocations
}

export default loadSubLocationData;
