import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import styles from './PowerButton.module.css';

import powerImages from '../../../../../../Assets/img/power_icons/power_icons';

import powerSlice from '../../../../../../DataHandlers/redux/slices/powers';
import combatSlice from '../../../../../../DataHandlers/redux/slices/combat';
import UISlice from '../../../../../../DataHandlers/redux/slices/UI';

import { determineValidPowerTargets } from '../../CombatLogic/determineValidPowerTargets';

const PowerButton = ({ powerId }) => {
  const TEST_POWER_DATA = {
    name: 'Magic Firebolt',
    description:
      'A simple bolt of arcane flame that never misses but has a limited range. Deals 1d6 fire damage.',
    type: 'attack',
    damage: [
      {
        type: 'fire',
        diceNumber: 1,
        diceSides: 6,
        bonus: 0,
      },
    ],
    additionalEffects: [
      function (target) {
        dispatch(
          UI.actions.addMessageToActivityLog({
            message: `${target.name} is burned!`,
            styleType: 'red',
          })
        );
      },
    ],
    range: 3,
    areaOfEffect: 0,
    duration: 0,
    cooldown: 1,
    mpCost: 20,
    hpCost: 0,
    hpHealed: 0,
    mpHealed: 0,
    hpDrain: 0,
    mpDrain: 0,
  };

  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const actorsInCombatById = useSelector(
    (state) => state.combat.actorsInCombatById
  );
  const actorsById = useSelector((state) => state.actors.actorsById);

  const actorCoordsById = useSelector((state) => state.combat.actorCoordsById);

  const combatPowersById = useSelector(
    (state) => state.powers.combatPowersById
  );
  const combatPowersOnCooldownByActorId = useSelector(
    (state) => state.powers.combatPowersOnCooldownByActorId
  );
  const combatPowersOnCooldownPlayer = combatPowersOnCooldownByActorId[0];
  const power = combatPowersById[powerId];

  const onClick = () => {
    if (isSelected) {
      usePower(powerId);
      setIsSelected(false);
    } else {
      usePower(powerId);
      setIsSelected(true);
    }
  };

  const onCooldown = () => {
    if (typeof combatPowersOnCooldownPlayer[powerId] !== 'undefined' && combatPowersOnCooldownPlayer[powerId] > 0) {
      return true;
    } else {
      return false;
    }
  };

  const usePower = (powerId) => {
    // determine if the power is ready to be used
    // if so, use it
    // if not, show a message saying it's on cooldown
    // using the power:
    // if the power has an area of effect,
    // all non-blocked areas within range are possible targets
    // if is a single target, then all entities of the correct type
    // within range are possible targets

    if (onCooldown()) {
      dispatch(
        UISlice.actions.addMessageToActivityLog({
          message: `${power.name} is on cooldown!`,
          styleType: 'italic',
        })
      );
      return;
    } else if (actorsById[0].actionUsed) {
      dispatch(
        UISlice.actions.addMessageToActivityLog({
          message: `You've already used your action to attack!`,
          styleType: 'italic',
        })
      );
      return;
    } else {
      // highlight targets in range

      if (power.areaOfEffect > 0) {
        // highlight all possible targets
      } else {
        dispatch(UISlice.actions.toggleCombatBasicAttackButtonSelected());
        dispatch(
          powerSlice.actions.setActivePowerById({
            actorId: 0,
            powerId: powerId,
          })
        );
        dispatch(
          combatSlice.actions.setValidAttackTargetsById({
            actorId: 0,
            validTargets: determineValidPowerTargets(
              actorsInCombatById,
              power.range,
              actorCoordsById
            ),
          })
        );
      }
      console.log('using power!');
      if (power.cooldown > 0) {
      }
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${isSelected ? styles.selected : ''} ${
        onCooldown()
          ? styles.disabled
          : ''
      } ${styles.PowerButton}`}
    >
      <p className={styles.cooldownTurnsLabel}>
        {onCooldown()
          ? combatPowersOnCooldownPlayer[powerId] 
          : ''}
      </p>
      <img src={powerImages[power.icon]} alt={power.name} />
    </div>
  );
};

export default PowerButton;
