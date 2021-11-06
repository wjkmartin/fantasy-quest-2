import { createSlice } from '@reduxjs/toolkit';

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
  actorIdAttackAnimation: {0: undefined},
  playerCombatButtonsHidden: false,
  combatMoveButtonSelected: false,
  combatBasicAttackButtonSelected: false,
  activeTarget: {id: null, type: null},
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setActiveItemOrNpcTarget: (state, action) => {
      const { id, type } = action.payload;
      state.activeTarget.id = id;
      state.activeTarget.type = type;
    },
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
    setActorAttackAnimation: (state, action) => {
      state.actorIdAttackAnimation = {[action.payload.actorId]: action.payload.direction};
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
  setActiveItemOrNpcTarget,
  startConversationWithActorById,
  endConversation,
  addMessageToActivityLog,
  setMainImage,
  addToCurrentDialogueText,
  clearCurrentDialogueText,
  setIsAnimatingToCoords,
  setAnimationPath,
  setActorAttackAnimation,
  setPlayerCombatButtonsHidden,
  toggleCombatBasicAttackButtonSelected
} = UISlice.actions;

export default UISlice;
