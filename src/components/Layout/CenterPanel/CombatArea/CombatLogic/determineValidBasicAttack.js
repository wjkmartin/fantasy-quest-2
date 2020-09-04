import _ from "underscore";

export const determineValidAttacks = (impassibleMap, actors) => {

  let nonBlockingNodes = [];
  let validOneSquareAwayEnemies = [];

  let playerCurrentLoc = actors[0].coords;
  let enemyLoc = actors[1].coords;

  for (let y = 0; y < impassibleMap.length; y++) {
    for (let x = 0; x < impassibleMap[y].length; x++) {
      if (impassibleMap[y][x] === 1) {
        nonBlockingNodes.push([x, y]); //add all non-blocked squares to valid array
      }
    }
  }
  nonBlockingNodes.forEach((element) => {
    let xdif = Math.abs(element[0] - playerCurrentLoc[0]);
    let ydif = Math.abs(element[1] - playerCurrentLoc[1]);

    if (
      (xdif === 1 && ydif === 0) ||
      (xdif === 0 && ydif === 1) ||
      (xdif === 1 && ydif === 1)
    ) {
      if (_.isEqual(element, enemyLoc)) {
        validOneSquareAwayEnemies.push(element);
      }
    }
  });
  return validOneSquareAwayEnemies;
};
