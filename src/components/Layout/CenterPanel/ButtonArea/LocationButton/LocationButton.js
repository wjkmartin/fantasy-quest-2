import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";

import monsterData from "../../../../../Data/actors/monsters/monsterList";
import miniMaps from "../../../../../Data/minimaps/miniMaps";

export default function LocationButton(props) {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.locations);
  const currentLocation = locationState.currentLocation;

  function handleActionButton(action, currentLocation) {
    dispatch(actions.setActiveActorInfoWindowById(undefined));
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
        //if there's a saved map state
        dispatch(actions.loadSavedMapStateForMap(action.mapLink));
      } else {
        //visiting this map for the first time
        miniMaps[action.mapLink].nodes.forEach((locationRow) => {
          locationRow.forEach((location) => {
            if (location === undefined) {
              return;
            } else if (location.monstersToSpawn === undefined) {
              return;
            } else {
              location.monstersToSpawn.forEach((monster) => {
                dispatch(
                  //create monster of given type in actors list with location.name
                  actions.createNewActorFromDataFileAndLocation(
                    monsterData[monster],
                    location.name
                  )
                );
              });
            }
          });
        });
      }
    }
  }

  return (
    <button onClick={() => handleActionButton(props.action, currentLocation)}>
      {props.label}
    </button>
  );
}
