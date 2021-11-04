import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import actors from '../../../../../../../DataHandlers/redux/slices/actors';
import itemSlice from '../../../../../../../DataHandlers/redux/slices/items';

export default function EquipButton(props) {
  const playerInventory = useSelector(
    (state) => state.items.inventoryByActorId[0]
  );
  const equippedItems = playerInventory.filter((item) => item.equipped);

  const playerInCombat = useSelector((state) => state.combat.inCombat);

  const isEquipped = equippedItems.find((item) => item.id === props.item.id);
  let dispatch = useDispatch();

  function onClickButton(_item) {
    Object.keys(_item.stats).forEach((statType) => {
      dispatch(
        actors.actions.modifyActorAttributeByActorId({
          actorId: 0,
          attribute: statType,
          value: isEquipped
            ? -1 * _item.stats[statType]
            : _item.stats[statType],
        })
      );
    });
    if (isEquipped) {
      dispatch(
        itemSlice.actions.unequipItemFromActorByIds({
          actorId: 0,
          itemId: _item.id,
        })
      );
    } else {
      const alreadyEquippedItemIdInSameSlot = equippedItems.find(
        (item) => item.slot === _item.slot
      );
      if (alreadyEquippedItemIdInSameSlot) {
        dispatch(
          itemSlice.actions.unequipItemFromActorByIds({
            actorId: 0,
            itemId: alreadyEquippedItemIdInSameSlot,
          })
        );
      }
      dispatch(
        itemSlice.actions.equipItemToActorByIds({ actorId: 0, itemId: _item.id })
      );
    }
  }

  const equipButton = (
    <button
      className={props.className}
      onClick={() => onClickButton(props.item)}
    >
      {isEquipped ? 'Unequip Item' : 'Equip Item'}
    </button>
  );

  return !playerInCombat ? equipButton : '';
}
