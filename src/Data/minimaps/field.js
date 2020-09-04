import gatehouseE from "../locations/field/GatehouseEast/GatehouseEast.js";

import * as roads from "../locations/roads";

export default {
  name: "field",
  img: "https://via.placeholder.com/418x345",
  nodes: [
    [
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
      "none",
      roads.crossRoad,
    ],
    [
      "none",
      "none",
      roads.crossRoad,
      "none",
      "none",
      roads.verRoad,
      "none",
      roads.verRoad,
    ],
    [
      "none",
      roads.horRoad,
      roads.crossRoad,
      roads.crossRoad,
      roads.horRoad,
      roads.horRoad,
      roads.horRoad,
      gatehouseE,
    ],
    [
      roads.verRoad,
      "none",
      roads.verRoad,
      "none",
      "none",
      roads.verRoad,
      "none",
      roads.verRoad,
    ],
    [
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
      "none",
      "none",
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
    ],
  ],
};
