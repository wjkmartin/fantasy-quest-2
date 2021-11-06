import React from 'react';

import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { itemColorClass } from '../../../LeftPanel/Notebook/Inventory/util';

import styles from './TradeItem.module.css';

export default function TradeItem(props) {
  const itemsById = useSelector((state) => state.items.itemsById);
  const item = itemsById[props.itemId];

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'itemTrade',
    item: { id: props.itemId, type: 'itemTrade' },
  }));
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div
      onClick={props.onClick}
      onMouseOver={() => props.handleMouseOver(props.itemId)}
      onMouseOut={props.handleMouseOut}
      ref={drag}
      {...collected}
      className={`${props.isSelected && styles.isSelected} ${styles.TradeItem} ${styles[itemColorClass(item.rarity)]}`}
    >
      <i className={`${styles.TradeItem__icon} fas ${item.icon} fa-2x`} />
      <p className={styles.TradeItem__label}>{item.name}</p>
    </div>
  );
}
