export function areCoordsAdjacent(coordsA, coordsB) {
  const xdif = Math.abs(coordsA[0] - coordsB[0]);
  const ydif = Math.abs(coordsA[1] - coordsB[1]);

  const isLeftRightCol = (coords1, coords2) => {
    return coords1[0] - 1 === coords2[0] || coords1[0] + 1 === coords2[0];
  };

  const isTopBottomCol = (coords1, coords2) => {
    return coords1[1] - 1 === coords2[1] || coords1[1] + 1 === coords2[1];
  };

  if (isTopBottomCol(coordsA, coordsB) && xdif <= 1) {
    return true;
  } else if (isLeftRightCol(coordsA, coordsB) && ydif <= 1) {
    return true;
  } else {
    return false;
  }
}
