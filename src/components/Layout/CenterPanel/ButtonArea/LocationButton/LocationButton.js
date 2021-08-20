import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";

export default function LocationButton(props) {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.locations);
  const currentLocation = locationState.currentLocation;

  function handleActionButton(action, currentLocation) {
    console.log(action.type);
    if (action === "top") {
      dispatch(actions.setLocationById(currentLocation.id));
    } else if (action.type === "justButton") {
      dispatch(action.onPress);
    } else if (action.type === "sub") {
      dispatch(actions.setSubLocationByName(action.name));
    } else if (action.type === "transition") {
      dispatch(actions.saveCurrentMapState());
      dispatch(actions.setMap(action.mapLink, action.locationToTransition));
      if (locationState.savedMapStates[action.mapLink] !== undefined) {
        dispatch(actions.loadSavedMapStateForMap(action.mapLink));
      }
    }
  }

  return (
    <button onClick={() => handleActionButton(props.action, currentLocation)}>
      {props.label}
    </button>
  );
}
