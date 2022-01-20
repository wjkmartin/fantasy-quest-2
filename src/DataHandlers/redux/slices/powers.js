import { createSlice } from '@reduxjs/toolkit';

import { loadCombatPowerData } from '../../loadPowerData';
import combatPowerData from '../../../Data/powers/combatPowers';

const initialState = {
  combatPowersOnCooldownByActorId: {
    0: {},
  },
  combatPowersById: loadCombatPowerData(combatPowerData),
  activePowersById: {},
  unlockedPowersById: [1],
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
      state.unlockedPowersById.push(powerId);
    }
  },
});

export const { addPowerToCooldown, reduceAllPowersOnCooldownTurnsRemaining, clearPowersOnCooldown, setActivePowerById, addUnlockedPowerById} =
  powerSlice.actions;
export default powerSlice;
