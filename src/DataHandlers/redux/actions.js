//SPLIT THIS INTO MULTIPLE FILES!!!!!

// =============  LOCATION  =============

const setLocationById = (locationId) => {
  return {
    type: "SET_CURRENT_LOCATION_BY_ID",
    id: locationId,
  };
};

const setSubLocationByName = (name) => {
  return {
    type: "SET_SUBLOCATION_BY_NAME",
    name: name,
  };
};

const setMap = (mapName, startLocationName) => {
  return {
    type: "SET_MAP",
    mapName: mapName,
    startLocationName: startLocationName,
  };
};

const setHasAggressiveActors = (flag) => {
  return {
    type: "SET_HAS_AGGRESSIVE_ACTORS",
    flag: flag,
  };
};

const setIsDiscovered = (locationId) => {
  return {
    type: "SET_IS_DISCOVERED",
    locationId: locationId,
  };
};

const saveCurrentMapState = () => {
  return {
    type: "SAVE_CURRENT_MAP_STATE",
  };
};

const loadSavedMapStateForMap = (mapName) => {
  return {
    type: "LOAD_SAVED_MAP_STATE_FOR_MAP",
    mapName: mapName,
  };
};

const modifyLocationPropertyById = (locationId, property, newValue) => {
  return {
    type: "MODIFY_LOCATION_PROPERTY_BY_ID",
    locationId: locationId,
    property: property,
    newValue: newValue
   };
};

// =============  ACTOR  =============\



const setActiveActorInfoWindowById = (id) => {
  return {
    type: "SET_ACTIVE_ACTOR_INFO_WINDOW_BY_ID",
    id: id,
  };
};

const moveActorLocationCombat = (id, coords) => {
  return {
    type: "MOVE_ACTOR_LOCATION_COMBAT",
    id: id,
    coords: coords,
  };
};

const attackTargetWithAbility = (attackerId, targetId, ability) => {
  return {
    type: "ATTACK_TARGET_WITH_ABILITY_BY_ACTOR_ID_AND_ABILITY_NAME",
    attackerId: attackerId,
    targetId: targetId,
    ability: ability,
  };
};

const resetActionAndMovementById = (id) => {
  return {
    type: "RESET_ACTOR_ACTION_AND_MOVEMENT_BY_ID",
    id: id,
  };
};

const modifyActorAttributeByActorId = (actorId, attribute, delta) => {
  return {
    type: "MODIFY_ACTOR_ATTRIBUTE_BY_ACTOR_ID",
    actorId: actorId,
    attribute: attribute,
    delta: delta,
  };
};

const setActorAttributeByActorId = (actorId, attribute, value) => {
  return {
    type: "SET_ACTOR_ATTRIBUTE_BY_ACTOR_ID",
    actorId: actorId,
    attribute: attribute,
    value: value,
  };
};

const removeActorFromCurrentLocationById = (actorId) => {
  return {
    type: "REMOVE_ACTOR_FROM_CURRENT_LOCATION_BY_ID",
    actorId: actorId,
  };
};

const createNewActorFromDataFileAndLocation = (data, location) => {
  return {
    type: "CREATE_NEW_ACTOR_FROM_DATA_FILE_AND_LOCATION",
    data: data,
    location: location
  }
}

const addPowerToActorByDataReferenceAndId = (ref, id) => {
  return {
    type: "ADD_POWER_TO_ACTOR_BY_DATA_REFERENCE_AND_ID",
    ref: ref,
    id: id
  }
}

const removePowerFromActorByDataReferenceAndId = (ref, id) => {
  return {
    type: "REMOVE_POWER_FROM_ACTOR_BY_DATA_REFERENCE_AND_ID",
    ref: ref,
    id: id
  }
}

const updatePowerDuration = (ref, id, durationRemaining) => {
  return {
    type: "UPDATE_POWER_DURATION",
    ref: ref,
    id: id,
    durationRemaining: durationRemaining
  }
}


// =============  ITEMS  =============

const startTradeWithActorById = (actorId) => {
  return {
    type: "START_TRADE_WITH_ACTOR_BY_ID",
    actorId: actorId,
  };
};

const addItemToActiveTradeWindowById = (itemId) => {
  return {
    type: "ADD_ITEM_TO_ACTIVE_TRADE_WINDOW_BY_ID",
    itemId: itemId,
  };
};

const removeItemFromActiveTradeWindowById = (itemId) => {
  return {
    type: "REMOVE_ITEM_FROM_ACTIVE_TRADE_WINDOW_BY_ID",
    itemId: itemId,
  };
};

const tradeItemByIdFromActorToActorByIds = (
  itemId,
  actorSendingId,
  actorRecievingId
) => {
  return {
    type: "TRADE_ITEM_BY_ID_FROM_ACTOR_TO_ACTOR_BY_IDS",
    itemId: itemId,
    actorSendingId: actorSendingId,
    actorRecievingId: actorRecievingId,
  };
};


const finalizeTrade = () => {
  return {
    type: "FINALIZE_TRADE",
  };
};


const setQuestStage = (quest, questStage) => {
  return {
    type: "SET_QUEST_STAGE",
    quest: quest,
    questStage: questStage,
  };
};

export default {
  setLocationById, //LOCATION
  setSubLocationByName,
  setMap,
  setHasAggressiveActors,
  setIsDiscovered,
  saveCurrentMapState,
  loadSavedMapStateForMap,
  modifyLocationPropertyById,
  setActiveActorInfoWindowById, //ACTOR
  attackTargetWithAbility,

  moveActorLocationCombat,
  resetActionAndMovementById,
  modifyActorAttributeByActorId,
  setActorAttributeByActorId,

  removeActorFromCurrentLocationById,
  createNewActorFromDataFileAndLocation,
  addPowerToActorByDataReferenceAndId,
  removePowerFromActorByDataReferenceAndId,
  updatePowerDuration,
//ITEMS,
  startTradeWithActorById,
  addItemToActiveTradeWindowById,
  removeItemFromActiveTradeWindowById,
  tradeItemByIdFromActorToActorByIds,
  finalizeTrade,
  setQuestStage, //QUESTS
};
