import React from "react";

import { useDispatch, useSelector } from "react-redux";
import UI from "../../../../../DataHandlers/redux/slices/UI";
import actors from "../../../../../DataHandlers/redux/slices/actors";
import locations from "../../../../../DataHandlers/redux/slices/locations";

import monsterData from "../../../../../Data/actors/monsters/monsterList";
import miniMaps from "../../../../../Data/minimaps/miniMaps";

export default function LocationButton(props) {
  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.locations);
  const currentLocation = locationState.currentLocation;

  function handleActionButton(action, currentLocation) {
    dispatch(UI.actions.setActiveItemOrNpcTarget({type: null, id: null}));
    if (action === "top") {
      dispatch(locations.actions.setCurrentLocationById({id: currentLocation.id}));
    } else if (action.type === "justButton") {
      dispatch(action.onPress);
    } else if (action.type === "sub") {
      dispatch(locations.actions.setSubLocationByName({name: action.name}));
    } else if (action.type === "transition") {
      dispatch(locations.actions.saveCurrentMapState());
      dispatch(locations.actions.setMap({mapName: action.mapLink, startLocationName: action.locationToTransition}));
      if (locationState.savedMapStates[action.mapLink] !== undefined) {
        //if there's a saved map state
        dispatch(locations.actions.loadSavedMapState({mapName: action.mapLink}));
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
                  actors.actions.createNewActorFromDataFileAndLocation(
                    {actorData: monsterData[monster],
                    location: location.name}
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
