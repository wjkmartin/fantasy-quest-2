export function getDerivedPhysicalString(playerObj, playerInv, equippedByIds) {
    let weaponDamageString = "";
  const playerBaseAttackDamage =
    Math.floor(playerObj.abilityScores.strength / 2) - 5;

  const playerMainWeapon = playerInv.find(
    (item) => item.slot === "weapon_main"
  );

  if (equippedByIds.includes(playerMainWeapon.id)) {
    weaponDamageString = playerMainWeapon.addedDmgString;
  }


  return `${playerBaseAttackDamage > 0 ? playerBaseAttackDamage : 1} ${weaponDamageString !== "" ? '+' : ""} ${weaponDamageString}`;
}
