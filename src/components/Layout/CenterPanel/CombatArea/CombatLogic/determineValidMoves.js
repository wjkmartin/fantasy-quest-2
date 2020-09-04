export const determineValidMoves = (impassibleMap, actor) => {
  let nonBlockingNodes = [];
  let validMoves = [];

  const actorCurrentLoc = actor.coords;
  const movementRemaining = actor.movementRemaining;

  for (let y = 0; y < impassibleMap.length; y++) {
    for (let x = 0; x < impassibleMap[y].length; x++) {
      if (impassibleMap[x][y] === 1) {
        nonBlockingNodes.push([x, y]);
      }
    }
  }
  if (movementRemaining > 0) {
    nonBlockingNodes.forEach((element) => {
      let xdif = Math.abs(element[0] - actorCurrentLoc[0]);
      let ydif = Math.abs(element[1] - actorCurrentLoc[1]);

      if (xdif >= 1 && xdif <= movementRemaining && ydif === 0) {
        validMoves.push(element);
      } else if (ydif >= 1 && ydif <= movementRemaining && xdif === 0) {
        validMoves.push(element);
      } else if (ydif >= 1 && ydif <= movementRemaining && xdif >= 1 && xdif <= movementRemaining) {
        validMoves.push(element);
      }
    });
  }

  return validMoves;
};
