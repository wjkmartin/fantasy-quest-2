import { immerable } from '@reduxjs/toolkit/node_modules/immer';

class CombatPower {
  [immerable] = true;
  static id = 0;
  constructor(powerData) {
    Object.assign(this, powerData);
    this.id = CombatPower.id;
    CombatPower.id += 1;
  }
}

export default CombatPower;
