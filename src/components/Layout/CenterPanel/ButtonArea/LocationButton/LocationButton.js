import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";

export default function LocationButton(props) {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.locations.currentLocation);

  function handleActionButton(action, currentLocation) {
    if (action === "top") {
      dispatch(actions.setLocationById(currentLocation.id));
    } else if (action.type === "sub") {
      dispatch(actions.setSubLocationByName(action.name));
    } else if (action.type === "transition") {
      dispatch(actions.setMap(action.mapLink, action.locationToTransition));
    }
  }

  return (
    <button
      onClick={() => handleActionButton(props.action, currentLocation)}
    >
      {props.label}
    </button>
  );
}
