import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 1 - 199 are regular tracked quests
  // 300 - 499 are untracked quests (like the shadowy corridor state)
  questState: {
    1: 0,
    300: 0,
  },
  playerActiveQuests: [],
};

const locationSlice = createSlice({
  name: 'quests',
  initialState: initialState,
  reducers: {
    setQuestStage: (state, action) => {
      const { questId, stage } = action.payload;
      state.questState[questId] = stage;
    },
  },
});

export const { setQuestStage } = locationSlice.actions;
export default locationSlice;
