import { createSlice } from '@reduxjs/toolkit';

import * as images from '../../../Assets/imgList';

const initialState = {
  activityLog: [
    {
      message:
        'Welcome to RHO! Please check your codex for important information.',
    },
  ],
  inConversation: false,
  actorInConversation: undefined,
  mainImage: undefined,
  currentDialogueText: [],
  isAnimatingToCoords: [],
  actorIdAnimating: undefined,
  animationPath: undefined,
  playerCombatButtonsHidden: false,
  combatMoveButtonSelected: false,
  combatBasicAttackButtonSelected: false,
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    startConversationWithActorById: (state, action) => {
      state.inConversation = true;
      state.actorInConversation = action.payload;
    },
    endConversation: (state) => {
      state.inConversation = false;
      state.actorInConversation = undefined;
    },
    addMessageToActivityLog: (state, action) => {
      // payload: message: string, styleType: string
      state.activityLog.push({
        message: action.payload,
        styleType: action.styleType || 'normal',
      });
    },
    setMainImage: (state, action) => {
      state.mainImage = images[action.payload];
    },
    addToCurrentDialogueText: (state, action) => {
      state.currentDialogueText.push(action.payload);
    },
    clearCurrentDialogueText: (state) => {
      state.currentDialogueText = [];
    },
    setIsAnimatingToCoords: (state, action) => {
      //payload: {actorId: string, coords: [x, y]}
      state.actorIdAnimating = action.payload.actorId;
      state.isAnimatingToCoords = action.payload.coords;
    },
    setAnimationPath: (state, action) => {
      state.animationPath = action.payload;
    },
    setPlayerCombatButtonsHidden: (state, action) => {
      state.playerCombatButtonsHidden = action.payload;
    },
    toggleCombatMoveButtonSelected: (state) => {
      state.combatMoveButtonSelected = !state.combatMoveButtonSelected;
    },
    toggleCombatBasicAttackButtonSelected: (state) => {
      state.combatBasicAttackButtonSelected = !state.combatBasicAttackButtonSelected;
    },
  },
});

export const {
  startConversationWithActorById,
  endConversation,
  addMessageToActivityLog,
  setMainImage,
  addToCurrentDialogueText,
  clearCurrentDialogueText,
  setIsAnimatingToCoords,
  setAnimationPath,
  setPlayerCombatButtonsHidden,
} = UISlice.actions;

export default UISlice;
