import React from "react";
import _ from "underscore";
import { onClickAttackSquare } from "../CombatLogic/playerAttack";

import { useSelector, useDispatch } from "react-redux";

import styles from "./CombatAreaSquare.module.css";
import actions from "../../../../../DataHandlers/redux/actions";

export default function CombatAreaSquare(props) {
  const coords = props.coords;

  const combatState = useSelector((state) => state.combat);

  const actorOnThisSquareId =
    props.actorHere !== undefined ? props.actorHere.id : undefined;

  const validMovesPlayer = combatState.actorValidMovesById[0];
  const validAttacksPlayer = combatState.actorValidAttackTargetsById[0];

  const moveIsToggled = combatState.UI.moveButtonSelected;
  const attackIsToggled = combatState.UI.attackButtonSelected;

  const player = useSelector((state) => state.actors.actorsById[0]);
  const target = useSelector((state) => state.actors.actorsById[actorOnThisSquareId]);
  const items = useSelector((state) => state.items);

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
              onClickAttackSquare(dispatch, player, items, target);
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
