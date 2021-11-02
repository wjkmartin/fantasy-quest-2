import React from "react";

import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../../../../DataHandlers/redux/actions";
import itemSlice from "../../../../../../../DataHandlers/redux/slices/items";

export default function EquipButton(props) {
  const playerInventory = useSelector(
    (state) => state.items.inventoryByActorId[0]
  );
  const equippedItemsById = useSelector(
    (state) => state.items.equippedItemsIdsByActorId[0]
  );
  const playerInCombat = useSelector((state) => state.combat.inCombat);

  const isEquipped = equippedItemsById.includes(props.itemId);
  let dispatch = useDispatch();

  function onClickButton(itemId) {
    let item = playerInventory.find((item) => item.id === itemId);
    Object.keys(item.stats).forEach((statType) => {
      switch (statType) {
        default:
          dispatch(
            actions.modifyActorAttributeByActorId(
              0,
              statType,
              isEquipped ? -1 * item.stats[statType] : item.stats[statType]
            )
          );
          break;
      }
    });
    if (isEquipped) {
      dispatch(itemSlice.actions.unequipItemByActorIds({actorId:0, itemId:itemId}));
    } else {
      dispatch(itemSlice.actions.equipItemToActorByIds({actorId:0, itemId:itemId}));
    }
  }

  const equipButton = 
    <button
      className={props.className}
      onClick={() => onClickButton(props.itemId)}
    >
      {isEquipped ? "Unequip Item" : "Equip Item"}
    </button>

  return (
     !playerInCombat ? equipButton : "" 
    );
}
