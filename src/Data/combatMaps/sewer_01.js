import mapImage from "../../Assets/img/combat_maps/sewer/01.jpg";

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
  width: 10,
  height: 10,
  heightWidthPerSquare: 4,
  mapImage: mapImage,
  playerStartCoords: [2, 4],
  enemyStartCoords: [[7, 3]],
};
