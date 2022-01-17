import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemColorClass } from '../../LeftPanel/Notebook/Inventory/util';

import UI from '../../../../DataHandlers/redux/slices/UI';

import styles from './LocalItemDisplayArea.module.css';

function LocalItemDisplayArea(props) {
  let currentItemsButtonList = [];
  const dispatch = useDispatch();
  const currentItems = useSelector((state) =>
    state.items.itemsById.filter(
      (item) => item.location === props.currentLocation.name
    )
  );

  console.log(currentItems);

  function onItemClick(item) {
    console.log(item.name);
  }

  currentItems.forEach((item) => {
    currentItemsButtonList.push(
      <div
        className={`${styles.itemButton} ${
          styles[itemColorClass(item.rarity)]
        }`}
        key={item.name}
        onClick={() =>
          dispatch(
            UI.actions.setActiveItemOrNpcTarget({ type: 'item', id: item.id })
          )
        }
      >
        {item.name}
      </div>
    );
  });

  return (
    <div style={{ height: '100%', width: '50%' }}>
      <div className={styles.LocalItemDisplayArea}>
        <div className={styles.ItemsHereLabel}>
          ITEMS HERE
        </div>
        <div className={styles.itemList}>
          {currentItems !== undefined ? currentItemsButtonList : ' '}
        </div>
      </div>
    </div>
  );
}

export default LocalItemDisplayArea;
