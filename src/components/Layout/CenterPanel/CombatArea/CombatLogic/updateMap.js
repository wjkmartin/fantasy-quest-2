import React from "react";
import styled from "styled-components";

import _ from "underscore";

import CombatAreaSquare from "../CombatAreaSquare/CombatAreaSquare";
import { animateMovePlayerToLocation } from "./animations";

import store from "../../../../../DataHandlers/redux/store";

export default function updateMap(mapData) {
  const combatState = store.getState().combat;
  const actorsById = store.getState().actors.actorsById;

  const rowLength = mapData.width;
  const CombatSquareStyled = styled(CombatAreaSquare)`
    border: 0.05em solid rgba(0, 0, 0, 0.3);
    display: flex;
    width: ${mapData.heightWidthPerSquare}rem;
    height: ${mapData.heightWidthPerSquare}rem;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: lightgrey;
    }
  `;
  let combatMap = [];
  let coords = [0, 0];

  const flatMap = [...mapData.passableMap].flat();

  const moveIsToggled = combatState.UI.moveButtonSelected;
  const attackIsToggled = combatState.UI.attackButtonSelected;

  flatMap.forEach((element, index) => {
    let actorHere = undefined;

    const coord_x = index % rowLength;
    const coord_y = Math.floor(index / rowLength);

    coords = [coord_y, coord_x];

    combatState.actorsInCombatById.forEach((actorId) => {
      if (_.isEqual(actorsById[actorId].coords, coords)) {
        actorHere = actorsById[actorId];
      }
    });

    let nonPlayerActorIsHere = actorHere !== 0 ? true : false;

    let isClickable = combatState.actorValidMovesById[0].some((element) =>
      _.isEqual(element, coords)
    );

    let isAttackable = combatState.actorValidAttackTargetsById[0].some(
      (element) => _.isEqual(element, coords)
    );

    let isActorHereThatIsValidAttackTarget = isAttackable && attackIsToggled;

    const isValidToMoveHere = isClickable && moveIsToggled;

    combatMap.push(
      <CombatSquareStyled
        key={coords}
        coords={coords}
        actorHere={actorHere !== undefined ? actorHere : undefined}
        actorToken={actorHere !== undefined ? actorHere.token : undefined}
        isValidToMoveHere={isValidToMoveHere}
        isActorHereThatIsValidAttackTarget={isActorHereThatIsValidAttackTarget}
        nonPlayerActorIsHere={nonPlayerActorIsHere}
        moveIsToggled={moveIsToggled}
        attackIsToggled={attackIsToggled}
        animateMovePlayerToLocation={animateMovePlayerToLocation}
      />
    );
  });
  return combatMap;
}
