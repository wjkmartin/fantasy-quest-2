// import actors from "./actors";

const initalState = {
  inCombat: false,
  setupDone: false,
  roundCounter: 0,
  initiativeList: [],
  actorsInCombatById: [0],
  currentTurnById: undefined,
  actorValidAttackTargetsById: { 0: [] },
  actorValidMovesById: { 0: [] },
  combatMapState: {
    impassableMap: [
      [0, 1, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0],
    ],
  },
  UI: {
    moveButtonSelected: false,
    attackButtonSelected: false,
  },
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "START_COMBAT": {
      //this should probably take the map as an arg? or current loc passes to it?
      return {
        ...state,
        inCombat: true,
      };
    }
    case "ADD_ACTOR_TO_COMBAT_BY_ID": {
      let actorsInCombatById = state.actorsInCombatById;
      actorsInCombatById.push(action.id);
      return {
        ...state,
        actorsInCombatById: actorsInCombatById,
      };
    }
    case "SET_COMBAT_SETUP_TO_DONE": {
      return {
        ...state,
        setupDone: true,
      };
    }
    case "TOGGLE_MOVE_CLICK": {
      return {
        ...state,
        UI: {
          ...state.UI,
          moveButtonSelected: !state.UI.moveButtonSelected,
          attackButtonSelected: false,
        },
      };
    }
    case "TOGGLE_ATTACK_CLICK": {
      return {
        ...state,
        UI: {
          ...state.UI,
          attackButtonSelected: !state.UI.attackButtonSelected,
          moveButtonSelected: false,
        },
      };
    }
    case "SET_VALID_MOVES_BY_ID": {
      return {
        ...state,
        actorValidMovesById: {
          ...state.actorValidMovesById,
          [action.id]: [...action.moves],
        },
      };
    }
    case "SET_ATTACK_TARGETS_BY_ID": {
      return {
        ...state,
        actorValidAttackTargetsById: {
          ...state.actorValidAttackTargetsById,
          [action.id]: [...action.attacks],
        },
      };
    }
    //
    case "INCREMENT_ROUND_COUNTER": {
      return {
        ...state,
        roundCounter: state.roundCounter++,
      };
    }

    case "SET_INITIATIVE_LIST": {
      return {
        ...state,
        initiativeList: action.initiativeList,
      };
    }
    case "SET_CURRENT_TURN_BY_ID": {
      //used?
      return {
        ...state,
        currentTurnById: action.id,
      };
    }
    case "END_TURN": {
      let currentActorIndex = state.initiativeList.findIndex(
        (e) => e === state.currentTurnById
      );
      const nextActorInTurnOrderIndex =
        currentActorIndex === state.initiativeList.length - 1
          ? 0
          : currentActorIndex + 1;
      const nextActorInTurnOrderById =
        state.initiativeList[nextActorInTurnOrderIndex];
      return {
        ...state,
        currentTurnById: nextActorInTurnOrderById,
      };
    }
    case "END_COMBAT": {
      return {
        ...state,
        inCombat: false,
        setupDone: false,
        roundCounter: 0,
        initiativeList: [],
        actorsInCombatById: [0],
        currentTurnById: undefined,
        actorValidAttackTargetsById: { 0: [] },
        actorValidMovesById: { 0: [] },
        UI: {
          moveButtonSelected: false,
          attackButtonSelected: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
