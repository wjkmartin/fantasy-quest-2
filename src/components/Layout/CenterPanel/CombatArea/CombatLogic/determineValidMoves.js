import { astar, Graph } from "./aStar";

export function determineValidMoves(passableMap, actor, actorsArray) {
  const start_x = actor.coords[0];
  const start_y = actor.coords[1];

  let movement = actor.movementRemaining + 1;

  let validSquares = [];
  let squaresToReturnTo = [{ x: start_x, y: start_y, dist: 0 }];

  const dirs = [
    "west",
    "north",
    "east",
    "south",
    "north-east",
    "north-west",
    "south-east",
    "south-west",
  ];

  while (squaresToReturnTo.length > 0) {
    let currentCoords = squaresToReturnTo.pop();
    let distanceFromOrigin = currentCoords.dist + 1;
    let current_x = currentCoords.x;
    let current_y = currentCoords.y;

    dirs.forEach((direction) => {
      currentCoords = getCoordsForDirection(direction, current_x, current_y);
      if (
        passableMap[currentCoords.x][currentCoords.y] === 1 &&
        objectInArray(validSquares, currentCoords) === false &&
        distanceFromOrigin < movement
      ) {
        validSquares.push([currentCoords.x, currentCoords.y]);
        squaresToReturnTo.push({
          x: currentCoords.x,
          y: currentCoords.y,
          dist: distanceFromOrigin,
        });
      }
    });
  }

  function objectInArray(arr, obj) {
    return arr.some((r) => r[0] === obj.x && r[1] === obj.y);
  }

  function getCoordsForDirection(direction, x, y) {
    switch (direction) {
      case "west":
        return { x: x - 1, y };
      case "north":
        return { x, y: y - 1 };
      case "east":
        return { x: x + 1, y };
      case "south":
        return { x, y: y + 1 };
      case "north-east":
        return { x: x + 1, y: y - 1 };
      case "north-west":
        return { x: x - 1, y: y - 1 };
      case "south-east":
        return { x: x + 1, y: y + 1 };
      case "south-west":
        return { x: x - 1, y: y + 1 };
      default:
        break;
    }
  }

  function removeOtherActorLocations(arrayOrig, actors) {
    let validSquares2 = arrayOrig;
    actors.forEach((actor) => {
      let actor_x = actor.coords[0];
      let actor_y = actor.coords[1];

      let index = validSquares2.findIndex(
        (elem) => elem[0] === actor_x && elem[1] === actor_y
      );

      if (index !== -1) {
        validSquares2.splice(index, 1);
      }
    });
    return validSquares2;
  }

  // run A-star using grid, player start point and input as end point, invalid if path distance greater than player dist remaining.
  function removeActorsFromPassableMap(passableMap, actors) {
    let passableMapWithOutActors = passableMap;
    actors.forEach((actor) => {
      let actor_x = actor.coords[0];
      let actor_y = actor.coords[1];

      passableMapWithOutActors[actor_x][actor_y] = 0;
    });

    return passableMapWithOutActors;
  }

  const passableMapWithOutActors = removeActorsFromPassableMap(
    passableMap,
    actorsArray
  ); // remove all actors from the passable map so that Astar doesn't consider them valid movement locations.
  const validMovesBeforePathing = removeOtherActorLocations(
    validSquares,
    actorsArray
  );
  let graphDiagonal = new Graph(passableMapWithOutActors, { diagonal: true });

  const start = graphDiagonal.grid[start_x][start_y];

  let validSqaresAfterPathing = [];
  validMovesBeforePathing.forEach((endPoint) => {
    const end = graphDiagonal.grid[endPoint[0]][endPoint[1]];
    const path = astar.search(graphDiagonal, start, end, {
      heuristic: astar.heuristics.diagonal,
    });
    if (path.length <= movement -1) {
      validSqaresAfterPathing.push([end.x,end.y])
    }
  });

  return validSqaresAfterPathing;
}
