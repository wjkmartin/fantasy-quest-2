import _ from "underscore";

export const determineValidPowerTargets = (actorsInCombatById, powerRange, actorCoords) => {
  let validEnemyTargets = [];

  const playerX = actorCoords[0].x;
  const playerY = actorCoords[0].y;

  let nonPlayerActors = [];
  actorsInCombatById.forEach(actorId => {
    if (actorId !== 0) {
    nonPlayerActors.push(actorCoords[actorId]);
    }
  })
  
  const nodeStartX = playerX - powerRange < 0 ? 0 : playerX - powerRange;
  const nodeStartY = playerY - powerRange < 0 ? 0 : playerY - powerRange;

  const nodeEndX = playerX + powerRange < 0 ? 0 : playerX + powerRange;
  const nodeEndY = playerY + powerRange < 0 ? 0 : playerY + powerRange;

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
