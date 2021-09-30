import _ from 'underscore'
import actions from '../../../../../DataHandlers/redux/actions'

import Item from '../../../../../Entities/Item/Item'

export function onClickAttackSquare(dispatch, player, items, target) {
    const equippedItemsPlayer = items.equippedItemsIdsByActorId[0] !== undefined ? items.equippedItemsIdsByActorId[0] : undefined;
    const playerInventory = items.inventoryByActorId[0];
    let playerEquippedWeapon = 'unarmed';
    
    if (equippedItemsPlayer.length > 0) {
        playerEquippedWeapon = playerInventory.find( ({ id, slot }) => equippedItemsPlayer.includes(id) && (slot === 'weapon_main'));
        playerEquippedWeapon = playerEquippedWeapon === undefined ? 'unarmed' : playerEquippedWeapon
    }

    const playerWeaponDamage = playerEquippedWeapon !== 'unarmed' ? playerEquippedWeapon.stats.weaponDamageFunction() : 0;
    const bonusDamage = 0;
    
    const playerRawDamage = playerWeaponDamage + bonusDamage;
    const playerStrengthModifier = Math.round((player.abilityScores.strength - 10) / 2) < 0 ? 0 : Math.round((player.abilityScores.strength - 10) / 2)


    const ability = { damage: playerRawDamage + playerStrengthModifier };
    const enemyHealthAfterAttack =
      target.health - ability.damage;
    dispatch(actions.attackTargetWithAbility(0, target.id, ability));
    dispatch(
      actions.addMessageToActivityLog(`You attack for ${ability.damage}!`)
    );

    if (enemyHealthAfterAttack <= 0) {
      actions.addMessageToActivityLog(
        `${target.actorName} dies horribly!`
      );
      target.drops.forEach((drop) => {
        if (_.random(1, drop.chance) === drop.chance) {
          actions.addMessageToActivityLog(
            `${target.actorName} dropped ${drop.name}`
          );
          dispatch(
            actions.addItemToActorById(0, new Item("consumable", drop.item))
          );
        }
      });
      dispatch(actions.killActorInCombat(target.id));
      dispatch(actions.removeActorFromCurrentLocationById(target.id)); 
    }

    dispatch(actions.toggleAttackClick());
    // attackStyle = " ";
  }