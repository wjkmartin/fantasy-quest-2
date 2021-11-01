import _ from "underscore";
import actions from "../../../../../DataHandlers/redux/actions";
import UI from "../../../../../DataHandlers/redux/slices/UI";

import Item from "../../../../../Entities/Item/Item";
import { addXP } from "./experience";

export function onClickAttackSquare(dispatch, player, items, targetObj, actorCoords) {

  const direction = () => {
      const deltaX = actorCoords[targetObj.id].x - actorCoords[0].x; // 1, 0, -1
      const deltaY = actorCoords[targetObj.id].y - actorCoords[0].y; // 1, 0, -1
      if (deltaX === -1 && deltaY === 0) return 'north';
      else if (deltaX === 1 && deltaY === 0) return 'south';
      else if (deltaX === 0 && deltaY === 1) return 'east';
      else if (deltaX === 0 && deltaY === -1) return 'west';
      else if (deltaX === -1 && deltaY === 1) return 'northEast';
      else if (deltaX === -1 && deltaY === -1) return 'northWest';
      else if (deltaX === 1 && deltaY === 1) return 'southEast';
      else if (deltaX === 1 && deltaY === -1) return 'southWest';
    }

  dispatch(UI.actions.setActorAttackAnimation({actorId: 0, direction: direction()}));
  dispatch(actions.setActorAttributeByActorId(0, 'actionUsed', true))

  const equippedItemsPlayer =
    items.equippedItemsIdsByActorId[0] !== undefined
      ? items.equippedItemsIdsByActorId[0]
      : undefined;
  const playerInventory = items.inventoryByActorId[0];
  let playerEquippedWeapon = "unarmed";

  if (equippedItemsPlayer.length > 0) {
    playerEquippedWeapon = playerInventory.find(
      ({ id, slot }) =>
        equippedItemsPlayer.includes(id) && slot === "weapon_main"
    );
    playerEquippedWeapon =
      playerEquippedWeapon === undefined ? "unarmed" : playerEquippedWeapon;
  }

  const playerWeaponDamage =
    playerEquippedWeapon !== "unarmed"
      ? playerEquippedWeapon.stats.weaponDamageFunction()
      : 0;
  const bonusDamage = 0;

  const playerRawDamage = playerWeaponDamage + bonusDamage;
  const playerStrengthModifier =
    Math.round((player.abilityScores.strength - 10) / 2) < 0
      ? 0
      : Math.round((player.abilityScores.strength - 10) / 2);

  const ability = { damage: playerRawDamage + playerStrengthModifier };
  const abilityTotalDamage = ability.damage - targetObj.armor >= 0 ? ability.damage - targetObj.armor : 0;
  const enemyHealthAfterAttack = targetObj.health - abilityTotalDamage;
  dispatch(actions.setActorAttributeByActorId(targetObj.id, 'health', (enemyHealthAfterAttack < 0 ? 0 : enemyHealthAfterAttack)))
  dispatch(
    UI.actions.addMessageToActivityLog(`Your attack deals ${abilityTotalDamage} damage!`)
  );

  if (enemyHealthAfterAttack <= 0) {
    // kill enemy logic
    UI.actions.addMessageToActivityLog(`${targetObj.actorName} dies horribly!`);
    targetObj.drops.forEach((drop) => {
      if (_.random(1, 100) <= drop.chance) {
        UI.actions.addMessageToActivityLog(
          `${targetObj.actorName} dropped ${drop.name}`
        );
        dispatch(
          actions.addItemToActorById(0, new Item(drop.item_type, drop.item))
        );
      }
    });
    dispatch(actions.killActorInCombat(targetObj.id));
    dispatch(actions.removeActorFromCurrentLocationById(targetObj.id));
    addXP(targetObj.level, dispatch, player)
    dispatch(actions.setActiveActorInfoWindowById())
    
  }
  dispatch(UI.actions.toggleCombatBasicAttackButtonSelected());
  // attackStyle = " ";
}
