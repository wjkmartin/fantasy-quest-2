import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inCombat: false,
  setupDone: false,
  roundCounter: 0,
  initiativeList: [],
  actorsInCombatById: [],
  currentTurnById: undefined,
  actorValidAttackTargetsById: { 0: [] },
  actorValidMovesById: { 0: [] },
  actorCoordsById: { 0: { x: 0, y: 0 } },
  passableMap: [],
  isDuel: false,
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    startCombat: (state) => {
      state.inCombat = true;
    },
    endCombat: (state) => {
      state.inCombat = false;
      state.setupDone = false;
      state.roundCounter = 0;
      state.initiativeList = [];
      state.actorsInCombatById = [];
      state.currentTurnById = undefined;
      state.actorValidAttackTargetsById = { 0: [] };
      state.actorValidMovesById = { 0: [] };
      state.isDuel = false;
    },
    addActorToCombatById: (state, action) => {
      state.actorsInCombatById.push(action.payload);
    },
    removeActorFromCombatById: (state, action) => {
      state.actorsInCombatById.splice(
        state.actorsInCombatById.indexOf(action.payload),
        1
      );
    },
    setCombatSetupDone: (state) => {
      state.setupDone = true;
    },
    setValidMovesById: (state, action) => {
      state.actorValidMovesById[action.payload.actorId] =
        action.payload.validMoves;
    },
    setValidAttackTargetsById: (state, action) => {
      state.actorValidAttackTargetsById[action.payload.actorId] =
        action.payload.validTargets;
    },
    incrementRoundCounter: (state) => {
      // currently unused
      state.roundCounter++;
    },
    setInitiativeList: (state, action) => {
      state.initiativeList = action.payload;
    },
    setCurrentTurnById: (state, action) => {
      state.currentTurnById = action.payload;
    },
    endTurn: (state) => {
      let indexOfNextTurn = state.initiativeList.findIndex(
        (e) => e === state.currentTurnById
      );

      if (indexOfNextTurn === -1) {
        // id not found
      } else if (indexOfNextTurn + 1 === state.initiativeList.length) {
        indexOfNextTurn = 0;
      } else {
        indexOfNextTurn += 1;
      }

      state.currentTurnById = state.initiativeList[indexOfNextTurn];
    },
    setPassableMap: (state, action) => {
      state.passableMap = action.payload;
    },
    setIsDuel: (state, action) => {
      state.isDuel = action.payload;
    },
    setActorCoordsById: (state, action) => {
        console.log(action.payload);
      state.actorCoordsById[action.payload.actorId] =
        action.payload.coords;
    },
    resetActorCombatPropsById: (state, action) => {
      state.actorValidAttackTargetsById[action.payload] = [];
      state.actorValidMovesById[action.payload] = [];
    },
  },
});

export const {
  startCombat,
  endCombat,
  addActorToCombatById,
  removeActorFromCombatById,
  setCombatSetupDone,
  setValidMovesById,
  setValidAttackTargetsById,
  incrementRoundCounter,
  setInitiativeList,
  setCurrentTurnById,
  endTurn,
  setPassableMap,
  setIsDuel,
  setActorCoordsById,
  resetActorCombatPropsById,
} = combatSlice.actions;
export default combatSlice;
