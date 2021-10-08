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

// =============  ACTOR  =============

const setActiveActorInfoWindowById = (id) => {
  return {
    type: "SET_ACTIVE_ACTOR_INFO_WINDOW_BY_ID",
    id: id,
  };
};

const resetActorCombatPropsById = (id) => {
  return {
    type: "RESET_ACTOR_COMBAT_PROPS_BY_ID",
    id: id,
  };
};

const setActorLocationCombat = (id, coords) => {
  return {
    type: "SET_ACTOR_LOCATION_COMBAT",
    id: id,
    coords: coords,
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

// =============  COMBAT  =============

const startCombat = () => {
  return { type: "START_COMBAT" };
};

const addActorToCombatById = (id) => {
  return { type: "ADD_ACTOR_TO_COMBAT_BY_ID", id: id };
};

const setSetupToDone = () => {
  return {
    type: "SET_COMBAT_SETUP_TO_DONE",
  };
};

const setCombatId = (actor, id) => {
  return {
    type: "SET_COMBAT_ID",
    actor: actor,
    id: id,
  };
};

const setPassableMap = (data) => {
  return {
    type: "SET_PASSABLE_MAP",
    data: data,
  };
};

const toggleMoveClick = () => {
  return {
    type: "TOGGLE_MOVE_CLICK",
  };
};

const toggleAttackClick = () => {
  return {
    type: "TOGGLE_ATTACK_CLICK",
  };
};

const setValidMovesById = (id, moves) => {
  return {
    type: "SET_VALID_MOVES_BY_ID",
    id: id,
    moves: moves,
  };
};

const setValidAttackTargetsById = (id, attackTargetCoords) => {
  return {
    type: "SET_ATTACK_TARGETS_BY_ID",
    id: id,
    attacks: attackTargetCoords,
  };
};

const incrementRoundCounter = () => {
  return {
    type: "INCREMENT_ROUND_COUNTER",
  };
};

const setActorInitiative = (id, initiativeOrder) => {
  return {
    type: "SET_ACTOR_INITIATIVE",
    id: id,
    initiativeOrder: initiativeOrder,
  };
};

const setInitiativeOrderList = (initiativeList) => {
  return {
    type: "SET_INITIATIVE_LIST",
    initiativeList: initiativeList,
  };
};

const setCurrentTurnById = (id) => {
  return {
    type: "SET_CURRENT_TURN_BY_ID",
    id: id,
  };
};

const endTurn = (initiativeList, currentTurnById) => {
  return {
    type: "END_TURN",
    initiativeList: initiativeList,
    currentTurnById: currentTurnById
  };
};

const endCombat = () => {
  return {
    type: "END_COMBAT",
  };
};

const killActorInCombat = (id) => {
  return {
    type: "KILL_ACTOR_IN_COMBAT",
    id: id,
  };
};

const setDuelFlag = () => {
  return {
    type: "SET_DUEL_FLAG",
  };
};

// =============  UI  =============

const addMessageToActivityLog = (message, styleType) => {
  return {
    type: "ADD_MESSAGE_TO_ACTIVITY_LOG",
    message: message,
    styleType: styleType
  };
};

const startConversationWithActorById = (id) => {
  return {
    type: "START_COVERSATION_WITH_ACTOR_BY_ID",
    id: id,
  };
};

const endConversation = () => {
  return {
    type: "END_CONVERSATION",
  };
};

const setMainImage = (image) => {
  return {
    type: "SET_MAIN_IMAGE",
    image: image,
  };
};

const addtoCurrentDialogueText = (text) => {
  return {
    type: "ADD_TO_CURRENT_DIALOGUE_TEXT",
    text: text,
  };
};

const clearCurrentDialogueText = () => {
  return {
    type: "CLEAR_CURRENT_DIALOGUE_TEXT",
  };
};

const setIsAnimating = (isAnimatingFlag) => {
  return {
    type: "SET_IS_ANIMATING",
    isAnimatingFlag: isAnimatingFlag
  }
}

const setAnimationPath = (animationPath) => {
  return {
    type: "SET_ANIMATION_PATH", 
    animationPath: animationPath
  }
}

// =============  ITEMS  =============

const inventorySetActiveItemById = (itemId) => {
  return {
    type: "INVENTORY_SET_ACTIVE_ITEM",
    id: itemId,
  };
};

const equippedSetActiveItemById = (itemId) => {
  return {
    type: "EQUIPPED_SET_ACTIVE_ITEM",
    id: itemId,
  };
};

const addItemToActorById = (actorId, itemObject) => {
  return {
    type: "ADD_ITEM_TO_ACTOR_BY_ID",
    id: actorId,
    item: itemObject,
  };
};

const equipItemToActorByIds = (actorId, itemId) => {
  return {
    type: "EQUIP_ITEM_TO_ACTOR_BY_IDS",
    actorId: actorId,
    itemId: itemId,
  };
};

const unequipItemByActorIds = (actorId, itemId) => {
  return {
    type: "UNEQUIP_ITEM_FROM_ACTOR_BY_IDS",
    actorId: actorId,
    itemId: itemId,
  };
};

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

const dropItemByIds = (actorId, itemId) => {
  return {
    type: "DROP_ITEM_FROM_ACTOR_BY_IDS",
    actorId: actorId,
    itemId: itemId,
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
  setActorLocationCombat,
  moveActorLocationCombat,
  resetActionAndMovementById,
  startCombat,
  modifyActorAttributeByActorId,
  setActorAttributeByActorId,
  killActorInCombat,
  setDuelFlag,
  removeActorFromCurrentLocationById,
  createNewActorFromDataFileAndLocation,
  addPowerToActorByDataReferenceAndId,
  removePowerFromActorByDataReferenceAndId,
  updatePowerDuration,
  setSetupToDone, //COMBAT
  addActorToCombatById,
  resetActorCombatPropsById,
  setCombatId,
  setPassableMap,
  toggleMoveClick,
  toggleAttackClick,
  setValidMovesById,
  setValidAttackTargetsById,
  incrementRoundCounter,
  setActorInitiative,
  setInitiativeOrderList,
  setCurrentTurnById,
  endTurn,
  endCombat,
  addMessageToActivityLog, //UI
  startConversationWithActorById,
  endConversation,
  setMainImage,
  addtoCurrentDialogueText,
  clearCurrentDialogueText,
  setIsAnimating,
  setAnimationPath,
  inventorySetActiveItemById, //ITEMS
  equippedSetActiveItemById,
  addItemToActorById,
  equipItemToActorByIds,
  unequipItemByActorIds,
  startTradeWithActorById,
  addItemToActiveTradeWindowById,
  removeItemFromActiveTradeWindowById,
  tradeItemByIdFromActorToActorByIds,
  finalizeTrade,
  dropItemByIds,
  setQuestStage, //QUESTS
};
