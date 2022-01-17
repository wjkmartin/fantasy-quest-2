import itemSlice from '../../../DataHandlers/redux/slices/items';
import UISlice from '../../../DataHandlers/redux/slices/UI';
import questSlice from '../../../DataHandlers/redux/slices/quests';
import cell1 from './burrowCells/cell1';
import cell2 from './burrowCells/cell2';
import cell3 from './burrowCells/cell3';

export default {
  name: 'burrowCells',
  icon: 'pause',
  buttons: [
    {
      'The first cell is open.': cell1,
    },
    {
      'The second cell has a big chain around the door, and a rusty padlock.': cell2,
    },
    {
      'The third cell is the radiating source of the stench and the arm of a rotting corpse is sticking out of the bars.': cell3,
    },
  ],
  description1:
    'Narrow cells replete with rusty iron bars have been scraped out of the walls in this narrow chamber. The room stinks of decay and filth, moreso than the rest of this hole. A horrible place to die. ',
  prettyName: 'Crude Prison',
  type: 'top',
};
