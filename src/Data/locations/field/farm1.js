import itemSlice from '../../../DataHandlers/redux/slices/items';

export default {
  name: 'farm1', 
  icon: 'wheat',
//   buttons: [
//     {
//       'Take a look around for herbs': {
//         type: 'justButton',
//         onPress: (dispatch, state) => {
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
  description1: 'A farm (1).',
  prettyName: 'The Brendine Farm',
  type: 'top',
};