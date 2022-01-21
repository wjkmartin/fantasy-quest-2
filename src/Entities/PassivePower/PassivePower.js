import { immerable } from '@reduxjs/toolkit/node_modules/immer';

class PassivePower {
  [immerable] = true;
  static id = 0;
  constructor(powerData) {
    Object.assign(this, powerData);
    this.id = PassivePower.id;
    PassivePower.id += 1;
  }
}

export default PassivePower;
