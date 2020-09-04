import React, { useState, useCallback } from "react";
import _ from "underscore";

import { useSelector, useDispatch } from "react-redux";

import styles from "./CombatAreaSquare.module.css";
import actions from "../../../../../DataHandlers/redux/actions";

//there's too much happening here (what it is ain't exactly clear)

//ITS FUCKING TERRIBLE

export default function CombatAreaSquare(props) {
  let coordsState = useState(props.coords);
  let actorHereById = undefined;

  const actorsById = useSelector((state) => state.actors.actorsById);
  const combatState = useSelector((state) => state.combat);

  const actorsInCombatById = combatState.actorsInCombatById.map(id => {
    return actorsById[id]
  })

  const validMovesPlayer = combatState.actorValidMovesById[0];
  const validAttacksPlayer = combatState.actorValidAttackTargetsById[0];

  const moveIsToggled = combatState.UI.moveButtonSelected;
  const attackIsToggled = combatState.UI.attackButtonSelected;

  let dispatch = useDispatch();

  const changeActorLocation = useCallback(
    (id, coords) => dispatch(actions.setActorLocationCombat(id, coords)),
    [dispatch]
  );

  const attackActorWithAbility = useCallback(
    (attackerId, targetId, ability) =>
      dispatch(actions.attackTargetWithAbility(attackerId, targetId, ability)),
    [dispatch]
  );

  const setActiveActorInfoWindowById = useCallback(
    (id) => dispatch(actions.setActiveActorInfoWindowById(id)),
    [dispatch]
  );

  let moveStyle,
    attackStyle = " ";
  let actorName = "";
  let isValidToMoveHere = undefined;
  let isActorHereThatIsValidAttackTarget = undefined;
  let coords = coordsState[0];
  let nonPlayerActorIsHere;


  for (const key in actorsInCombatById) {
    let isClickable =
      validMovesPlayer.find((element) => _.isEqual(element, coords)) !==
      undefined;
    isValidToMoveHere = isClickable && moveIsToggled;

    let isAttackable =
      validAttacksPlayer.find((element) => _.isEqual(element, coords)) !==
      undefined;

    isActorHereThatIsValidAttackTarget = isAttackable && attackIsToggled;

    if (_.isEqual(actorsInCombatById[key].coords, coords)) {
      actorName = actorsInCombatById[key].actorName;
      isValidToMoveHere = false;
      if (Number(key) !== 0) {
        nonPlayerActorIsHere = true;
        actorHereById = key;
      }
    }

    if (isActorHereThatIsValidAttackTarget) {
      attackStyle = styles.validAttackArea;
    }
  }

  if (isValidToMoveHere) {
    moveStyle = styles.validMoveArea;
  }

  function onClickMovement() {
    changeActorLocation(0, coords);
    dispatch(actions.toggleMoveClick());
    moveStyle = " ";
  }

  function onClickAttackSquare() {
    const ability = { damage: 5 + _.random(1, 4) }; //need generalization and this whole thing should be a seperate file
    attackActorWithAbility(0, actorHereById, ability); //requires generalization and de-shitification
    dispatch(
      actions.addMessageToActivityLog(`You attack for ${ability.damage}!`)
    );
    dispatch(actions.toggleAttackClick());
    attackStyle = " ";
    if (actorsById[actorHereById].health <= 0) { //eventually should set actor to 1hp (just a duel... not to the death)
      dispatch(actions.endCombat())
      dispatch(actions.addMessageToActivityLog(`You've won the duel!`))
    } 
  }

  function onClickShowInfo() {
    setActiveActorInfoWindowById(actorHereById);
  }

  return (
    <div
      onClick={
        isValidToMoveHere
          ? () => {
              onClickMovement();
            }
          : isActorHereThatIsValidAttackTarget
          ? () => {
              onClickAttackSquare();
            }
          : nonPlayerActorIsHere && !moveIsToggled && !attackIsToggled
          ? () => {
              onClickShowInfo();
            }
          : () => {}
      }
      className={props.className + " " + moveStyle + " " + attackStyle}
    >
      {actorName}
    </div>
  );
}
