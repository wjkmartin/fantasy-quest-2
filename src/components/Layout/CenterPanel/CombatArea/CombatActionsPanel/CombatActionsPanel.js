import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../../DataHandlers/redux/actions";

import styles from "./CombatActionsPanel.module.css";

import { determineValidMoves } from "../CombatLogic/determineValidMoves";
import { determineValidAttacks } from "../CombatLogic/determineValidBasicAttack";

import nextTurn from "../CombatLogic/nextTurn";

export default function CombatActionsPanel(props) {
  const dispatch = useDispatch();

  const toggleMoveClick = useCallback(
    () => dispatch(actions.toggleMoveClick()),
    [dispatch]
  );

  const toggleAttackClick = useCallback(
    () => dispatch(actions.toggleAttackClick()),
    [dispatch]
  );

  const combatState = useSelector((state) => state.combat);
  const passableMap = combatState.combatMapState.passableMap;
  const actorsById = useSelector((state) => state.actors.actorsById);

  const actorsInCombatById = combatState.actorsInCombatById.map((id) => {
    return actorsById[id];
  });

  const isPlayerTurn =
    Number(useSelector((state) => state.combat.currentTurnById)) === 0;

  function onClickMoveButton() {
    if (!combatState.UI.moveButtonSelected) {
      if (actorsInCombatById[0].movementRemaining !== 0) {
        toggleMoveClick();
        dispatch(
          actions.setValidMovesById(
            0,
            determineValidMoves(
              passableMap,
              actorsInCombatById[0],
              actorsInCombatById,
              actorsInCombatById[0].movementRemaining
            )
          )
        );
      } else
        dispatch(
          actions.addMessageToActivityLog(
            "You've used all your movement for this round."
          )
        );
    } else {
      toggleMoveClick();
    }
  }

  function onClickBasicAttackButton() {
    if (!combatState.UI.attackButtonSelected) {
      if (!actorsInCombatById[0].actionUsed) {
        toggleAttackClick();
        dispatch(
          actions.setValidAttackTargetsById(
            0,
            determineValidAttacks(actorsInCombatById, 1)
          )
        );
      } else {
        dispatch(
          actions.addMessageToActivityLog("You've already attacked this round!")
        );
      }
    } else {
      toggleAttackClick();
    }
  }

  function onClickEndTurnButton() {
    if (isPlayerTurn) {
      if (combatState.UI.moveButtonSelected) {
        toggleMoveClick();
      }
      dispatch(actions.resetActionAndMovementById(0));
      dispatch(actions.endTurn(combatState.initiativeList, combatState.currentTurnById))
      nextTurn(props.passableMap, actorsById[combatState.currentTurnById], actorsById[0]);
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
      {!actorsInCombatById[0].actionUsed ? (
        <button // eventually make this "use selected ability"
          className={styles.attack}
          onClick={() => {
            onClickBasicAttackButton();
          }}
        >
          Basic Attack
        </button>
      ) : (
        ""
      )}

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
