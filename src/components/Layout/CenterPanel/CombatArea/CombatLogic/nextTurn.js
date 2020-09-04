import store from "../../../../../DataHandlers/redux/store";
import actions from "../../../../../DataHandlers/redux/actions";

import { astar, Graph } from "./aStar";
import { areCoordsAdjacent } from "./util";

import _ from "underscore";

export default function nextTurn() {
  store.dispatch(actions.endTurn());

  const combatObject = store.getState().combat;
  const currentActorId = combatObject.currentTurnById;
  const actorsByID = store.getState().actors.actorsById

  store.dispatch(actions.resetActionAndMovementById(0))

  if (actorsByID[0].health <= 0) { //eventually should set player to 1hp (just a duel... not to the death)
    store.dispatch(actions.endCombat())
    store.dispatch(actions.addMessageToActivityLog(`You've lost the duel!`))
  }

  if (Number(currentActorId) !== 0) {
    const impassableMap = combatObject.combatMapState.impassableMap;
    const currentActorObject = actorsByID[currentActorId];
    const playerObject = actorsByID[0];

    store.dispatch(
      actions.addMessageToActivityLog(
        `${currentActorObject.actorName} is taking their turn.`
      )
    );

    const graph = new Graph(impassableMap, { diagonal: true });
    const start =
      graph.grid[currentActorObject.coords[0]][currentActorObject.coords[1]];
    const end = graph.grid[playerObject.coords[0]][playerObject.coords[1]];

    const path = astar.search(graph, start, end, {
      heuristic: astar.heuristics.diagonal,
    });

    let distanceActorWillTravel;
    let actorMustMove = true;
    let finalLocationNode;
    let finalLocationCoords;

    if (path.length === 1) {
      distanceActorWillTravel = 0;
      actorMustMove = false;
    } else if (path.length < 3) {
      distanceActorWillTravel = 0;
    } else {
      distanceActorWillTravel = path.length - 2;
    }

    const finalNodeIndex = distanceActorWillTravel;
    if (!actorMustMove) {
      finalLocationCoords = currentActorObject.coords;
    } else {
      finalLocationNode = path[finalNodeIndex];
      finalLocationCoords = [finalLocationNode.x, finalLocationNode.y];
    }

    store.dispatch(
      actions.setActorLocationCombat(currentActorId, finalLocationCoords)
    );

    const actorsAfterMove = store.getState().actors.actorsById;
    const currentActorObjectAfterMove =
      actorsAfterMove[currentActorId];

    if (
      areCoordsAdjacent(currentActorObjectAfterMove.coords, playerObject.coords)
    ) {
      setTimeout(() => {
        let attackCallback = store.dispatch(
          actions.attackTargetWithAbility(currentActorId, 0, {
            damage: 5 + _.random(1, 4),
          })
        );
        store.dispatch(
          actions.addMessageToActivityLog(
            `${currentActorObject.actorName} deals ${attackCallback.ability.damage} to ${playerObject.actorName}`
          )
        );

        
      }, 750);
    }
    if (actorsByID[0].health <= 0) { //eventually should set player to 1hp (just a duel... not to the death)
      store.dispatch(actions.endCombat()) //glitchy
      store.dispatch(actions.addMessageToActivityLog(`You've lost the duel!`)) 
    }

    store.dispatch(actions.endTurn());
  }
}
