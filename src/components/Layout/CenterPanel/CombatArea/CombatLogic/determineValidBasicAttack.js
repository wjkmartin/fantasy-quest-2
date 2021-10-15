import _ from "underscore";

export const determineValidAttacks = (actorsInCombatById, actorsById, distance) => {
  let validEnemyTargets = [];

  const playerX = actorsById[0].coords[0];
  const playerY = actorsById[0].coords[1];

  let nonPlayerActors = [];
  actorsInCombatById.forEach(actorId => {
    if (actorId !== 0) {
    nonPlayerActors.push(actorsById[actorId].coords);
    }
  })
  
  const nodeStartX = playerX - distance < 0 ? 0 : playerX - distance;
  const nodeStartY = playerY - distance < 0 ? 0 : playerY - distance;

  const nodeEndX = playerX + distance < 0 ? 0 : playerX + distance;
  const nodeEndY = playerY + distance < 0 ? 0 : playerY + distance;

  for (let y = nodeStartY; y <= nodeEndY; y++) {
    for (let x = nodeStartX; x <= nodeEndX; x++) {
      if (
        nonPlayerActors.some((actorCoords) => _.isEqual([x, y], actorCoords))
      ) {
        validEnemyTargets.push([x, y]);
      }
    }
  }

  return validEnemyTargets;
};
