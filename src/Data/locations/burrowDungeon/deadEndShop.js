import itemSlice from '../../../DataHandlers/redux/slices/items';
import UISlice from '../../../DataHandlers/redux/slices/UI';

export default {
  name: 'deadEndShop', 
  icon: 'flask-potion',
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
  description1: 'There\'s a sizable hole in the far wall... it would seem to be a small shop as been setup in the crevice. A crudely written sign above says "DeD En\' Deels". The proprietor, a frail-looking, aging goblin, peers out from the hole - and appears friendly, greeting you with a warm smile.',
  prettyName: 'Dead end',
  type: 'top',
};