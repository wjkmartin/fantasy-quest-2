import * as images from "../../../Assets/imgList";

const initalState = {
  activityLog: [{message: "Welcome to RHO! Please check your codex for important information."}],
  inConversation: false,
  actorInConversation: undefined,
  mainImage: undefined,
  currentDialogueText: [],
  isAnimatingToCoords: [],
  actorIdAnimating: undefined,
  animationPath: [],
  playerCombatButtonsHidden: false
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "START_COVERSATION_WITH_ACTOR_BY_ID": {
      return {
        ...state,
        inConversation: true,
        actorInConversation: action.id,
      };
    }
    case "END_CONVERSATION": {
      return {
        ...state,
        inConversation: false,
        actorInConversation: undefined,
      };
    }
    case "ADD_MESSAGE_TO_ACTIVITY_LOG": {
      const message = action.message;
      const styleType = action.styleType === undefined ? 'regular' : action.styleType
      return {
        ...state,
        activityLog: [...state.activityLog,
          {message: message,
          styleType: styleType}
        ]
          
          
        ,
      };
    }
    case "SET_MAIN_IMAGE": {
      return {
        ...state,
        mainImage: images[action.image],
      };
    }
    case "ADD_TO_CURRENT_DIALOGUE_TEXT": {
      return {
        ...state,
        currentDialogueText: [...state.currentDialogueText, action.text]
      }
    }
    case "CLEAR_CURRENT_DIALOGUE_TEXT": {
      return {
        ...state,
      currentDialogueText: []
      }
    }
    case "SET_IS_ANIMATING_TO_COORDS": {
      const newCoords = [action.x, action.y]
      const actorId = action.actorId
      return {
        ...state,
        actorIdAnimating: actorId,
        isAnimatingToCoords: newCoords
      }
    }
    case "SET_ANIMATION_PATH": {
      const path = [...action.animationPath]
      return {
        ...state,
        animationPath: path
      }
    }
    case "SET_PLAYER_COMBAT_BUTTONS_HIDDEN": {
      const flag = action.flag
      return {
        ...state,
        playerCombatButtonsHidden: flag
      }
    }
    default: {
      return state;
    }
  }
}
