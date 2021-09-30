import gatehouseE from "../locations/field/GatehouseEast/GatehouseEast.js";
import grassyClearing from "../locations/field/grassyClearing.js";
import goblinBurrow from "../locations/field/burrow.js";

import * as roads from "../locations/roads";

export default {
  name: "field",
  img: "https://via.placeholder.com/418x345",
  nodes: [
    [
      undefined,
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
      undefined,
      roads.crossRoad,
    ],
    [
      undefined,
      undefined,
      undefined,
      roads.crossRoad,
      undefined,
      undefined,
      roads.verRoad,
      undefined,
      roads.verRoad,
    ],
    [
      undefined,
      undefined,
      roads.horRoad,
      roads.crossRoad,
      roads.crossRoad,
      roads.horRoad,
      roads.horRoad,
      roads.horRoad,
      gatehouseE,
    ],
    [
      undefined,
      roads.verRoad,
      undefined,
      roads.verRoad,
      undefined,
      undefined,
      grassyClearing,
      undefined,
      roads.verRoad,
    ],
    [
      undefined,
      goblinBurrow,
      roads.horRoad,
      roads.crossRoad,
      undefined,
      undefined,
      roads.crossRoad,
      roads.horRoad,
      roads.crossRoad,
    ],
  ],
};
