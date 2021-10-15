import _ from "underscore";

export function getTotalDerivedDamageWithAbility(
  attackerObject,
  targetObject /*ability*/
) {
  const abilitySimpleAttack = {
    damage: function (attackerObj, defenderObj) {
      return Math.floor(attackerObj.abilityScores.strength / 2) - 5;
    },
  };

  return abilitySimpleAttack.damage(attackerObject);
}
