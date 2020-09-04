const initalState = {
  questState: {},
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "SET_QUEST_STAGE": {
      return {
        ...state,
        questState: {
          ...state.questState,
          [action.quest]: action.questStage,
        },
      };
    }
    default: {
      return state;
    }
  }
}
