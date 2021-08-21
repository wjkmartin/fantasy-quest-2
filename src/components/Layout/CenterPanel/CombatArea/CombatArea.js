import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import _ from "underscore";

import actions from "../../../../DataHandlers/redux/actions";

import updateMap from "./CombatLogic/updateMap";

import CombatActionsPanel from "./CombatActionsPanel/CombatActionsPanel";
import TurnOrderArea from "./TurnOrderArea/TurnOrderArea";

import styles from "./CombatArea.module.css";

import generateAndSetInitiative from "./CombatLogic/generateAndSetInitiative";
import nextTurn from "./CombatLogic/nextTurn";

import combatMaps from "../../../../Data/combatMaps/combatMaps";
import notDefined from "../../../../Data/combatMaps/notDefined";

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

  const dispatch = useDispatch();

  const actorsInCombatById = combatState.actorsInCombatById.map((id) => {
    return actorsById[id];
  });

  let mapData = combatMaps["notDefined"]; // loads a simple map if a proper battlemap is not defined in battlemaps.js

  if (combatMaps[currentLocation.name] !== undefined) {  
    mapData = combatMaps[currentLocation.name];
  } else if (currentSubLocation !== undefined) {
    if (combatMaps[currentSubLocation.name] !== undefined) {
      mapData = combatMaps[currentSubLocation.name];
    }
  }

  const combatMap = updateMap(mapData, actorsInCombatById);

  if (!combatState.setupDone) {
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
    ].forEach((actor) => {
      dispatch(actions.resetActorCombatPropsById(actor.id));
      dispatch(
        actions.setActorLocationCombat(actor.id, [
          mapData.enemyStartCoords[0][0],
          mapData.enemyStartCoords[0][1],
        ])
      );
    });

    dispatch(actions.setPassableMap(mapData.passableMap));

    let initiative = generateAndSetInitiative(actorsInCombatById);

    initiative.forEach((id, index) => {
      dispatch(actions.setActorInitiative(id, index));
    });

    dispatch(actions.setInitiativeOrderList(initiative));
    dispatch(actions.setCurrentTurnById(initiative[0]));

    dispatch(actions.setSetupToDone());

    if (initiative[0] !== 0) {
      nextTurn();
    }
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
