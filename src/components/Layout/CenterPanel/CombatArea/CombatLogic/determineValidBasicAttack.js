import _ from "underscore";

export const determineValidAttacks = (actors, distance) => {
  let validEnemyTargets = [];

  const playerX = actors[0].coords[0];
  const playerY = actors[0].coords[1];

  let nonPlayerActors = [];
  for (let i = 1; i <= actors.length - 1; i++) {
    nonPlayerActors.push(actors[i].coords);
  }

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
