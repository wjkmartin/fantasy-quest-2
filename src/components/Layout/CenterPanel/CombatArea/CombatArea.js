import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import _ from 'underscore';

import combat from '../../../../DataHandlers/redux/slices/combat';

import CombatActionsPanel from './CombatActionsPanel/CombatActionsPanel';
import TurnOrderArea from './TurnOrderArea/TurnOrderArea';
import CombatAreaSquare from './CombatAreaSquare/CombatAreaSquare';

import styles from './CombatArea.module.css';

import generateAndSetInitiative from './CombatLogic/generateAndSetInitiative';
import nextTurn from './CombatLogic/nextTurn';

import combatMaps from '../../../../Data/combatMaps/combatMaps';

const CombatGrid = styled.div`
  display: grid;
  background-image: url(${(props) => props.mapData.mapImage});
  grid-template-columns: repeat(
    ${(props) => props.mapData.width},
    ${(props) => props.mapData.heightWidthPerSquare}rem
  );
  grid-template-rows: repeat(
    ${(props) => props.mapData.height},
    ${(props) => props.mapData.heightWidthPerSquare}rem
  );
  justify-content: center;
  transform: rotateX(60deg) rotateY(0deg) rotateZ(45deg);
  width: ${(props) =>
    props.mapData.width * props.mapData.heightWidthPerSquare}rem;
  position: relative;
  box-shadow: 20px 10px 10px -2px #1e1c1a;
  background-size: contain;
  background-repeat: no-repeat;

  &:after {
    content: '';
    width: ${(props) =>
      props.mapData.width * props.mapData.heightWidthPerSquare}rem;
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
    content: '';
    width: 10px;
    height: ${(props) =>
      props.mapData.height * props.mapData.heightWidthPerSquare}rem;
    background-color: #a08670;
    transform: translateX(
        ${(props) =>
          props.mapData.width * props.mapData.heightWidthPerSquare}rem
      )
      skewY(45deg) translateY(5px);
    transform-origin: center;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
`;

function CombatArea() {
  const combatState = useSelector((state) => state.combat);
  const UIState = useSelector((state) => state.UI);
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  const actorsById = useSelector((state) => state.actors.actorsById);
  const actorIdsInCombat = useSelector(
    (state) => state.combat.actorsInCombatById
  );

  const actorIdsByLocation = useSelector(
    (state) => state.actors.byLocationName
  );

  const actorValidMovesById = useSelector((state) => state.combat.actorValidMovesById) || [];

  const items = useSelector((state) => state.items);

  const dispatch = useDispatch();

  let mapData = {};

  Object.assign(mapData, combatMaps['notDefined']); // loads a simple map if a proper battlemap is not defined in battlemaps.js

  if (combatMaps[currentLocation.name] !== undefined) {
    Object.assign(mapData, combatMaps[currentLocation.name]);
  } else if (currentSubLocation !== undefined) {
    if (combatMaps[currentSubLocation.name] !== undefined) {
      Object.assign(mapData, combatMaps[currentSubLocation.name]);
    }
  }

  if (!combatState.setupDone) {
    dispatch(combat.actions.setPassableMap(mapData.passableMap));
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
      dispatch(combat.actions.setInitiativeList(newInitiative));
    }
  }

  const combatMap = updateMap(mapData, items);

  function combatSetup() {
    dispatch(combat.actions.resetActorCombatPropsById(0));
    dispatch(
      combat.actions.setActorCoordsById({
        actorId: 0,
        coords: {
          x: mapData.playerStartCoords[0],
          y: mapData.playerStartCoords[1],
        },
      })
    );

    actorIdsByLocation[
      currentSubLocation !== undefined
        ? currentSubLocation.name
        : currentLocation.name
    ].forEach((actorId, index) => {
      const startCoords = mapData.enemyStartCoords[index];
      dispatch(combat.actions.resetActorCombatPropsById(actorId));
      dispatch(
        combat.actions.setActorCoordsById({
          actorId: actorId,
          coords: { x: startCoords[0], y: startCoords[1] },
        })
      );
    });

    let initiative = generateAndSetInitiative(actorIdsInCombat, actorsById);

    dispatch(combat.actions.setInitiativeList(initiative));
    dispatch(combat.actions.setCurrentTurnById(initiative[0]));

    if (initiative[0] !== 0 && !combatState.setupDone) {
      nextTurn();
    }

    dispatch(combat.actions.setCombatSetupDone());
  }

  function updateMap(mapData, items) {
    console.log('updateMap');
    const rowLength = mapData.width;
    let combatMap = [];
    const flatMap = [...mapData.passableMap].flat();

    const attackIsToggled = UIState.combatBasicAttackButtonSelected;

    flatMap.forEach((element, index) => {
      let actorHereId = undefined;
      const coords = {};
      coords.x = Math.floor(index / rowLength); 
      coords.y = index % rowLength;

      actorIdsInCombat.forEach((actorId) => {
        if (
          combatState.actorCoordsById[actorId]?.x === coords.x &&
          combatState.actorCoordsById[actorId]?.y === coords.y
        ) {
          actorHereId = actorId;
        }
      });

      let isAttackable = combatState.actorValidAttackTargetsById[0].some(
        (element) => _.isEqual(element, coords)
      );

      let isActorHereThatIsValidAttackTarget = isAttackable && attackIsToggled;

      combatMap.push(
        <CombatAreaSquare
          key={`__coords__${coords.x}${coords.y}`}
          coords={coords}
          actorHere={actorsById[actorHereId] || undefined}
          actorToken={actorsById[actorHereId]?.token || undefined}
          isValidToMoveHere={actorValidMovesById[0].some(
            (element) => {return (element[0] === coords.x && element[1] === coords.y)}
          )}
          isActorHereThatIsValidAttackTarget={
            isActorHereThatIsValidAttackTarget
          }
          passableMap={mapData.passableMap}
          actorsById={actorsById}
          combatState={combatState}
          items={items}
        />
      );
    });
    return combatMap;
  }

  return (
    <div className={styles.CombatArea}>
      <TurnOrderArea state={combatState} />
      <div className={styles.combatGridWrapper}>
        <CombatGrid mapData={mapData} className={styles.combatGrid}>
          {combatMap.map((e) => e)}
        </CombatGrid>
      </div>
      <CombatActionsPanel />
    </div>
  );
}

export default CombatArea;
