import { createSlice } from '@reduxjs/toolkit';

import { loadCombatPowerData, loadPassivePowerData } from '../../loadPowerData';
import combatPowerData from '../../../Data/powers/combatPowers';
import passivePowerData from '../../../Data/powers/powers';

const initialState = {
  activePowersById: { 0: [] },
  combatPowersById: loadCombatPowerData(combatPowerData),
  unlockedCombatPowersById: [1],
  combatPowersOnCooldownByActorId: {
    0: {},
  },
  passivePowersById: loadPassivePowerData(passivePowerData),
  passivePowersOnActorById: {
    0: [],
  },
};

const powerSlice = createSlice({
  name: 'powers',
  initialState: initialState,
  reducers: {
    addPowerToCooldown: (state, action) => {
      const { actorId, powerId, turnsRemaining } = action.payload;
      state.combatPowersOnCooldownByActorId[actorId][powerId] = turnsRemaining;
    },
    reduceAllPowersOnCooldownTurnsRemaining: (state, action) => {
      Object.keys(state.combatPowersOnCooldownByActorId).forEach((actorId) => {
        Object.keys(state.combatPowersOnCooldownByActorId[actorId]).forEach(
          (powerId) => {
            if (state.combatPowersOnCooldownByActorId[actorId][powerId] > 0) {
              state.combatPowersOnCooldownByActorId[actorId][powerId]--;
            } else {
              delete state.combatPowersOnCooldownByActorId[actorId][powerId];
            }
          }
        );
      });
    },
    clearPowersOnCooldown: (state, action) => {
      state.combatPowersOnCooldownByActorId = {
        0: {},
      };
    },
    setActivePowerById: (state, action) => {
      const { actorId, powerId } = action.payload;
      state.activePowersById[actorId] = powerId;
    },
    addUnlockedPowerById: (state, action) => {
      const { powerId } = action.payload;
      state.unlockedCombatPowersById.push(powerId);
    },
    addPassivePowerToActorById: (state, action) => {
      const { actorId, powerId } = action.payload;
      state.passivePowersOnActorById[actorId].push(powerId);
    },
    addPassivePowerToActorByRef: (state, action) => {
      const { actorId, powerRef } = action.payload;
      const powerId = Object.values(state.passivePowersById).find(
        (power) => power.ref === powerRef
      ).id;
      console.log('powerId', powerId);
      state.passivePowersOnActorById[actorId].push(powerId);
    },
    removePassivePowerFromActorById: (state, action) => {
      const { actorId, powerId } = action.payload;
      const index = state.passivePowersOnActorById[actorId].indexOf(powerId);
      state.passivePowersOnActorById[actorId].splice(index, 1);
    },
  },
});

export const {
  addPowerToCooldown,
  reduceAllPowersOnCooldownTurnsRemaining,
  clearPowersOnCooldown,
  setActivePowerById,
  addUnlockedPowerById,
  addPassivePowerToActorById,
  addPassivePowerToActorByRef,
  removePassivePowerFromActorById,
} = powerSlice.actions;
export default powerSlice;
