import Item from "../../../Entities/Item/Item";

const initalState = {
  inventoryByActorId: {
    0: [
      new Item("weapon", "oak_stave"),
      new Item("chest", "basic_robes"),
      new Item("feet", "basic_boots"),
      new Item("consumable", "potion_of_healing")
    ],
    1: [new Item("head", "basic_circlet")],
  },
  equippedItemsIdsByActorId: { 0: [] },
  inTrade: false,
  actorInTradeById: undefined,
  itemsPlayerWantsToTradeById: [],
  itemsOtherActorWantsToTrade: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case "ADD_ITEM_TO_ACTOR_BY_ID": {
      const item = action.item;
      const actorId = action.id;

      const inventoryForActor = [...state.inventoryByActorId[actorId]];
      inventoryForActor.push(item);

      return {
        ...state,
        inventoryByActorId: {
          ...state.inventoryByActorId,
          [actorId]: [...inventoryForActor],
        },
      };
    }
    case "EQUIP_ITEM_TO_ACTOR_BY_IDS": {
      const itemId = action.itemId;
      const actorId = action.actorId;

      let currentEquippedItemsById = state.equippedItemsIdsByActorId[actorId];
      let modifiedEquippedItemsById = [];

      if (currentEquippedItemsById.includes(itemId) === false) {
        modifiedEquippedItemsById = [...currentEquippedItemsById];
        modifiedEquippedItemsById.push(itemId);

        return {
          ...state,
          equippedItemsIdsByActorId: {
            ...state.equippedItemsIdsByActorId,
            [actorId]: [...modifiedEquippedItemsById],
          },
        };
      } else return { ...state };
    }
    case "INVENTORY_SET_ACTIVE_ITEM": {
      const itemId = action.id;
      if (itemId === -1) {
        return {
          ...state,
          inventoryActiveItemId: undefined
        }
      }
      return {
        ...state,
        inventoryActiveItemId: itemId,
      };
    }
    case "EQUIPPED_SET_ACTIVE_ITEM": {
      const itemId = action.id;
      return {
        ...state,
        equippedActiveItemId: itemId,
      };
    }
    case "UNEQUIP_ITEM_FROM_ACTOR_BY_IDS": {
      const itemId = action.itemId;
      const actorId = action.actorId;

      let currentEquippedItemsById = state.equippedItemsIdsByActorId[actorId];

      return {
        ...state,
        equippedItemsIdsByActorId: {
          ...state.equippedItemsIdsByActorId,
          [actorId]: currentEquippedItemsById.filter((id) => id !== itemId),
        },
      };
    }
    case "START_TRADE_WITH_ACTOR_BY_ID": {
      return {
        ...state,
        inTrade: true,
        actorInTradeById: action.actorId,
      };
    }
    case "ADD_ITEM_TO_ACTIVE_TRADE_WINDOW_BY_ID": {
      const currentTradeItemsById = state.itemsPlayerWantsToTradeById;
      let modifiedTradeItemsById = [...currentTradeItemsById];
      modifiedTradeItemsById.push(action.itemId);
      return {
        ...state,
        itemsPlayerWantsToTradeById: modifiedTradeItemsById,
      };
    }
    case "REMOVE_ITEM_FROM_ACTIVE_TRADE_WINDOW_BY_ID": {
      let modifiedTradeItemsById = [...state.itemsPlayerWantsToTradeById];
      modifiedTradeItemsById.splice(
        modifiedTradeItemsById.findIndex((id) => id === action.itemId),
        1
      );
      return {
        ...state,
        itemsPlayerWantsToTradeById: modifiedTradeItemsById,
      };
    }
    case "TRADE_ITEM_BY_ID_FROM_ACTOR_TO_ACTOR_BY_IDS": {
      let itemToTradeIndex = state.inventoryByActorId[
        action.actorSendingId
      ].findIndex((item) => item.id === action.itemId);
      const item =
        state.inventoryByActorId[action.actorSendingId][itemToTradeIndex];

      let actorInventoryWithoutTradedItem = [
        ...state.inventoryByActorId[action.actorSendingId],
      ];
      actorInventoryWithoutTradedItem.splice(itemToTradeIndex, 1);

      let actorInventoryWithTradedItem = [
        ...state.inventoryByActorId[action.actorRecievingId],
      ];
      actorInventoryWithTradedItem.push(item);

      return {
        ...state,
        inventoryByActorId: {
          ...state.inventoryByActorId,
          [action.actorSendingId]: actorInventoryWithoutTradedItem,
          [action.actorRecievingId]: actorInventoryWithTradedItem,
        },
      };
    }
    case "FINALIZE_TRADE": {
      return {
        ...state,
        inTrade: false,
        actorInTradeById: undefined,
        itemsPlayerWantsToTradeById: [],
        itemsOtherActorWantsToTrade: [],
      };
    }
    case "DROP_ITEM_FROM_ACTOR_BY_IDS": {
      let inventoryAfter = state.inventoryByActorId[action.actorId]
      const itemIndex = inventoryAfter.findIndex(item => item.id === action.itemId)
      inventoryAfter.splice(itemIndex, 1)
      
      return {
        ...state, 
        inventoryByActorId: {
          ...state.inventoryByActorId,
          [action.actorId]: inventoryAfter 
        }
        
      }
    }
    default: {
      return state;
    }
  }
}
