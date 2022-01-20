import _ from 'underscore';

import UISlice from '../../../../../DataHandlers/redux/slices/UI';
import itemSlice from '../../../../../DataHandlers/redux/slices/items';
import actorSlice from '../../../../../DataHandlers/redux/slices/actors';
import combatSlice from '../../../../../DataHandlers/redux/slices/combat';
import powerSlice from '../../../../../DataHandlers/redux/slices/powers';

import Item from '../../../../../Entities/Item/Item';
import { addXP } from './experience';
import diceRoll from '../../../../../util/diceRoll';

function calcAnimDir(sourceCoords, targetCoords) {
  const angle = Math.atan2(
    targetCoords.x - sourceCoords.x,
    targetCoords.y - sourceCoords.y
  );

  if (angle > -Math.PI / 8 && angle <= Math.PI / 8) {
    return 'east';
  } else if (angle > Math.PI / 8 && angle <= (3 * Math.PI) / 8) {
    return 'southEast';
  } else if (angle > (3 * Math.PI) / 8 && angle <= (5 * Math.PI) / 8) {
    return 'south';
  } else if (angle > (5 * Math.PI) / 8 && angle <= (7 * Math.PI) / 8) {
    return 'southWest';
  } else if (angle > (7 * Math.PI) / 8 || angle <= (-7 * Math.PI) / 8) {
    return 'west';
  } else if (angle > (-7 * Math.PI) / 8 && angle <= (-5 * Math.PI) / 8) {
    return 'northWest';
  } else if (angle > (-5 * Math.PI) / 8 && angle <= (-3 * Math.PI) / 8) {
    return 'north';
  } else if (angle > (-3 * Math.PI) / 8 && angle <= -Math.PI / 8) {
    return 'northEast';
  }
}

export function resolveCombatPower(dispatch, state, target) {
  const powerId = state.powers.activePowersById[0];
  const power = state.powers.combatPowersById[powerId];
  const player = state.actors.actorsById[0];

  console.log(state.combat.actorCoordsById);
  let damage = 0;
  if (power.type === 'attack') {
    if (power.id === 0) {
      // basic melee attack
      damage = Math.floor((player.strength - 10) / 2);

      const playerEquippedWeapon =
        state.items.itemsById
          .filter((item) => item.equipped === true)
          .find((item) => item.slot === 'weapon_main') || 'unarmed';

      const playerWeaponDamage =
        playerEquippedWeapon !== 'unarmed'
          ? playerEquippedWeapon.stats.weaponDamageFunction()
          : 0;

      damage += playerWeaponDamage;

      // damage reductions: armor, resistances, etc.
      damage -= target.armor;
    } else {
      // spell
      power.damage.forEach((damageSource) => {
        const diceRollResult = diceRoll(
          `${damageSource.diceNumber}d${damageSource.diceSides}`
        );
        damage += diceRollResult;
        // subtract target relevant resistances when implemented
        // i.e switch (damageSource.type) etc
      });
      //todo: ADD SPELL DAMAGE CALCULATION
    }

    // to do: magic weapon overcomes physical resistance

    if (damage < 0) {
      damage = 0;
    }

    dispatch(
      actorSlice.actions.modifyActorAttributeByActorId({
        actorId: target.id,
        attribute: 'health',
        value: -1 * damage,
      })
    );

    dispatch(
      UISlice.actions.addMessageToActivityLog({
        message: `Your attack deals ${damage} damage!`,
      })
    );

    if (target.health - damage <= 0 && !isDuel) {
      // kill enemy logic
      UISlice.actions.addMessageToActivityLog({
        message: `${target.actorName} dies horribly!`,
      });
      // TODO: verify drops
      target.drops?.forEach((drop) => {
        if (_.random(1, 100) <= drop.chance) {
          UISlice.actions.addMessageToActivityLog({
            message: `${targetObj.actorName} dropped ${drop.name}`,
          });
          dispatch(
            itemSlice.actions.createNewItem({
              actorId: 0,
              item: new Item(
                drop.item_type,
                drop.item,
                -1,
                currentLocation.name
              ),
            })
          );
        }
      });
      dispatch(combatSlice.actions.removeActorFromCombatById(target.id));
      dispatch(
        actorSlice.actions.removeActorFromCurrentLocationById(target.id)
      );
      addXP(target.level, dispatch, player);
      dispatch(
        UISlice.actions.setActiveItemOrNpcTarget({ id: null, type: null })
      );
    } else if (target.health - damage <= 0 && isDuel) {
      UISlice.actions.addMessageToActivityLog({
        message: `You defeated ${targetObj.actorName}!`,
        styleType: 'green',
      });
      dispatch(combatSlice.actions.removeActorFromCombatById(target.id));
      dispatch(
        UISlice.actions.setActiveItemOrNpcTarget({ id: null, type: null })
      );
    }

    dispatch(UISlice.actions.toggleCombatBasicAttackButtonSelected());
  } else if (power.type === 'heal') {
  } else if (power.type === 'buff') {
  } else if (power.type === 'debuff') {
  } else if (power.type === 'aoe') {
  } else if (power.type === 'move') {
  } else if (power.type === 'teleport') {
  } else if (power.type === 'summon') {
  } else if (power.type === 'item') {
  } else {
    console.log('power type not found');
  }

  dispatch(
    actorSlice.actions.setActorAttributeByActorId({
      actorId: 0,
      attribute: 'actionUsed',
      value: true,
    })
  );

  dispatch(
    powerSlice.actions.addPowerToCooldown({
      actorId: 0,
      powerId: powerId,
      turnsRemaining: power.cooldown,
    })
  );

  const direction = calcAnimDir(
    state.combat.actorCoordsById[0],
    state.combat.actorCoordsById[target.id]
  );
  dispatch(
    UISlice.actions.setActorAttackAnimation({
      actorId: 0,
      direction: direction,
    })
  );
}
