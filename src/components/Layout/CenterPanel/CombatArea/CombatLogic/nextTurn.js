import store from "../../../../../DataHandlers/redux/store";
import actions from "../../../../../DataHandlers/redux/actions";

import { astar, Graph } from "./aStar";
import { areCoordsAdjacent } from "./util";

import _ from "underscore";

// TODO: REFACTOR AND SPLIT UP

export default function nextTurn() {
  const combatData = store.getState().combat;
  const currentActorTurnId = combatData.currentTurnById;
  const actorCurrentTurn = store.getState().actors.actorsById[
    currentActorTurnId
  ];

 
  
  const player = store.getState().actors.actorsById[0];
  const passableMap = [...combatData.combatMapState.passableMap];

  if (_.isEqual(combatData.actorsInCombatById,[0])) {
    store.dispatch(actions.endCombat());
    store.dispatch(actions.addMessageToActivityLog(`You've defeated the enemies!`));
  }

  if (actorCurrentTurn.isDead === true) { 
    store.dispatch(actions.endTurn()); 
    nextTurn();
    return;
  }

  store.dispatch(
    actions.addMessageToActivityLog(
      `${actorCurrentTurn.actorName} is taking their turn.`
    )
  );

  if (actorCurrentTurn.id !== 0) {
    let coordsToRevertOnPassableMap = [];
    let passableMapWithOtherActors = [...passableMap];
    combatData.actorsInCombatById.forEach((actorId) => {
      const actorInCombat = store.getState().actors.actorsById[actorId];
      if (actorId !== actorCurrentTurn.id && actorId !== 0) {
        passableMapWithOtherActors[actorInCombat.coords[0]][
          actorInCombat.coords[1]
        ] = 0;
        coordsToRevertOnPassableMap.push([
          actorInCombat.coords[0],
          actorInCombat.coords[1],
        ]);
      }
    });

    const graph = new Graph(passableMapWithOtherActors, { diagonal: true });
    const start =
      graph.grid[actorCurrentTurn.coords[0]][actorCurrentTurn.coords[1]];
    const end = graph.grid[player.coords[0]][player.coords[1]];

    const path = astar.search(graph, start, end, {
      heuristic: astar.heuristics.diagonal,
    });

    let distanceActorWillTravel;
    let actorMustMove = true;
    let finalLocationNode;
    let finalLocationCoords;

    if (path.length < 2) {
      distanceActorWillTravel = 0;
      actorMustMove = false;
    } else {
      distanceActorWillTravel = Math.min(
        actorCurrentTurn.speed,
        path.length - 2
      );
    }

    const finalNodeIndex = distanceActorWillTravel;
    if (!actorMustMove) {
      finalLocationCoords = actorCurrentTurn.coords;
    } else {
      finalLocationNode = path[finalNodeIndex];
      finalLocationCoords = [finalLocationNode.x, finalLocationNode.y];
    }

    store.dispatch(
      actions.setActorLocationCombat(actorCurrentTurn.id, finalLocationCoords)
    );

    coordsToRevertOnPassableMap.forEach((coords) => {
      passableMapWithOtherActors[coords[0]][coords[1]] = 1;
    });

    const actorsAfterMove = store.getState().actors.actorsById;
    const currentActorObjectAfterMove = actorsAfterMove[actorCurrentTurn.id];
    let playerHealthAfterAttack = player.health;

    if (areCoordsAdjacent(currentActorObjectAfterMove.coords, player.coords)) {
      let attackCallback = store.dispatch(
        actions.attackTargetWithAbility(actorCurrentTurn.id, 0, {
          damage: 5 + _.random(1, 4),
        })
      );
      store.dispatch(
        actions.addMessageToActivityLog(
          `${actorCurrentTurn.actorName} deals ${attackCallback.ability.damage} to ${player.actorName}`
        )
      );
      playerHealthAfterAttack -= attackCallback.ability.damage;
    }

    if (playerHealthAfterAttack <= 0) {
      store.dispatch(actions.endCombat());
      store.dispatch(actions.setActorAttributeByActorId(0, "health", 1));
      store.dispatch(actions.addMessageToActivityLog(`You've lost the fight!`));
      store.dispatch(actions.setMap('city', 'centralSquare'));
      store.dispatch(actions.loadSavedMapStateForMap('city'));
      store.dispatch(actions.setActiveActorInfoWindowById(undefined));
      store.dispatch(actions.addMessageToActivityLog('In a sudden flash of light, you feel yourself dematerialize and a moment later you find yourself in front of the obelisk in the center of the city.', "italic"))
      return;
    }

    store.dispatch(actions.endTurn());
    nextTurn();
  }
}
