import CombatPower from "../Entities/CombatPower/CombatPower";
import PassivePower from "../Entities/PassivePower/PassivePower";

export function loadPassivePowerData(data) {
  const powers = Object.values(data)
    .map((powerData) => new PassivePower(powerData))
    .reduce((acc, power) => {
      acc[power.id] = power;
      return acc;
    }
    , {});
  return powers;
}

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