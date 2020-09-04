import tavern from "../locations/city/tavern/tavern.js";
import market from "../locations/city/Market.js";
import castle from "../locations/city/Castle.js";
import docks from "../locations/city/docks/Docks.js";
import gatehouseW from "../locations/city/GatehouseWest/GatehouseWest.js";
import sewer from "../locations/city/SewerEntrance.js";
import slums from "../locations/city/slums/Slums.js";

import * as roads from "../locations/roads";

export default {
  name: "city",
  img: "https://via.placeholder.com/418x345",
  nodes: [
    [undefined, undefined, undefined, undefined, castle, roads.horRoad, market, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, roads.verRoad, undefined],
    [
      undefined,
      gatehouseW,
      roads.horRoad,
      tavern,
      roads.horRoad,
      roads.horRoad,
      roads.crossRoad,
      docks,
    ],
    [undefined, undefined, undefined, undefined, roads.verRoad, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, roads.verRoad, undefined, undefined, undefined],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      roads.crossRoad,
      slums,
      roads.horRoad,
      sewer,
    ],
  ],
};
