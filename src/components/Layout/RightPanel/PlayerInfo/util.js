export function getDerivedPhysicalString(playerObj, playerInv, equippedByIds) {
  let weaponDamageString = "";
  const playerBaseAttackDamage =
    Math.floor((playerObj.abilityScores.strength - 10) / 2);
  
  if (equippedByIds.length > 0) {
    const playerMainWeapon = playerInv.find(
      (item) => item.slot === "weapon_main" 
    );
    
    if (equippedByIds.includes(playerMainWeapon.id)) {
      weaponDamageString = playerMainWeapon.addedDmgString;
    }
  }
  

  return `${playerBaseAttackDamage > 0 ? playerBaseAttackDamage : 0} ${
    weaponDamageString !== "" ? "+" : ""
  } ${weaponDamageString}`;
}
