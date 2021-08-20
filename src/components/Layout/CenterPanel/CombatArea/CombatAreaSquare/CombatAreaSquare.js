import React from "react";
import _ from "underscore";
import Item from "../../../../../Entities/Item/Item";

import { useSelector, useDispatch } from "react-redux";

import styles from "./CombatAreaSquare.module.css";
import actions from "../../../../../DataHandlers/redux/actions";

export default function CombatAreaSquare(props) {
  const coords = props.coords;

  const combatState = useSelector((state) => state.combat);

  const actorOnThisSquareId =
    props.actorHere !== undefined ? props.actorHere.id : undefined;

  const actorsById = useSelector((state) => state.actors.actorsById);

  const validMovesPlayer = combatState.actorValidMovesById[0];
  const validAttacksPlayer = combatState.actorValidAttackTargetsById[0];

  const moveIsToggled = combatState.UI.moveButtonSelected;
  const attackIsToggled = combatState.UI.attackButtonSelected;

  let dispatch = useDispatch();

  let moveStyle,
    attackStyle = " ";

  let nonPlayerActorIsHere = actorOnThisSquareId !== 0 ? true : false;

  let isClickable = validMovesPlayer.some((element) =>
    _.isEqual(element, coords)
  );

  let isAttackable = validAttacksPlayer.some((element) =>
    _.isEqual(element, coords)
  );

  let isActorHereThatIsValidAttackTarget = isAttackable && attackIsToggled;

  if (isActorHereThatIsValidAttackTarget) {
    attackStyle = styles.validAttackArea;
  }

  const isValidToMoveHere = isClickable && moveIsToggled;

  if (isValidToMoveHere === true) {
    moveStyle = styles.validMoveArea;
  }

  function onClickMovement(dispatch) {
    dispatch(actions.moveActorLocationCombat(0, coords));
    dispatch(actions.toggleMoveClick());
    moveStyle = " ";
  }

  function onClickAttackSquare(dispatch) {
    const ability = { damage: 5 + _.random(1, 4) };
    const enemyHealthAfterAttack =
      actorsById[actorOnThisSquareId].health - ability.damage;
    dispatch(actions.attackTargetWithAbility(0, actorOnThisSquareId, ability));
    dispatch(
      actions.addMessageToActivityLog(`You attack for ${ability.damage}!`)
    );

    if (enemyHealthAfterAttack <= 0) {
      actions.addMessageToActivityLog(
        `${actorsById[actorOnThisSquareId].actorName} dies horribly!`
      );
      actorsById[actorOnThisSquareId].drops.forEach((drop) => {
        if (_.random(1, drop.chance) === drop.chance) {
          actions.addMessageToActivityLog(
            `${actorsById[actorOnThisSquareId].actorName} dropped ${drop.name}`
          );
          dispatch(
            actions.addItemToActorById(0, new Item("consumable", drop.item))
          );
        }
      });
      dispatch(actions.killActorInCombat(actorOnThisSquareId));
      dispatch(actions.removeActorFromCurrentLocationById(actorOnThisSquareId)); //doesn't work? 
    }

    dispatch(actions.toggleAttackClick());
    attackStyle = " ";
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
      {props.actorToken !== undefined ? (
        <img className={styles.actorToken} alt={""} src={props.actorToken} />
      ) : (
        ""
      )}
    </div>
  );
}
