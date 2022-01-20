import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';



import UI from '../../../../../DataHandlers/redux/slices/UI';
import combat from '../../../../../DataHandlers/redux/slices/combat';
import actors from '../../../../../DataHandlers/redux/slices/actors';
import powers from '../../../../../DataHandlers/redux/slices/powers';

import styles from './CombatActionsPanel.module.css';

import { determineValidMoves } from '../CombatLogic/determineValidMoves';
import { determineValidPowerTargets } from '../CombatLogic/determineValidPowerTargets';

import nextTurn from '../CombatLogic/nextTurn';
import PowerButton from './PowerButton/PowerButton';

export default function CombatActionsPanel() {
  const dispatch = useDispatch();

  const toggleMoveClick = useCallback(
    () => dispatch(UI.actions.toggleCombatMoveButtonSelected()),
    [dispatch]
  );

  const toggleAttackClick = useCallback(
    () => dispatch(UI.actions.toggleCombatBasicAttackButtonSelected()),
    [dispatch]
  );

  const combatState = useSelector((state) => state.combat);
  const playerCombatButtonsHidden = useSelector(
    (state) => state.UI.playerCombatButtonsHidden
  );
  const combatMoveButtonSelected = useSelector(
    (state) => state.UI.combatMoveButtonSelected
  );
  const combatBasicAttackButtonSelected = useSelector(
    (state) => state.UI.combatBasicAttackButtonSelected
  );
  const actorsById = useSelector((state) => state.actors.actorsById);
  const actorsInCombatById = [...combatState.actorsInCombatById];

  function onClickMoveButton() {
    if (!combatMoveButtonSelected) {
      if (combatBasicAttackButtonSelected)
        dispatch(UI.actions.toggleCombatBasicAttackButtonSelected());
      if (actorsById[0].movementRemaining > 0) {
        toggleMoveClick();
        dispatch(
          combat.actions.setValidMovesById({
            actorId: 0,
            validMoves: determineValidMoves(
              [...combatState.passableMap],
              actorsInCombatById,
              actorsById,
              combatState.actorCoordsById
            ),
          })
        );
      } else
        dispatch(
          UI.actions.addMessageToActivityLog({
            message: "You've used all your movement for this round.",
          })
        );
    } else {
      toggleMoveClick();
    }
  }

  function onClickBasicAttackButton() {
    if (!combatBasicAttackButtonSelected) {
      if (combatMoveButtonSelected)
        dispatch(UI.actions.toggleCombatMoveButtonSelected());
      if (!actorsById[0].actionUsed) {
        toggleAttackClick();
        dispatch(powers.actions.setActivePowerById({ actorId: 0, powerId: 0 }));
        dispatch(
          combat.actions.setValidAttackTargetsById({
            actorId: 0,
            validTargets: determineValidPowerTargets(
              actorsInCombatById,
              1,
              combatState.actorCoordsById
            ),
          })
        );
      } else {
        dispatch(
          UI.actions.addMessageToActivityLog({
            message: "You've already attacked this round!",
            styleType: 'italic',
          })
        );
      }
    } else {
      toggleAttackClick();
    }
  }

  function onClickEndTurnButton() {
    dispatch(UI.actions.setPlayerCombatButtonsHidden(true));
    if (combatMoveButtonSelected)
      dispatch(UI.actions.toggleCombatMoveButtonSelected());
    if (combatBasicAttackButtonSelected)
      dispatch(UI.actions.toggleCombatBasicAttackButtonSelected());
    dispatch(
      actors.actions.setActorAttributeByActorId({
        actorId: 0,
        attribute: 'actionUsed',
        value: false,
      })
    );
    dispatch(
      actors.actions.setActorAttributeByActorId({
        actorId: 0,
        attribute: 'movementRemaining',
        value: actorsById[0].speed,
      })
    );
    dispatch(combat.actions.endTurn());
    nextTurn();
  }

  const powerBarChildren = () => {
    const unlockedPowersById = useSelector(state => state.powers.unlockedPowersById);
    return unlockedPowersById.map((powerId, i) => {
      return (
        <PowerButton
          key={'__powerButton__', i}
          powerId={powerId}
        />
      );
    })
  }

  return (
    <div
      className={`${playerCombatButtonsHidden ? styles.hidden : ''} ${
        styles.panel
      }`}
    >
      <div className={styles.powersBar}>
        {powerBarChildren()}
      </div>
      <div > 
      <button
        className={`${
          actorsById[0].movementRemaining > 0 ? '' : styles.hidden
        } ${styles.combatActionButton}`}
        onClick={() => {
          onClickMoveButton();
        }}
      >
        Move
      </button>
      <button // eventually make this "use selected ability"
        className={`${styles.combatActionButton} ${
          !actorsById[0].actionUsed ? '' : styles.hidden
        }`}
        onClick={() => {
          onClickBasicAttackButton();
        }}
      >
        Basic Attack
      </button>
      <button
        className={styles.combatActionButton}
        onClick={() => {
          onClickEndTurnButton();
        }}
      >
        End Turn
      </button>
      </div>
    </div>
  );
}
