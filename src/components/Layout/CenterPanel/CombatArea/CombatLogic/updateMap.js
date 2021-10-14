import React from "react";
import _ from "underscore";
import CombatAreaSquare from "../CombatAreaSquare/CombatAreaSquare";

export default function updateMap(mapData, combatState, actorsById) {
  const rowLength = mapData.width;
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
      <CombatAreaSquare
        key={coords}
        coords={coords}
        actorHere={actorHere !== undefined ? actorHere : undefined}
        actorToken={actorHere !== undefined ? actorHere.token : undefined}
        isValidToMoveHere={isValidToMoveHere}
        isActorHereThatIsValidAttackTarget={isActorHereThatIsValidAttackTarget}
        nonPlayerActorIsHere={nonPlayerActorIsHere}
        moveIsToggled={moveIsToggled}
        attackIsToggled={attackIsToggled}
      />
    );
  });
  return combatMap;
}
