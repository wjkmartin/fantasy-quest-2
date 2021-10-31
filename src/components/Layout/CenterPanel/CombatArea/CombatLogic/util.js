export function areCoordsAdjacent(coordsA, coordsB) {
  const xdif = Math.abs(coordsA.x - coordsB.x);
  const ydif = Math.abs(coordsA.y - coordsB.y);

  const isLeftRightCol = (coords1, coords2) => {
    return coords1.x - 1 === coords2.x || coords1.x + 1 === coords2.x;
  };

  const isTopBottomCol = (coords1, coords2) => {
    return coords1.y - 1 === coords2.y || coords1.y + 1 === coords2.y;
  };

  if (isTopBottomCol(coordsA, coordsB) && xdif <= 1) {
    return true;
  } else if (isLeftRightCol(coordsA, coordsB) && ydif <= 1) {
    return true;
  } else {
    return false;
  }
}
