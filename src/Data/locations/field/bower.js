import itemSlice from '../../../DataHandlers/redux/slices/items';

export default {
  name: 'bower', // should be
  icon: 'tree',

  buttons: [
    {
      'Take a look around for herbs': {
        type: 'justButton',
        onPress: (dispatch, state) => {
          dispatch(
            itemSlice.actions.createNewItem({
              itemType: 'consumable',
              itemName: 'herb_healing',
              ownerId: 0,
            })
          );
        },
      },
    },
  ],
  description1: 'A quiet copse of trees.',
  prettyName: 'Grassy Clearing',
  type: 'top',
};
