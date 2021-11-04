import _ from "underscore";
import UI from "../../../../../DataHandlers/redux/slices/UI";
import item from "../../../../../DataHandlers/redux/slices/items";
import actor from "../../../../../DataHandlers/redux/slices/actors";
import combat from "../../../../../DataHandlers/redux/slices/combat";

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
  dispatch(actor.actions.setActorAttributeByActorId({actorId: 0, attribute: 'actionUsed', value: true}))

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
    Math.round((player.strength - 10) / 2) < 0
      ? 0
      : Math.round((player.strength - 10) / 2);

  const ability = { damage: playerRawDamage + playerStrengthModifier };
  const abilityTotalDamage = ability.damage - targetObj.armor >= 0 ? ability.damage - targetObj.armor : 0;
  const enemyHealthAfterAttack = targetObj.health - abilityTotalDamage;
  dispatch(actor.actions.setActorAttributeByActorId({actorId: targetObj.id, attribute: 'health', value: (enemyHealthAfterAttack < 0 ? 0 : enemyHealthAfterAttack)}))
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
          item.actions.addItemToActorById({actorId:0, item: new Item(drop.item_type, drop.item)})
        );
      }
    });
    dispatch(combat.actions.removeActorFromCombatById({actorId: targetObj.id}));
    dispatch(actor.actions.removeActorFromCurrentLocationById({actorId: targetObj.id}));
    addXP(targetObj.level, dispatch, player)
    dispatch(UI.actions.setActiveItemOrNpcTarget({id: null, type: null}));
    
  }
  dispatch(UI.actions.toggleCombatBasicAttackButtonSelected());
  // attackStyle = " ";
}
