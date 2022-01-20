import CombatPower from "../Entities/CombatPower/CombatPower";

export function loadCombatPowerData(data) {
  const powers = Object.values(data)
    .map((powerData) => new CombatPower(powerData))
    .reduce((acc, power) => {
      acc[power.id] = power;
      return acc;
    }
    , {});
  return powers;
}