import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../../DataHandlers/redux/actions";

import styles from "./CombatActionsPanel.module.css";

import { determineValidMoves } from "../CombatLogic/determineValidMoves";
import { determineValidAttacks } from "../CombatLogic/determineValidBasicAttack";

import nextTurn from "../CombatLogic/nextTurn";

export default function CombatActionsPanel() {
  const dispatch = useDispatch();

  const toggleMoveClick = useCallback(
    () => dispatch(actions.toggleMoveClick()),
    [dispatch]
  );

  const toggleAttackClick = useCallback(
    () => dispatch(actions.toggleAttackClick()),
    [dispatch]
  );

  let impassibleMap = useSelector(
    (state) => state.combat.combatMapState.impassableMap
  );

  const combatState = useSelector((state) => state.combat);
  const actorsById = useSelector((state) => state.actors.actorsById);

  const actorsInCombatById = combatState.actorsInCombatById.map((id) => {
    return actorsById[id];
  });

  const isPlayerTurn =
    Number(useSelector((state) => state.combat.currentTurnById)) === 0;

  function onClickMoveButton() {
    if (actorsInCombatById[0].movementRemaining !== 0) {
      toggleMoveClick();
      dispatch(
        actions.setValidMovesById(
          0,
          determineValidMoves(
            impassibleMap,
            actorsInCombatById[0],
            actorsInCombatById
          )
        )
      );
    } else
      dispatch(
        actions.addMessageToActivityLog(
          "You've used all your movement for this round."
        )
      );
  }

  function onClickBasicAttackButton() {
    if (!actorsInCombatById[0].actionUsed) {
      toggleAttackClick();
      dispatch(
        actions.setValidAttackTargetsById(
          0,
          determineValidAttacks(impassibleMap, actorsInCombatById)
        )
      );
    } else {
      dispatch(
        actions.addMessageToActivityLog("You've already attacked this round!")
      );
    }
  }

  function onClickEndTurnButton() {
    if (isPlayerTurn) {
      if (combatState.UI.moveButtonSelected) {
        toggleMoveClick();
      }
      nextTurn();
    }
  }

  return isPlayerTurn ? (
    <div className={styles.panel}>
      {actorsById[0].movementRemaining > 0 ? (
        <button
          className={styles.move}
          onClick={() => {
            onClickMoveButton();
          }}
        >
          Move
        </button>
      ) : (
        ""
      )}
      {!actorsInCombatById[0].actionUsed ? <button // eventually make this "use selected ability"
        className={styles.attack}
        onClick={() => {
          onClickBasicAttackButton();
        }}
      >
        Basic Attack
      </button> : ""} 
      
      <button
        className={styles.endTurn}
        onClick={() => {
          onClickEndTurnButton();
        }}
      >
        End Turn
      </button>
    </div>
  ) : (
    ""
  );
}
