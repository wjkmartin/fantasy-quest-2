import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import itemSlice from '../../../../../../../DataHandlers/redux/slices/items';
import actorSlice from '../../../../../../../DataHandlers/redux/slices/actors';

export default function EquipButton(props) {
  const playerInCombat = useSelector((state) => state.combat.inCombat);
  let dispatch = useDispatch();
  console.log(props.item)
  const itemsEquipped = useSelector((state) => state.items.itemsById).filter((item) => item.equipped);
  const activeItem = useSelector((state) => state.items.itemsById).find((item) => item.id === props.item.id);
  
  function onClickButton() {
    Object.keys(props.item.stats).forEach((statType) => {
      dispatch(
        actorSlice.actions.modifyActorAttributeByActorId({
          actorId: 0,
          attribute: statType,
          value: activeItem.equipped
            ? -1 * props.item.stats[statType]
            : props.item.stats[statType],
        })
      );
    });
    if (activeItem.equipped) {
      dispatch(
        itemSlice.actions.unequipItemById({
          itemId: props.item.id,
        })
      );
    } else {
      const alreadyEquippedItemIdInSameSlot = itemsEquipped.find(
        (_item) => props.item.slot === _item.slot
      );
      if (alreadyEquippedItemIdInSameSlot) {
        dispatch(
          itemSlice.actions.unequipItemById({
            itemId: alreadyEquippedItemIdInSameSlot.id,
          })
        );
      }
      dispatch(
        itemSlice.actions.equipItemById(props.item.id)
      );
    }
  }

  const equipButton = (
    <button
      className={props.className}
      onClick={() => onClickButton()}
    >
      {activeItem.equipped ? 'Unequip Item' : 'Equip Item'}
    </button>
  );

  return !playerInCombat ? equipButton : '';
}
