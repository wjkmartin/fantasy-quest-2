import React from 'react';
import styles from './Item.module.css';

import { itemColorClass } from '../util';
import { useDrag } from 'react-dnd';

import { useSelector } from 'react-redux';

export default function Item(props) {
  const itemsInTrade = useSelector(
    (state) => state.items.itemsPlayerWantsToTradeById
  );

  const itemIsinTrade = itemsInTrade.includes(props.item.id);

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { id: props.item.id, type: 'item' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const itemInTrade = itemsInTrade.includes(item.id);
      if (item && dropResult && !itemInTrade) {
        props.setActiveItem(undefined);
        // dispatch(actions.addItemToActiveTradeWindowById(item.id));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      style={{ opacity }}
      className={`${styles.Item}`}
      onClick={props.onClick}
    >
      <div className={`${itemIsinTrade ? styles.inTrade : ''} ${styles.Item__itemLine} ${props.active ? styles.active : ''}`}>
        <i
          className={`${styles.Item__itemIcon} ${
            styles[itemColorClass(props.item.rarity)]
          } fas ${props.item.icon} fa-2x`}
        />
        <div className={styles.Item__itemBasicInfo}>
          <p className={styles.Item__itemBasicInfo_itemLabel}>
            {props.item.name + (props.item.equipped ? ' (equipped)' : '')}
          </p>
          <p className={styles.Item__itemBasicInfo_itemDescDetails}>
            {props.item.descDetails}
          </p>
        </div>
        <p className={styles.Item__itemBasicInfo_itemQty}>
          {props.item.qty > 1 ? props.item.qty : ' '}
        </p>
      </div>
    </div>
  );
}
