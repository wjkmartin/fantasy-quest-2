import React from 'react';

import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { itemColorClass } from '../../../LeftPanel/Notebook/Inventory/util';

import styles from './TradeItem.module.css';

export default function TradeItem(props) {
  const itemsById = useSelector(state => state.items.itemsById);
  const item = itemsById[props.itemId];
  
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'itemTrade',
    item: { id: props.itemId, type: 'itemTrade' }
  }))
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected} className={`${styles.TradeItem} ${styles[itemColorClass(item.rarity)]}`}>
      <i className={`fas ${item.icon} fa-2x`} />
      <p className={styles.TradeItem__label}>{item.name}</p>
    </div>
  )
}
