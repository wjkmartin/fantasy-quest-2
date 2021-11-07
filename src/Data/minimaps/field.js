import gatehouseE from '../locations/field/GatehouseEast/GatehouseEast.js';
import roadToCoast from '../locations/field/roadToCoast/roadToCoast.js';
import roadToMountains from '../locations/field/roadToMountains/roadToMountains.js';

import goblinBurrow from '../locations/field/goblinBurrow/goblinBurrow.js';

import * as roads from '../locations/roads';

import copse from '../locations/field/copse.js';
import glade from '../locations/field/glade.js';
import trail from '../locations/field/trail.js';
import forest from '../locations/field/forest.js';

import brokenBridge from '../locations/field/brokenBridge.js';
import ruins from '../locations/field/ruins.js';
import spring from '../locations/field/spring.js';
import well from '../locations/field/well.js';
import farm1 from '../locations/field/farm1.js';
import farm2 from '../locations/field/farm2.js';

const copseList = {
  copse1: {
    ...copse,
    name: 'copse1',
  },
  copse2: {
    ...copse,
    name: 'copse2',
  },
  copse3: {
    ...copse,
    name: 'copse3',
  },
  copse4: {
    ...copse,
    name: 'copse4',
  },
  copse5: {
    ...copse,
    name: 'copse5',
  },
  copse6: {
    ...copse,
    name: 'copse6',
  },
  copse7: {
    ...copse,
    name: 'copse7',
  },
  copse8: {
    ...copse,
    name: 'copse8',
  },
}

const gladeList = {
  glade1: {
    ...glade,
    name: 'glade1',
  },
  glade2: {
    ...glade,
    name: 'glade2',
  },
}

const trailList = {
  trail1: {
    ...trail,
    name: 'trail1',
  },
  trail2: {
    ...trail,
    name: 'trail2',
  },
  trail3: {
    ...trail,
    name: 'trail3',
  },
  trail4: {
    ...trail,
    name: 'trail4',
  },
}

const forestList = {
  forest1: {
    ...forest,
    name: 'forest1',
  },
  forest2: {
    ...forest,
    name: 'forest2',
  },
  forest3: {
    ...forest,
    name: 'forest3',
  },
  forest4: {
    ...forest,
    name: 'forest4',
  },
}



//TODO
// glade - what's there?

// trail 
// well 
// broken bridge
// forest 
// spring
// ruins

export default {
  name: 'field',
  img: 'https://via.placeholder.com/418x345',
  //prettier-ignore
  nodes: 
    [
      [null, copseList.copse1, copseList.copse2, null, null, roadToMountains, null],
      [copseList.copse3, gladeList.glade1, copseList.copse4, null, farm1, roads.verRoad, null],
      [null, copseList.copse5, trailList.trail1, null, null, roads.verRoad, null],
      [null, null, trailList.trail2, null, well, roads.verRoad, null],
      [null, roads.crossRoad, roads.horRoad, roads.horRoad, roads.horRoad, roads.crossRoad, gatehouseE],
      [roadToCoast, roads.crossRoad, null, null, farm2, roads.verRoad, null],
      [null, trailList.trail3, null, copseList.copse6, null, brokenBridge, null],
      [forestList.forest1, trailList.trail4, copseList.copse7, copseList.copse8, forestList.forest2, gladeList.glade2, spring],
      [goblinBurrow, forestList.forest3, forestList.forest4, null, ruins, null, null],
    ],
};
