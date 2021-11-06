import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ItemInfo.module.css';

import { itemRarityName, itemColorClass } from '../../../LeftPanel/Notebook/Inventory/util'

function ItemInfo(props) {
  const itemsById = useSelector((state) => state.items.itemsById);
  const item = itemsById[props.itemId];
  return (
      item ? (
  <div className={`${styles.ItemInfo} ${styles.border}`}>
      <h5>{item.name}</h5>
      <p className={styles[itemColorClass(item.rarity)]}>{itemRarityName(item.rarity)}</p>
      <p>₮{item.value}</p>
      <p>{item.desc}</p>
      <p>{item.descDetails}</p>
  </div> ) : <div className={styles.ItemInfo}></div>
      );
}

export default ItemInfo;
