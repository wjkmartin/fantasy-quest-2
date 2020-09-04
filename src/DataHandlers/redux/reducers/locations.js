import loadLocationData from "../../loadLocationData";
import loadSubLocationData from "../../loadSubLocationData";
import map from "../../../Data/minimaps/city";

import city from "../../../Data/minimaps/city";
import field from "../../../Data/minimaps/field";

const locationsInitial = loadLocationData(map);
const subLocationsInitial = loadSubLocationData(locationsInitial);

const initalState = {
  locations: locationsInitial,
  subLocations: subLocationsInitial,
  map: map.nodes,
  currentLocation: locationsInitial[19],
  currentSubLocation: undefined,
  maps: { city: city, field: field },
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
    case "SET_MAP": {
      const locationData = loadLocationData(state.maps[action.mapName]);
      console.log(locationData)
      return {
        ...state,
        locations: locationData,
        map: state.maps[action.mapName].nodes,
        currentLocation: locationData.find(
          (location) => location.name === action.startLocationName
        ),
      };
    }
    default: {
      return state;
    }
  }
}
