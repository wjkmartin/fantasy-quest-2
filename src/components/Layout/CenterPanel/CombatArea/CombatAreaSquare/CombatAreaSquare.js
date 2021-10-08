import React from "react";
import { onClickAttackSquare } from "../CombatLogic/playerAttack";

import { useSelector, useDispatch } from "react-redux";

import styles from "./CombatAreaSquare.module.css";
import actions from "../../../../../DataHandlers/redux/actions";
import { getPath } from "../CombatLogic/determineValidMoves";

import { animateMovePlayerToLocation } from "../CombatLogic/animations";

export default function CombatAreaSquare(props) {
  const player = useSelector((state) => state.actors.actorsById[0]);
  const target = useSelector(
    (state) => state.actors.actorsById[props.actorHere?.id]
  );
  const passableMap = useSelector((state) => state.combat.passableMap);
  const items = useSelector((state) => state.items);
  const activeActorInfo = useSelector((state) => state.actors.activeActorById);
  const isAnimating = useSelector((state) => state.UI.isAnimating);
  const animationPath = useSelector((state) => state.UI.animationPath);

  let Image = animateMovePlayerToLocation(
    isAnimating,
    animationPath,
    props.actorHere?.id
  );

  let dispatch = useDispatch();

  let moveStyle,
    attackStyle = " ";

  if (props.isActorHereThatIsValidAttackTarget) {
    attackStyle = styles.validAttackArea;
  }

  if (props.isValidToMoveHere === true) {
    moveStyle = styles.validMoveArea;
  }

  function onClickMovement(dispatch) {
    dispatch(actions.setIsAnimating(true));
    dispatch(actions.toggleMoveClick());
    dispatch(
      actions.setAnimationPath(
        getPath(passableMap, player.coords, props.coords)
      )
    );
    moveStyle = " ";
    setTimeout(() => {
      dispatch(actions.moveActorLocationCombat(0, props.coords));
      dispatch(actions.setIsAnimating(false));
    }, 400);
  }

  function onClickShowInfo(dispatch) {
    dispatch(actions.setActiveActorInfoWindowById(props.actorHere?.id));
  }

  return (
    <div
      onClick={
        props.isValidToMoveHere
          ? () => {
              onClickMovement(dispatch);
            }
          : props.isActorHereThatIsValidAttackTarget
          ? () => {
              onClickAttackSquare(
                dispatch,
                player,
                items,
                target,
                activeActorInfo
              );
            }
          : props.nonPlayerActorIsHere &&
            !props.moveIsToggled &&
            !props.attackIsToggled
          ? () => {
              onClickShowInfo(dispatch);
            }
          : () => {}
      }
      className={props.className + " " + moveStyle + " " + attackStyle}
    >
      <p style={{ color: "white", display: "absolute" }}>{props.coords} </p>
      {props.actorToken !== undefined ? <Image src={props.actorToken} className="player" /> : ""}
    </div>
  );
}
