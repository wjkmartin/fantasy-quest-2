import { astar, Graph } from "./aStar";

export function determineValidMoves(
  passableMap,
  actorsInCombatById,
  actorsById
) {
  const player = actorsById[0];
  const start_x = player.coords[0];
  const start_y = player.coords[1];

  let movement = player.movementRemaining + 1;

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
        return { x, y: y + 1 };
      case "north":
        return { x: x - 1, y };
      case "east":
        return { x, y: y - 1 };
      case "south":
        return { x: x + 1, y };
      case "south-east":
        return { x: x + 1, y: y - 1 };
      case "north-east":
        return { x: x - 1, y: y - 1 };
      case "south-west":
        return { x: x + 1, y: y + 1 };
      case "north-west":
        return { x: x - 1, y: y + 1 };
      default:
        break;
    }
  }

  function removeOtherActorLocations(arrayOrig, actorsInCombatById, actorsById) {
    let validSquares2 = arrayOrig;
    actorsInCombatById.forEach((actorId) => {
      const actor_x = actorsById[actorId].coords[0];
      const actor_y = actorsById[actorId].coords[1];

      const index = validSquares2.findIndex(
        (elem) => elem[0] === actor_x && elem[1] === actor_y
      );
      if (index !== -1) {
        validSquares2.splice(index, 1);
      }
    });
    return validSquares2;
  }

  // run A-star using grid, player start point and input as end point, invalid if path distance greater than player dist remaining.

  const validMovesBeforePathing = removeOtherActorLocations(
    validSquares,
    actorsInCombatById,
    actorsById
  );

  let graphDiagonal = new Graph(passableMap, { diagonal: true });

  const start = graphDiagonal.grid[start_x][start_y];

  let validSqaresAfterPathing = [];

  validMovesBeforePathing.forEach((endPoint) => {
    const end = graphDiagonal.grid[endPoint[0]][endPoint[1]];
    const path = astar.search(graphDiagonal, start, end, {
      heuristic: astar.heuristics.diagonal,
    });
    
    if (path.length <= movement - 1) {
      validSqaresAfterPathing.push([end.x, end.y]);
    }
  });

  return validSqaresAfterPathing;
}

// returns the path for an endpoint
// @param
export function getPath(passableMap, startPoint, endPoint) {
  let graphDiagonal = new Graph([...passableMap], { diagonal: true });
  const end = graphDiagonal.grid[endPoint[0]][endPoint[1]];
  const start = graphDiagonal.grid[startPoint[0]][startPoint[1]];
  const path = astar.search(graphDiagonal, start, end, {
    heuristic: astar.heuristics.diagonal,
  });

  return path;
}
