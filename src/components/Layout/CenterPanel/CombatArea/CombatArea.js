import React from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../DataHandlers/redux/actions";

import generateMapFromData from "./CombatLogic/generateMap";

import CombatActionsPanel from "./CombatActionsPanel/CombatActionsPanel";
import TurnOrderArea from "./TurnOrderArea/TurnOrderArea";

import styles from "./CombatArea.module.css";

import generateAndSetInitiative from "./CombatLogic/generateAndSetInitiative";
import nextTurn from "./CombatLogic/nextTurn";

function CombatArea() {
  const combatState = useSelector((state) => state.combat);
  const actorsById = useSelector((state) => state.actors.actorsById);

  const dispatch = useDispatch();

  const combatMap = generateMapFromData(
    combatState.combatMapState.impassableMap
  );

  const actorsInCombatById = combatState.actorsInCombatById.map((id) => {
    return actorsById[id];
  });

  if (combatState.setupDone === false) {
    dispatch(actions.resetActorCombatPropsById(0));
    dispatch(actions.setActorLocationCombat(0, [2, 13]));

    dispatch(actions.resetActorCombatPropsById(1));
    dispatch(actions.setActorLocationCombat(1, [2, 4]));

    // Object.values(combatState.actorsInCombatById).forEach((id) => {
      
      // dispatch(actions.setActorLocationCombat(0, [id, 3]));

    dispatch(
      actions.addMessageToActivityLog(
        <p style={{ color: "red" }}>Combat has begun!</p>
      )
    );

    generateAndSetInitiative(actorsInCombatById, dispatch);

    if (combatState.currentTurnById !== 0) {
      nextTurn();
    }

    dispatch(actions.setSetupToDone());
  }

  return (
    <div className={styles.CombatArea}>
      <TurnOrderArea state={combatState} />
      <div className={styles.combatGridWrapper}>
        <div className={styles.combatGrid}>{combatMap.map((e) => e)}</div>
      </div>
      <CombatActionsPanel />
    </div>
  );
}

export default CombatArea;
