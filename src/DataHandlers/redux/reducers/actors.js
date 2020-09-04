import { loadActors } from "../../loadActorData";

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

const actors = loadActors();

const initalState = {
  byLocationName: groupBy(actors, "location"),
  actorsById: actors,
  activeActorById: undefined,
  activePowersById: {
    0: [
      // {
      //   name: "Gift of Turtlekind",
      //   type: "passive",
      //   description: "Gives your skin the toughness of a mighty turtle shell.",
      //   details: "Armor + 10",
      //   stats: {
      //     armor: 10,
      //   },
      // },
      // {
      //   name: "Human Perseverance",
      //   type: "passive",
      //   description: "Humans are just a little bit tougher than most.",
      //   details: "Max health + 20",
      //   stats: {
      //     health: 20,
      //     maxHealth: 20,
      //   },
      // },
      // {
      //   name: "Blessing of Aludrion",
      //   type: "active",
      //   description:
      //     "Once per day you may pray to Aludrion to gain fleetness of foot.",
      //   details: "Dexterity + 5 while active. Lasts 10 minutes.",
      //   stats: {
      //     dexterity: 5,
      //   },
      //   duration: 10,
      // },
    ],
  },
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "SET_ACTIVE_ACTOR_INFO_WINDOW_BY_ID": {
      return {
        ...state,
        activeActorById: action.id,
      };
    }
    case "RESET_ACTOR_COMBAT_PROPS_BY_ID": {
      return {
        ...state,
        actorsById: {
          ...state.actorsById,
          [action.id]: {
            ...state.actorsById[action.id],
            coords: [0, 0],
            movementRemaining: 4,
            movementPerTurn: 4,
          },
        },
      };
    }
    case "SET_ACTOR_LOCATION_COMBAT": {
      const currentLocation = state.actorsById[action.id].coords;
      const xdif = Math.abs(currentLocation[0] - action.coords[0]);
      const ydif = Math.abs(currentLocation[1] - action.coords[1]);
      const movementExpended = xdif > ydif ? xdif : ydif;

      return {
        ...state,
        actorsById: {
          ...state.actorsById,
          [action.id]: {
            ...state.actorsById[action.id],
            coordsPrev: state.actorsById[action.id].coords,
            coords: action.coords,
            movementRemaining:
              state.actorsById[action.id].movementRemaining - movementExpended,
          },
        },
      };
    }
    case "ATTACK_TARGET_WITH_ABILITY_BY_ACTOR_ID_AND_ABILITY_NAME": {
      const attackerID = action.attackerId;
      const targetID = action.targetId;
      const ability = action.ability;

      return {
        ...state,
        actorsById: {
          ...state.actorsById,
          [attackerID]: {
            ...state.actorsById[attackerID],
            actionUsed: true,
          },
          [targetID]: {
            ...state.actorsById[targetID],
            health: state.actorsById[targetID].health - ability.damage,
          },
        },
      };
    }
    case "RESET_ACTOR_ACTION_AND_MOVEMENT_BY_ID": {
      const actorID = action.id; //TODO: refactor for nomenclature consistency

      return {
        ...state,
        actorsById: {
          ...state.actorsById,
          [actorID]: {
            ...state.actorsById[actorID],
            movementRemaining: state.actorsById[actorID].movementPerTurn,
            actionUsed: false,
          },
        },
      };
    }
    case "MODIFY_ACTOR_ATTRIBUTE_BY_ACTOR_ID": {
      if (
        action.attribute === "strength" ||
        action.attribute === "dexterity" ||
        action.attribute === "constitution" ||
        action.attribute === "charisma" ||
        action.attribute === "wisdom" ||
        action.attribute === "intelligence"
      ) {
        return {
          ...state,
          actorsById: {
            ...state.actorsById,
            [action.actorId]: {
              ...state.actorsById[action.actorId],
              [action.attribute]: (state.actorsById[
                action.actorId
              ].abilityScores[action.attribute] += action.delta),
            },
          },
        };
      } else {
        return {
          ...state,
          actorsById: {
            ...state.actorsById,
            [action.actorId]: {
              ...state.actorsById[action.actorId],
              [action.attribute]: (state.actorsById[action.actorId][
                action.attribute
              ] += action.delta),
            },
          },
        };
      }
    }

    default: {
      return state;
    }
  }
}
