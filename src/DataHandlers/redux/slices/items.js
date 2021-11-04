import { createSlice } from "@reduxjs/toolkit";
import Item from "../../../Entities/Item/Item";

const initialState = {
  inventoryByActorId: {
    0: [
      new Item("weapon", "oak_stave"),
      new Item("chest", "basic_robes"),
      new Item("feet", "basic_boots")],
    1: [new Item("head", "basic_circlet")],
    4: [new Item("consumable", "potion_of_healing"), new Item("consumable", "potion_of_healing")],
    5: [new Item("weapon", "rusty_sword"), new Item("weapon", "iron_sword"), new Item("weapon", "steel_sword"), new Item("weapon", "enchanted_steel_sword")],
  },
  equippedItemsIdsByActorId: { 0: [] }, // this sucks - improve to be something like : equipped items by actorId , { 0: {head: item, weapon: item} } etc
  inTrade: false,
  actorInTradeById: undefined,
  itemsPlayerWantsToTradeById: [],
  itemsOtherActorWantsToTrade: [],
  itemsByLocationName: {
    "centralSquare": [
      new Item("weapon", "enchanted_steel_sword"),
    ],
  }
};

const itemSlice = createSlice({
    name: "items",
    initialState: initialState,
    reducers: {
        addItemToActorById: (state, action) => {
            const { actorId, item } = action.payload;
            state.inventoryByActorId[actorId].push(item);
        },
        equipItemToActorByIds: (state, action) => {
            const { actorId, itemId } = action.payload;
            state.equippedItemsIdsByActorId[actorId].push(itemId);
        },
        unequipItemFromActorByIds: (state, action) => {
            const { actorId, itemId } = action.payload;
            state.equippedItemsIdsByActorId[actorId] = state.equippedItemsIdsByActorId[actorId].filter(id => id !== itemId);
        },
        dropItemFromInventory: (state, action) => {
            const { itemId, locationName } = action.payload;
            const item = state.inventoryByActorId[0].find(item => item.id === itemId);
            state.inventoryByActorId[0] = state.inventoryByActorId[0].filter(item => item.id !== itemId);
            state.itemsByLocationName[locationName].push(item);
        },
        dropItemFromEquipped: (state, action) => { 
            // currently not used
            const { itemId, locationName } = action.payload;
            const item = state.equippedItemsIdsByActorId[0].find(item => item.id === itemId);
            state.equippedItemsIdsByActorId[0] = state.equippedItemsIdsByActorId[0].filter(item => item.id !== itemId);
            state.itemsByLocationName[locationName].push(item);
        },
        removeItemFromLocation: (state, action) => {
            const { itemId, locationName } = action.payload;
            state.itemsByLocationName[locationName] = state.itemsByLocationName[locationName].filter(item => item.id !== itemId);
        },
    }
})

export const { addItemToActorById, equipItemToActorByIds, unequipItemFromActorByIds, inventorySetActiveItem, equippedSetActiveItem, dropItemFromInventory, dropItemFromEquipped, removeItemFromLocation } = itemSlice.actions;
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