import { createSlice } from '@reduxjs/toolkit';
import Item from '../../../Entities/Item/Item';

const initialState = {
  itemsById: [
    new Item('weapon', 'oak_stave', 0),
    new Item('chest', 'basic_robes', 0),
    new Item('feet', 'basic_boots', 0),
    new Item('head', 'basic_circlet', 0),
    new Item('consumable', 'potion_of_healing', 0),
    new Item('consumable', 'potion_of_healing', 1),
    new Item('consumable', 'potion_of_healing', 1),
    new Item('weapon', 'rusty_sword', 5),
    new Item('weapon', 'iron_sword', 5),
    new Item('weapon', 'steel_sword', 5),
    new Item('weapon', 'enchanted_steel_sword', 5),
    new Item('weapon', 'enchanted_steel_sword', -1, 'centralSquare'),
  ],

  inTrade: false,
  actorInTradeById: undefined,
  itemsPlayerWantsToTradeById: [],
  itemsOtherActorWantsToTrade: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState: initialState,
  reducers: {
    setItemOwnerByIds: (state, action) => {
      const { actorId, itemId } = action.payload;
      const item = state.itemsById.find((item) => item.id === itemId);
      item.ownerId = actorId;
    },
    equipItemById: (state, action) => {
      const item = state.itemsById.find((item) => item.id === action.payload);
      item.equipped = true;
    },
    unequipItemById: (state, action) => {
      const { itemId } = action.payload;
      const item = state.itemsById.find((item) => item.id === itemId);
      item.equipped = false;
    },
    dropItemFromInventory: (state, action) => {
      const { itemId, locationName } = action.payload;
      const item = state.itemsById.find((item) => item.id === itemId);
      item.ownerId = undefined;
      item.equipped = false;
      item.location = locationName;
    },
    removeItemFromLocation: (state, action) => {
      const { itemId } = action.payload;
      const item = state.itemsById.find((item) => item.id === itemId);
      item.location = undefined;
    },
    removeItemFromPlayerInventory: (state, action) => {
      const { itemId } = action.payload;
      const item = state.itemsById.find((item) => item.id === itemId);
      item.ownerId = undefined;
    },
  },
});

export const {
  addItemToActorFromLocationByIdAndName: addItemToActorById,
  equipItemById,
  unequipItemFromActorByIds,
  inventorySetActiveItem,
  equippedSetActiveItem,
  dropItemFromInventory,
  dropItemFromEquipped,
  removeItemFromLocation,
  removeItemFromPlayerInventory,
} = itemSlice.actions;
export default itemSlice;

// case "START_TRADE_WITH_ACTOR_BY_ID": {
//   return {
//     ...state,
//     inTrade: true,
//     actorInTradeById: action.actorId,
//   };
// }
// case "ADD_ITEM_TO_ACTIVE_TRADE_WINDOW_BY_ID": {
//   const currentTradeItemsById = state.itemsPlayerWantsToTradeById;
//   let modifiedTradeItemsById = [...currentTradeItemsById];
//   modifiedTradeItemsById.push(action.itemId);
//   return {
//     ...state,
//     itemsPlayerWantsToTradeById: modifiedTradeItemsById,
//   };
// }
// case "REMOVE_ITEM_FROM_ACTIVE_TRADE_WINDOW_BY_ID": {
//   let modifiedTradeItemsById = [...state.itemsPlayerWantsToTradeById];
//   modifiedTradeItemsById.splice(
//     modifiedTradeItemsById.findIndex((id) => id === action.itemId),
//     1
//   );
//   return {
//     ...state,
//     itemsPlayerWantsToTradeById: modifiedTradeItemsById,
//   };
// }
// case "TRADE_ITEM_BY_ID_FROM_ACTOR_TO_ACTOR_BY_IDS": {
//   let itemToTradeIndex = state.inventoryByActorId[
//     action.actorSendingId
//   ].findIndex((item) => item.id === action.itemId);
//   const item =
//     state.inventoryByActorId[action.actorSendingId][itemToTradeIndex];

//   let actorInventoryWithoutTradedItem = [
//     ...state.inventoryByActorId[action.actorSendingId],
//   ];
//   actorInventoryWithoutTradedItem.splice(itemToTradeIndex, 1);

//   let actorInventoryWithTradedItem = [
//     ...state.inventoryByActorId[action.actorRecievingId],
//   ];
//   actorInventoryWithTradedItem.push(item);

//   return {
//     ...state,
//     inventoryByActorId: {
//       ...state.inventoryByActorId,
//       [action.actorSendingId]: actorInventoryWithoutTradedItem,
//       [action.actorRecievingId]: actorInventoryWithTradedItem,
//     },
//   };
// }
// case "FINALIZE_TRADE": {
//   return {
//     ...state,
//     inTrade: false,
//     actorInTradeById: undefined,
//     itemsPlayerWantsToTradeById: [],
//     itemsOtherActorWantsToTrade: [],
//   };
// }
