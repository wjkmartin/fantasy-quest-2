import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Inventory.module.css';

import Item from './Item/Item';
import ActiveItemArea from './ActiveItemArea/ActiveItemArea';

import { useDrop } from 'react-dnd';
import itemSlice from '../../../../../DataHandlers/redux/slices/items';

export default function Inventory() {
  const playerGold = useSelector((state) => state.actors.actorsById[0].gold);

  const items = useSelector((state) => state.items.itemsById);
  const playerInventory = items.filter((item) => item.ownerId === 0);
  let [activeItem, setActiveItem] = useState(undefined);

  function onClickItem(item) {
    setActiveItem(item);
  }

  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'itemTrade',
    type: 'item',
    drop: (item) => (
      dispatch(itemSlice.actions.removeItemFromTrade(item.id))
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={styles.Inventory}>
      <div
        className={`${styles.Inventory__itemArea} ${
          canDrop ? styles.onDrag : ''
        }`}
      >
        {playerInventory.map((item) => (
          <Item
            key={`item-${item.id}`}
            setActiveItem={setActiveItem}
            item={item}
            onClick={() => onClickItem(item)}
          />
        ))}
      </div>
      <div className={styles.Inventory__goldArea}>{`₮${playerGold}`}</div>
      <div className={styles.Inventory__itemInfoArea}>
        {activeItem !== undefined ? (
          <ActiveItemArea item={activeItem} setActiveItem={setActiveItem}/>
        ) : (
          ' '
        )}
      </div>
    </div>
  );
}
