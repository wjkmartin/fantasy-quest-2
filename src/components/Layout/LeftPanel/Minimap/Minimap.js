import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import actions from "../../../../DataHandlers/redux/actions";

import styles from "./Minimap.module.css";

import MinimapNode from "./MinimapNode/MinimapNode";

function populateNodes(
  currentLocation,
  locations,
  mapWidth,
  dispatch
) {
  function isNeighbor(currentLocationId, locationId, mapWidth) {
    if (
      currentLocationId - 1 === locationId &&
      currentLocationId % mapWidth !== 0
    ) {
      return true;
    } else if (
      currentLocationId + 1 === locationId &&
      currentLocationId % mapWidth !== mapWidth - 1
    ) {
      return true;
    } else if (
      currentLocationId - mapWidth === locationId ||
      currentLocationId + mapWidth === locationId
    ) {
      return true;
    } else return false;
  }

  const nodes = locations.map((location) => {
    if (location === undefined) return <div />;
    else
      return (
        <MinimapNode
          icon={location.icon}
          onClick={
            isNeighbor(currentLocation.id, location.id, mapWidth)
              ? () => { 
                  loadLocation(location.id, location.name, dispatch)            
                }
              : undefined
          }
          key={location.id}
        />
      );
  });
  return nodes;
}

function loadLocation(locationId, locationName, dispatch) {
  dispatch(actions.setLocationById(locationId))
  dispatch(actions.setActiveActorInfoWindowById(undefined))
  dispatch(actions.setMainImage(locationName))
}

function Minimap() {
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const inCombat = useSelector((state) => state.combat.inCombat);
  const minimap = useSelector((state) => state.locations.map);
  const locations = useSelector((state) => state.locations.locations);

  const dispatch = useDispatch();

  const mapNodes = populateNodes(
    currentLocation,
    locations,
    minimap[0].length,
    dispatch
  ).map((node) => node);

  const mapColumns = {
    gridTemplateColumns:
      "repeat(" + minimap[0].length + Math.floor(100 / minimap[0].length) + ")",
  };

  return (
    <div className={`${styles.Minimap} ${mapColumns}`}>
      {currentLocation.type === "top" && !inCombat ? mapNodes : ""}{" "}
    </div>
  );
}

export default Minimap;
