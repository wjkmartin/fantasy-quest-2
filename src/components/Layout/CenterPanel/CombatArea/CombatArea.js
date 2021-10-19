import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import _ from "underscore";

import actions from "../../../../DataHandlers/redux/actions";

import CombatActionsPanel from "./CombatActionsPanel/CombatActionsPanel";
import TurnOrderArea from "./TurnOrderArea/TurnOrderArea";
import CombatAreaSquare from "./CombatAreaSquare/CombatAreaSquare"

import styles from "./CombatArea.module.css";

import generateAndSetInitiative from "./CombatLogic/generateAndSetInitiative";
import nextTurn from "./CombatLogic/nextTurn";

import combatMaps from "../../../../Data/combatMaps/combatMaps";

function CombatArea() {
  const combatState = useSelector((state) => state.combat);
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  const actorsById = useSelector((state) => state.actors.actorsById);
  const actorsByLocation = useSelector((state) => state.actors.byLocationName);
  const items = useSelector((state) => state.items)

  const dispatch = useDispatch();

  const actorsInCombatById = combatState.actorsInCombatById.map((id) => {
    return actorsById[id];
  });

  let mapData = {};

  Object.assign(mapData, combatMaps["notDefined"]); // loads a simple map if a proper battlemap is not defined in battlemaps.js

  if (combatMaps[currentLocation.name] !== undefined) {
    Object.assign(mapData, combatMaps[currentLocation.name]);
  } else if (currentSubLocation !== undefined) {
    if (combatMaps[currentSubLocation.name] !== undefined) {
      Object.assign(mapData, combatMaps[currentSubLocation.name]);
    }
  }

  const combatMap = updateMap(mapData, combatState, actorsById, items);

  if (!combatState.setupDone) {
    dispatch(actions.setPassableMap(mapData.passableMap));
    combatSetup();
  } else {
    //refreshes initative
    const initiative = combatState.initiativeList;
    let newInitiative = [];

    combatState.actorsInCombatById.forEach((id) => {
      const actorIndex = initiative.findIndex(
        (_id) => Number(_id) === Number(id)
      );
      if (actorIndex !== -1) {
        newInitiative.push(Number(id));
      }
    });

    if (!_.isEqual(newInitiative, initiative)) {
      dispatch(actions.setInitiativeOrderList(newInitiative));
    }
  }

  function combatSetup() {
    dispatch(actions.resetActorCombatPropsById(0));

    dispatch(
      actions.setActorLocationCombat(0, [
        mapData.playerStartCoords[0],
        mapData.playerStartCoords[1],
      ])
    );

    actorsByLocation[
      currentSubLocation !== undefined
        ? currentSubLocation.name
        : currentLocation.name
    ].forEach((actor, index) => {
      const startCoords = mapData.enemyStartCoords[index];
      dispatch(actions.resetActorCombatPropsById(actor.id));
      dispatch(actions.setActorLocationCombat(actor.id, startCoords));
    });

    let initiative = generateAndSetInitiative(actorsInCombatById);

    initiative.forEach((id, index) => {
      dispatch(actions.setActorInitiative(id, index));
    });

    dispatch(actions.setInitiativeOrderList(initiative));
    dispatch(actions.setCurrentTurnById(initiative[0]));

    if (initiative[0] !== 0 && !combatState.setupDone) {
      nextTurn();
    }

    dispatch(actions.setSetupToDone());

    
  }

  function updateMap(mapData, combatState, actorsById, items) {
    const rowLength = mapData.width;
    let combatMap = [];
    let coords = [0, 0];
    const flatMap = [...mapData.passableMap].flat(); 

    const moveIsToggled = combatState.UI.moveButtonSelected
    const attackIsToggled = combatState.UI.attackButtonSelected
  
    flatMap.forEach((element, index) => {
      let actorHere = undefined;
  
      const coord_x = index % rowLength;
      const coord_y = Math.floor(index / rowLength);
  
      coords = [coord_y, coord_x]

  
      combatState.actorsInCombatById.forEach((actorId) => {
        if (_.isEqual(actorsById[actorId].coords, coords)) {
          actorHere = actorsById[actorId];
        }
      });
  
      let nonPlayerActorIsHere = actorHere !== 0 ? true : false;

      let isClickable = combatState.actorValidMovesById[0].some(
        (element) => _.isEqual(element, coords)
      );
  
      let isAttackable = combatState.actorValidAttackTargetsById[0].some(
        (element) => _.isEqual(element, coords)
      );
  
      let isActorHereThatIsValidAttackTarget = isAttackable && attackIsToggled;
  
      const isValidToMoveHere = isClickable && moveIsToggled;
  
  
      combatMap.push(
        <CombatAreaSquare
          key={coords}
          coords={coords}
          actorHere={actorHere !== undefined ? actorHere : undefined}
          actorToken={actorHere !== undefined ? actorHere.token : undefined}
          isValidToMoveHere={isValidToMoveHere}
          isActorHereThatIsValidAttackTarget={isActorHereThatIsValidAttackTarget}
          moveIsToggled={moveIsToggled}
          attackIsToggled={attackIsToggled}
          mapData={mapData}
          actorsById={actorsById}
          combatState={combatState}
          items={items}
        />
      );
    });
    return combatMap;
  }

  const CombatGrid = styled.div`
    display: grid;
    background-image: url(${mapData.mapImage});
    grid-template-columns: repeat(
      ${mapData.width},
      ${mapData.heightWidthPerSquare}rem
    );
    grid-template-rows: repeat(
      ${mapData.height},
      ${mapData.heightWidthPerSquare}rem
    );
    justify-content: center;
    transform: rotateX(60deg) rotateY(0deg) rotateZ(45deg);
    width: ${mapData.width * mapData.heightWidthPerSquare}rem;
    position: relative;
    box-shadow: 20px 10px 10px -2px #1e1c1a;
    background-size: contain;
    background-repeat: no-repeat;

    &:after {
      content: "";
      width: ${mapData.width * mapData.heightWidthPerSquare}rem;
      height: 10px;
      background-color: #a08670;
      transform: skew(45deg) translateX(5px);
      transform-origin: center;
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
    }

    &:before {
      position: absolute;
      content: "";
      width: 10px;
      height: ${mapData.height * mapData.heightWidthPerSquare}rem;
      background-color: #a08670;
      transform: translateX(${mapData.width * mapData.heightWidthPerSquare}rem)
        skewY(45deg) translateY(5px);
      transform-origin: center;
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
    }
  `;

  return (
    <div className={styles.CombatArea}>
      <TurnOrderArea state={combatState} />
      <div className={styles.combatGridWrapper}>
        <CombatGrid className={styles.combatGrid}>
          {combatMap.map((e) => e)}
        </CombatGrid>
      </div>
      <CombatActionsPanel />
    </div>
  );
}

export default CombatArea;
