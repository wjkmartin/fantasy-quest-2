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
  itemsSelectedByPlayerById: [],
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
    createNewItem: (state, action) => {
      const { itemType, itemName, ownerId, location=undefined} = action.payload;
      const newItem = new Item(itemType, itemName, ownerId, location);
      state.itemsById.push(newItem);
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
    startTradeWithActor: (state, action) => {
      state.inTrade = true;
      state.actorInTradeById = action.payload;
    },
    addItemToTrade: (state, action) => {
      const item = state.itemsById.find((item) => item.id === action.payload);
      if (state.itemsPlayerWantsToTradeById.includes(action.payload) || state.itemsSelectedByPlayerById.includes(action.payload)) {
        return;
      } else {
        if (item.ownerId === 0) {
          state.itemsPlayerWantsToTradeById.push(action.payload);
        } else {
          state.itemsSelectedByPlayerById.push(action.payload);
        }
      }
     
    },
    removeItemFromTrade: (state, action) => {
      const item = state.itemsById.find((item) => item.id === action.payload);
      if (item.ownerId === 0) {
        state.itemsPlayerWantsToTradeById = state.itemsPlayerWantsToTradeById.filter((itemId) => itemId !== action.payload);
      } else {
        state.itemsSelectedByPlayerById = state.itemsSelectedByPlayerById.filter((itemId) => itemId !== action.payload);
      }
    },
    doTrade: (state) => {
      state.itemsPlayerWantsToTradeById.forEach((itemId) => {
        const itemToRemove = state.itemsById.find((itemToFind) => itemToFind.id === itemId);
        itemToRemove.ownerId = state.actorInTradeById;
        itemToRemove.equipped = false;
      });
      state.itemsSelectedByPlayerById.forEach((itemId) => {
        const itemToRemove = state.itemsById.find((itemToFind) => itemToFind.id === itemId);
        itemToRemove.ownerId = 0;
        itemToRemove.equipped = false;
      });
      state.inTrade = false;
      state.actorInTradeById = undefined;
      state.itemsPlayerWantsToTradeById = [];
      state.itemsSelectedByPlayerById = [];
    },
    cancelTrade: (state) => {
      state.inTrade = false;
      state.actorInTradeById = undefined;
      state.itemsPlayerWantsToTradeById = [];
      state.itemsSelectedByPlayerById = [];
    }, 
  },
});

export const {
  setItemOwnerByIds,
  equipItemById,
  unequipItemById,
  createNewItem,
  dropItemFromInventory,
  removeItemFromLocation,
  removeItemFromPlayerInventory,
  startTradeWithActor,
  addItemToTrade,
  removeItemFromTrade,
  doTrade,
  cancelTrade,
} = itemSlice.actions;
export default itemSlice;

