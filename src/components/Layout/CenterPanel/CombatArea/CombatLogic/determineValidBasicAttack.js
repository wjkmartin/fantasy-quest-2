import _ from "underscore";

export const determineValidAttacks = (actorsInCombatById, distance, actorCoords) => {
  let validEnemyTargets = [];

  const playerX = actorCoords[0].x;
  const playerY = actorCoords[0].y;

  let nonPlayerActors = [];
  actorsInCombatById.forEach(actorId => {
    if (actorId !== 0) {
    nonPlayerActors.push(actorCoords[actorId]);
    }
  })
  
  const nodeStartX = playerX - distance < 0 ? 0 : playerX - distance;
  const nodeStartY = playerY - distance < 0 ? 0 : playerY - distance;

  const nodeEndX = playerX + distance < 0 ? 0 : playerX + distance;
  const nodeEndY = playerY + distance < 0 ? 0 : playerY + distance;

  for (let y = nodeStartY; y <= nodeEndY; y++) {
    for (let x = nodeStartX; x <= nodeEndX; x++) {
      if (
        nonPlayerActors.some((actorCoords) => {return actorCoords.x === x && actorCoords.y === y})) {
        validEnemyTargets.push([x, y]);
      }
    }
  }

  return validEnemyTargets;
};
