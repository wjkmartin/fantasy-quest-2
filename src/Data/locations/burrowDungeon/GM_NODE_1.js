import itemSlice from '../../../DataHandlers/redux/slices/items';
import UISlice from '../../../DataHandlers/redux/slices/UI';

export default {
  name: 'GM_NODE_1', 
  icon: 'code',
//   buttons: [
//     {
//       'Take a look around for herbs': {
//         type: 'justButton',
//         onPress: (dispatch, state) => {
//           dispatch(UISlice.actions.addMessageToActivityLog('You take a look around the copse and find a few herbs.'));
//           dispatch(
//             itemSlice.actions.createNewItem({
//               itemType: 'consumable',
//               itemName: 'herb_healing',
//               ownerId: 0,
//             })
//           );
//         },
//       },
//     },
//   ],
  description1: 'The walls are covered in a green spiral of strange characters in an unknown language.',
  prettyName: '???',
  type: 'top',
};