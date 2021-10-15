const initalState = {
  inCombat: false,
  setupDone: false,
  roundCounter: 0,
  initiativeList: [],
  actorsInCombatById: [],
  currentTurnById: undefined,
  actorValidAttackTargetsById: { 0: [] },
  actorValidMovesById: { 0: [] },
  passableMap: [],
  UI: {
    moveButtonSelected: false,
    attackButtonSelected: false,
  },
  isDuel: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "START_COMBAT": {
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
        actorsInCombatById: [...actorsInCombatById],
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
      const newValidMoves = action.moves;
      return {
        ...state,
        actorValidMovesById: {
          ...state.actorValidMovesById,
          [action.id]: [...newValidMoves],
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
      return {
        ...state,
        currentTurnById: action.id,
      };
    }
    case "END_TURN": {
      // action.initiativeList - 1d array of inits in order by id
      // action.currentTurnById - id of current turn

      const initativeList = action.initiativeList;
      const currentTurnById = action.currentTurnById

      let indexOfNextTurn = initativeList.findIndex(
        (e) => e === currentTurnById
      );

      if (indexOfNextTurn === -1) {
        // id not found
      } else if (indexOfNextTurn + 1 === initativeList.length) {
        indexOfNextTurn = 0;
      } else {
        indexOfNextTurn += 1;
      }

      return {
        ...state,
        currentTurnById: initativeList[indexOfNextTurn],
      };
    }
    case "END_COMBAT": {
      return {
        ...state,
        inCombat: false,
        setupDone: false,
        roundCounter: 0,
        initiativeList: [],
        actorsInCombatById: [],
        currentTurnById: undefined,
        actorValidAttackTargetsById: { 0: [] },
        actorValidMovesById: { 0: [] },
        UI: {
          moveButtonSelected: false,
          attackButtonSelected: false,
        },
        isDuel: false,
      };
    }
    case "SET_PASSABLE_MAP": {
      const passableMapNew = [...action.data]

      return {
        ...state,
        passableMap: passableMapNew
      };
    }
    case "KILL_ACTOR_IN_COMBAT": {
      let actorIdIndex = state.actorsInCombatById.findIndex(
        (id) => id === action.id
      );
      let actorsInCombatByIdAfter = state.actorsInCombatById;
      actorsInCombatByIdAfter.splice(actorIdIndex, 1);
      return {
        ...state,
        actorsInCombatById: actorsInCombatByIdAfter,
      };
    }
    case "SET_DUEL_FLAG": {
      return {
        ...state,
        isDuel: true,
      };
    }

    default: {
      return state;
    }
  }
}
