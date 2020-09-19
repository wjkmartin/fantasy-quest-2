import React from "react";
import _ from "underscore";

import { useSelector, useDispatch } from "react-redux";

import styles from "./CombatAreaSquare.module.css";
import actions from "../../../../../DataHandlers/redux/actions";

//there's too much happening here (what it is ain't exactly clear)

//ITS FUCKING TERRIBLE

export default function CombatAreaSquare(props) {
  const coords = props.coords;

  const actorsById = useSelector((state) => state.actors.actorsById);
  const combatState = useSelector((state) => state.combat);

  const actorOnThisSquare = Object.values(actorsById).find((actor) =>
    _.isEqual(actor.coords, coords)
  ); //should actually be just actors in combat

  const actorOnThisSquareId =
    actorOnThisSquare !== undefined ? actorOnThisSquare.id : undefined;

  let actorToken;
  if (actorOnThisSquareId !== undefined) {
    actorToken = (
      <img
        className={styles.actorToken}
        alt={""}
        src={actorsById[actorOnThisSquareId].token}
      />
    );
  }

  const validMovesPlayer = combatState.actorValidMovesById[0];
  const validAttacksPlayer = combatState.actorValidAttackTargetsById[0];

  const moveIsToggled = combatState.UI.moveButtonSelected;
  const attackIsToggled = combatState.UI.attackButtonSelected;

  let dispatch = useDispatch();

  let moveStyle,
    attackStyle = " ";
  let isValidToMoveHere = actorOnThisSquareId === undefined ? true : false;

  let nonPlayerActorIsHere = actorOnThisSquareId !== 0 ? true : false;

  let isClickable =
    validMovesPlayer.find((element) => _.isEqual(element, coords)) !==
    undefined;
  isValidToMoveHere = isClickable && moveIsToggled;

  let isAttackable =
    validAttacksPlayer.find((element) => _.isEqual(element, coords)) !==
    undefined;

  let isActorHereThatIsValidAttackTarget = isAttackable && attackIsToggled;

  if (isActorHereThatIsValidAttackTarget) {
    attackStyle = styles.validAttackArea;
  }

  if (isValidToMoveHere) {
    moveStyle = styles.validMoveArea;
  }

  function onClickMovement(dispatch) {
    dispatch(actions.setActorLocationCombat(0, coords));
    dispatch(actions.toggleMoveClick());
    moveStyle = " ";
  }

  function onClickAttackSquare(dispatch) {
    const ability = { damage: 5 + _.random(1, 4) }; //need generalization and this whole thing should be a seperate file
    dispatch(
      actions.attackTargetWithAbility(0, actorOnThisSquareId, ability)
    ); //requires generalization and de-shitification
    dispatch(
      actions.addMessageToActivityLog(`You attack for ${ability.damage}!`)
    );
    dispatch(actions.toggleAttackClick());
    attackStyle = " ";
    
    if (actorsById[actorOnThisSquareId].health <= 0) {
      //eventually should set actor to 1hp (just a duel... not to the death)
      dispatch(actions.endCombat());
      dispatch(actions.addMessageToActivityLog(`You've won the duel!`));
    }
  }

  function onClickShowInfo(dispatch) {
    dispatch(actions.setActiveActorInfoWindowById(actorOnThisSquareId));
  }

  return (
    <div
      onClick={
        isValidToMoveHere
          ? () => {
              onClickMovement(dispatch);
            }
          : isActorHereThatIsValidAttackTarget
          ? () => {
              onClickAttackSquare(dispatch);
            }
          : nonPlayerActorIsHere && !moveIsToggled && !attackIsToggled
          ? () => {
              onClickShowInfo(dispatch);
            }
          : () => {}
      }
      className={props.className + " " + moveStyle + " " + attackStyle}
    >
      {actorToken}
    </div>
  );
}
