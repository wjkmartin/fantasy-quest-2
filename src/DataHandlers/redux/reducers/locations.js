import loadLocationData from "../../loadLocationData";
import loadSubLocationData from "../../loadSubLocationData";
import map from "../../../Data/minimaps/city";

import city from "../../../Data/minimaps/city";
import field from "../../../Data/minimaps/field";
import sewerDungeon from "../../../Data/minimaps/sewerDungeon"
import burrowDungeon from "../../../Data/minimaps/burrowDungeon"

const locationsInitial = loadLocationData(map);
const subLocationsInitial = loadSubLocationData(locationsInitial);

const initalState = {
  locations: locationsInitial,
  savedMapStates: {city: undefined, field:undefined, sewerDungeon: undefined, burrowDungeon: undefined},
  subLocations: subLocationsInitial,
  map: map,
  currentLocation: locationsInitial[24],
  currentSubLocation: undefined,
  maps: { city: city, field: field, sewerDungeon: sewerDungeon, burrowDungeon: burrowDungeon},
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "SET_CURRENT_LOCATION_BY_ID": {
      return {
        ...state,
        currentLocation: state.locations.find(
          (location) => location.id === action.id
        ),
        currentSubLocation: undefined,
      };
    }
    case "SET_SUBLOCATION_BY_NAME": {
      return {
        ...state,
        currentSubLocation: state.subLocations.find(
          (subLocation) => subLocation.name === action.name
        ),
      };
    }
    case "SET_MAP": { //Currently can only load top level locations
      const locationData = loadLocationData(state.maps[action.mapName]);
    
      return {
        ...state,
        locations: locationData,
        map: state.maps[action.mapName],
        currentLocation: locationData.find(
          (location) => location.name === action.startLocationName
        ),
        subLocations: loadSubLocationData(locationData),
        currentSubLocation: undefined
      };
    }
    case "SET_HAS_AGGRESSIVE_ACTORS": {
      let currentLocation = state.currentLocation;
      currentLocation.hasAggressiveActors = action.flag;
      
      return {
        ...state,
        currentLocation: currentLocation
      }
    }
    case "SET_IS_DISCOVERED": {
      let locationsNew = [...state.locations]
      locationsNew[action.locationId].discovered = true
      return {
        ...state, 
          locations: [...locationsNew]     
      }
    }
    case "SAVE_CURRENT_MAP_STATE": {
      return {
        ...state,
        savedMapStates: {
          ...state.savedMapStates,
          [state.map.name]: state.locations 
        }
      }
    }
    case "LOAD_SAVED_MAP_STATE_FOR_MAP": {
      return {
        ...state,
        locations: state.savedMapStates[action.mapName]
      }
    }
    case "MODIFY_LOCATION_PROPERTY_BY_ID": {
      let locationsNew = [...state.locations]
      locationsNew[action.locationId][action.property] = action.newValue
      return {
        ...state, 
        locations: [...locationsNew]
      }
    }
    default: {
      return state;
    }
  }
}
