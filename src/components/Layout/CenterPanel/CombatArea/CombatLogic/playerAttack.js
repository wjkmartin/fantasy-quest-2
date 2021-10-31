import _ from "underscore";
import actions from "../../../../../DataHandlers/redux/actions";
import UI from "../../../../../DataHandlers/redux/slices/UI";

import Item from "../../../../../Entities/Item/Item";
import { addXP } from "./experience";

export function onClickAttackSquare(dispatch, player, items, target) {
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
  const abilityTotalDamage = ability.damage - target.armor >= 0 ? ability.damage - target.armor : 0;
  const enemyHealthAfterAttack = target.health - abilityTotalDamage;
  dispatch(actions.setActorAttributeByActorId(target.id, 'health', (enemyHealthAfterAttack < 0 ? 0 : enemyHealthAfterAttack)))
  dispatch(
    UI.actions.addMessageToActivityLog(`Your attack deals ${abilityTotalDamage} damage!`)
  );

  if (enemyHealthAfterAttack <= 0) {
    // kill enemy logic
    UI.actions.addMessageToActivityLog(`${target.actorName} dies horribly!`);
    target.drops.forEach((drop) => {
      if (_.random(1, 100) <= drop.chance) {
        UI.actions.addMessageToActivityLog(
          `${target.actorName} dropped ${drop.name}`
        );
        dispatch(
          actions.addItemToActorById(0, new Item(drop.item_type, drop.item))
        );
      }
    });
    dispatch(actions.killActorInCombat(target.id));
    dispatch(actions.removeActorFromCurrentLocationById(target.id));
    addXP(target.level, dispatch, player)
    dispatch(actions.setActiveActorInfoWindowById())
  }

  dispatch(UI.actions.toggleCombatBasicAttackButtonSelected());
  // attackStyle = " ";
}
