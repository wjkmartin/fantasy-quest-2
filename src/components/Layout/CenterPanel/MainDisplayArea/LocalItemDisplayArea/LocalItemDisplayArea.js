import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemColorClass } from '../../../LeftPanel/Notebook/Inventory/util';

import styles from './LocalItemDisplayArea.module.css';

function LocalItemDisplayArea(props) {
  let currentItemsButtonList = [];
  const dispatch = useDispatch();
  const currentItems = useSelector(
    (state) => state.items.itemsByLocationName[props.currentLocation.name]
  ) || [];

  function onItemClick(item) {
    console.log(item.name)
  }

  currentItems.forEach((item) => {
    currentItemsButtonList.push(
      <li
        className={`${styles.itemButton} ${styles[itemColorClass(item.rarity)]}`}
        key={item.name}
        onClick={() => onItemClick(item)}
      >
        {item.name}
      </li>
    );
  });

  return (
    <div className={styles.LocalItemDisplayArea}>
      <div className={styles.ItemsHereLabel}>
        ITEMS
        <br />
        HERE
      </div>
      <ul className={styles.itemList}>
        {currentItems !== undefined ? currentItemsButtonList : ' '}
      </ul>
    </div>
  );
}

export default LocalItemDisplayArea;
