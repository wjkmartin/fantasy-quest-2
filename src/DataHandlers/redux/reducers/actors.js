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
            movementRemaining: state.actorsById[action.id].speed,
          },
        },
      };
    }
    case "SET_ACTOR_LOCATION_COMBAT": {
      return {
        ...state,
        actorsById: {
          ...state.actorsById,
          [action.id]: {
            ...state.actorsById[action.id],
            coordsPrev: state.actorsById[action.id].coords,
            coords: action.coords,
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
            movementRemaining: state.actorsById[actorID].speed,
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
              abilityScores: {
                ...state.actorsById[action.actorId].abilityScores,
                [action.attribute]: (state.actorsById[
                  action.actorId
                ].abilityScores[action.attribute] += action.delta),
              },
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
    case "SET_ACTOR_ATTRIBUTE_BY_ACTOR_ID": {
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
              abilityScores: {
                ...state.actorsById[action.actorId].abilityScores,
                [action.attribute]: action.value,
              },
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
              [action.attribute]: action.value,
            },
          },
        };
      }
    }
    case "MOVE_ACTOR_LOCATION_COMBAT": {
      const moved_x = state.actorsById[action.id].coords[0] - action.coords[0]
      const moved_y = state.actorsById[action.id].coords[1] - action.coords[1] 

      const spacesMoved = Math.abs(moved_x + moved_y)

      return {
        ...state,
        actorsById: {
          ...state.actorsById,
          [action.id]: {
            ...state.actorsById[action.id],
            coordsPrev: state.actorsById[action.id].coords,
            coords: action.coords,
            movementRemaining: state.actorsById[action.id].movementRemaining -= spacesMoved
          },
        },
      };
    }
    case "REMOVE_ACTOR_FROM_CURRENT_LOCATION_BY_ID": {
      const currentLocation = state.actorsById[action.actorId].location
      let actorsAtCurrentLocation = state.byLocationName[currentLocation] //array of objects
      let targetActorIndex = undefined;
      actorsAtCurrentLocation.forEach((actor, index) => {
        if (actor.id === action.actorId) {
          targetActorIndex = index;
        }
      })

      actorsAtCurrentLocation.splice(targetActorIndex, 1)

      return {
        ...state,
        byLocationName: {
          ...state.byLocationName,
          [currentLocation]: actorsAtCurrentLocation
        }
      }
    }
    default: {
      return state;
    }
  }
}
