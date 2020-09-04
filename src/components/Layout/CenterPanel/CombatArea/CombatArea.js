import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../DataHandlers/redux/actions";
import store from "../../../../DataHandlers/redux/store";

import generateMapFromData from "./CombatLogic/generateMap";

import CombatActionsPanel from "./CombatActionsPanel/CombatActionsPanel";
import TurnOrderArea from "./TurnOrderArea/TurnOrderArea";

import styles from "./CombatArea.module.css";
import generateAndSetInitiative from "./CombatLogic/generateAndSetInitiative";
import nextTurn from "./CombatLogic/nextTurn";

function CombatArea() {
  const combatState = useSelector((state) => state.combat);
  const actorsById = useSelector((state) => state.actors.actorsById);
  
  const actorsInCombatById = combatState.actorsInCombatById.map((id) => {
    return actorsById[id];
  });

  const dispatch = useDispatch();

  const changeActorLocationCombatGrid = useCallback(
    (id, coords) => dispatch(actions.setActorLocationCombat(id, coords)),
    [dispatch]
  );

  const setInitiativeOrderById = useCallback(
    (id, order) => dispatch(actions.setActorInitiative(id, order)),
    [dispatch]
  );

  const setInitiativeOrderList = useCallback(
    (initiative) => dispatch(actions.setInitiativeOrderList(initiative)),
    [dispatch]
  );

  const setCurrentTurnById = useCallback(
    (id) => dispatch(actions.setCurrentTurnById(id)),
    [dispatch]
  );

  if (combatState.setupDone === false) {
    // ======= COMBAT INIT =======
    dispatch(
      actions.addMessageToActivityLog(
        <div style={{ color: "red" }}>Combat has begun!</div>
      )
    );

    generateAndSetInitiative(
      actorsInCombatById,
      setInitiativeOrderById,
      setInitiativeOrderList,
      setCurrentTurnById
    );

    let stateAfterSetup = store.getState().combat;

    if (stateAfterSetup.currentTurnById !== 0) {
      nextTurn();
    }

    dispatch(actions.setSetupToDone());
  }

  return (
    <div className={styles.CombatArea}>
      <TurnOrderArea state={combatState} />
      <div className={styles.combatGrid}>
        {generateMapFromData(
          combatState.combatMapState.impassableMap,
          changeActorLocationCombatGrid
        ).map((e) => e)}
      </div>
      <CombatActionsPanel />
    </div>
  );
}

export default CombatArea;
