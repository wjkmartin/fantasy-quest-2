import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import actions from "../../../../DataHandlers/redux/actions";

import MinimapNode from "./MinimapNode/MinimapNode";

function populateNodes(currentLocation, locations, mapWidth, dispatch) {
  const nodes = locations.map((location) => {
    if (location === undefined || location.discovered === false)
      return <div style={{ width: "25px", height: "25px" }} />;
    else
      return (
        <MinimapNode
          icon={location.icon}
          onClick={
            isTravelAllowed(currentLocation, location, mapWidth)
              ? () => onClickNode(location, locations, mapWidth, dispatch)
              : undefined
          }
          key={location.id}
          isHere={currentLocation.id === location.id ? true : false}
          isHidden={location.type === "hidden" ? true : false}
        />
      );
  });
  return nodes;
}

function isTravelAllowed(currentLocation, location, mapWidth) {
  if (currentLocation.hasAggressiveActors) {
    return false;
  } else if (isNeighbor(currentLocation.id, location.id, mapWidth)) {
    return true;
  } else return false;
}

function onClickNode(location, locations, mapWidth, dispatch) {
  loadLocation(location, locations, mapWidth, dispatch);
}

function loadLocation(location, locations, mapWidth, dispatch) {
  discoverAdjacentNodes(location, locations, mapWidth, dispatch);
  dispatch(actions.setLocationById(location.id));
  dispatch(actions.setActiveActorInfoWindowById(undefined));
}

function discoverAdjacentNodes(location, locations, mapWidth, dispatch) {
  const currentLocationId = location.id;
  const topId =
    currentLocationId > mapWidth ? currentLocationId - mapWidth : undefined;
  const leftId =
    currentLocationId % mapWidth === 0 ? undefined : currentLocationId - 1;
  const rightId =
    (currentLocationId + 1) % mapWidth === 0
      ? undefined
      : currentLocationId + 1;
  const bottomId =
    currentLocationId + mapWidth > locations.length
      ? undefined
      : currentLocationId + mapWidth;

  const dirs = [topId, leftId, rightId, bottomId];

  dirs.forEach((dir) => {
    if (dir !== undefined && locations[dir].discovered === false) {
      dispatch(actions.setIsDiscovered(dir));
    }
  });
}

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

function Minimap() {
  const currentSuperLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  const currentLocation =
    currentSubLocation !== undefined
      ? currentSubLocation
      : currentSuperLocation;

  const inCombat = useSelector((state) => state.combat.inCombat);
  const minimap = useSelector((state) => state.locations.map);
  const locations = useSelector((state) => state.locations.locations);
  const inConversation = useSelector((state) => state.UI.inConversation);

  const actorsAtCurrentLocation = useSelector(
    (state) => state.actors.byLocationName[currentLocation.name]
  );

  let isAggressiveActorAtCurrentLocation = false;

  if (actorsAtCurrentLocation !== undefined) {
    actorsAtCurrentLocation.forEach((actor) => {
      if (actor.isAggressive) {
        isAggressiveActorAtCurrentLocation = true;
      }
    });
  }

  const dispatch = useDispatch();

  discoverAdjacentNodes(
    currentSuperLocation,
    locations,
    minimap.nodes[0].length,
    dispatch
  );

  dispatch(actions.setHasAggressiveActors(isAggressiveActorAtCurrentLocation));

  const mapNodes = populateNodes(
    currentSuperLocation,
    locations,
    minimap.nodes[0].length,
    dispatch
  ).map((node) => node);

  const MinimapStyled = styled.div`
    & {
      z-index: 99;
      position: relative;
      min-height: 40%;
      display: grid;
      padding: 2rem;
      grid-template-columns: repeat(
        ${minimap.nodes[0].length},
        ${Math.floor(100 / minimap.nodes[0].length)}%
      );
      justify-items: center;
      align-items: center;
    }
    &:before {
      z-index: -1;
      position: absolute;
      display: flex;
      text-align: center;
      justify-content: center;
      content: " ";
      min-width: 90%;
      min-height: 90%;
      box-shadow: 0px 0px 2px black, 2px 5px 125px #8f5922 inset;
      background: #fffef0;
      filter: url(#wavy2);
      background-image: url(data:image/png;base64,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);
    }
  `;

  return (
    <MinimapStyled>
      {currentLocation.type === "top" && !inCombat && !inConversation ? mapNodes : ""}{" "}
    </MinimapStyled>
  );
}

export default Minimap;
