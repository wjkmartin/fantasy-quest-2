import mapImage from "../../../Assets/img/combat_maps/burrow/burrow2.jpg"

export default {
  passableMap: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  width: 9,
  height: 9,
  heightWidthPerSquare: 4,
  mapImage: mapImage,
  playerStartCoords: [6, 6],
  enemyStartCoords: [[3, 2],[3, 3],[3, 4]],
};
