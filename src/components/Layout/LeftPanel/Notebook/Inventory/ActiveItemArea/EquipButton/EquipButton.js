import React from "react";

import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../../../../DataHandlers/redux/actions";

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
      dispatch(actions.unequipItemByActorIds(0, itemId));
    } else {
      dispatch(actions.equipItemToActorByIds(0, itemId));
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
