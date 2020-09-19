import * as images from "../../../Assets/imgList";

const initalState = {
  activityLog: {},
  inConversation: false,
  actorInConversation: undefined,
  mainImage: images["tavern"],
  currentDialogueText: [],
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
      return {
        ...state,
        activityLog: {
          ...state.activityLog,
          [Object.values(state.activityLog).length + 1]: action.message,
        },
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
    default: {
      return state;
    }
  }
}
