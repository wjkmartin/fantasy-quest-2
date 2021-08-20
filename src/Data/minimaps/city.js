import tavern from "../locations/city/tavern/tavern";
import market from "../locations/city/market";

import gatehouseNorth from "../locations/city/gatehouseNorth";
import castle from "../locations/city/castle";
import palatialDist1 from "../locations/city/palatialDist/palatialDist1";
import palatialDist2 from "../locations/city/palatialDist/palatialDist2";
import merchantGuild from "../locations/city/merchantGuild";

import docks1 from "../locations/city/docks/docks1";
import docks2 from "../locations/city/docks/docks2";
import docks3 from "../locations/city/docks/docks3";

import slumsEnt from "../locations/city/slums/slumsEnt";
import slums1 from "../locations/city/slums/slums1";
import slums2 from "../locations/city/slums/slums2";
import slums3 from "../locations/city/slums/slums3";

import gatehouseWest from "../locations/city/gatehouseWest/gatehouseWest";
import sewer from "../locations/city/sewer/sewer";

import centralSquare from "../locations/city/centralSquare";
import herbalists from "../locations/city/herbalists";
import blacksmiths from "../locations/city/blacksmiths";
import cathedral from "../locations/city/cathedral";

import * as roads from "../locations/roads";

export default {
  name: "city",
  img: "https://via.placeholder.com/418x345",
  nodes: [
    [
      undefined,
      undefined,
      castle,
      palatialDist2,
      palatialDist1,
      merchantGuild,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      gatehouseNorth,
      undefined,
      undefined,
      cathedral,
      undefined,
      undefined,
    ],
    [
      gatehouseWest,
      roads.horRoad,
      roads.horRoad,
      tavern,
      centralSquare,
      market,
      roads.horRoad,
      roads.horRoad,
      roads.horRoad,
      docks1,
    ],
    [
      undefined,
      roads.verRoad,
      undefined,
      undefined,
      roads.verRoad,
      undefined,
      undefined,
      roads.verRoad,
      undefined,
      docks2,
    ],
    [
      herbalists,
      roads.horRoad,
      roads.horRoad,
      blacksmiths,
      roads.crossRoad,
      roads.horRoad,
      roads.horRoad,
      roads.horRoad,
      roads.horRoad,
      docks3,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      roads.verRoad,
      undefined,
      undefined,
      roads.verRoad,
      undefined,
      undefined,
    ],
    [
      undefined,
      undefined,
      undefined,
      undefined,
      slumsEnt,
      undefined,
      undefined,
      sewer,
      undefined,
      undefined,
    ],
    [
      undefined,
      undefined,
      undefined,
      slums2,
      slums1,
      slums3,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  ],
};
