import React from 'react';
import { useSelector } from 'react-redux';

import styles from './ItemInfo.module.css';

function ItemInfo(props) {
  const itemsById = useSelector((state) => state.items.itemsById);
  const item = itemsById[props.itemId];
  return (
      item ? (
  <div className={styles.ItemInfo}>
      <h5>{item.name}</h5>
      <p>₮{item.value}</p>
      <p>{item.desc}</p>
      <p>{item.descDetails}</p>
  </div> ) : <div className={styles.ItemInfo}></div>
      );
}

export default ItemInfo;
