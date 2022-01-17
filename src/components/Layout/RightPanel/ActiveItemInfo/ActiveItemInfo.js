import React from 'react';
import { useDispatch } from 'react-redux';



import UI from '../../../../DataHandlers/redux/slices/UI';
import itemSlice from '../../../../DataHandlers/redux/slices/items';

import { itemColorClass } from '../../LeftPanel/Notebook/Inventory/util';
import { itemRarityName } from '../../LeftPanel/Notebook/Inventory/util';

import styles from './ActiveItemInfo.module.css';

function ActiveItemInfo(props) {
  const item = props.activeItem;
  const dispatch = useDispatch();
  //   enchanted_steel_sword: {
  //     name: 'Enchanted Steel Sword',
  //     icon: 'fa-sword',
  //     rarity: 4,
  //     descDetails: 'Deals an additional 3d4 + 14 damage per hit.',
  //     desc: 'Enchanted weapons deal devastating damage to the magically unprotected, albeit at a significant cost.',
  //     stats: {weaponDamageFunction: function() {return _.random(1,4) + _.random(1,4) + _.random(1,4) + 14}},
  //     value: 1000,
  //     slot: 'weapon_main',
  //     addedDmgString: '3d4 + 14',
  //     magic: true

  function pickupItem(itemId) {
    dispatch(itemSlice.actions.setItemOwnerByIds({actorId:0, itemId: item.id}));
    dispatch(itemSlice.actions.removeItemFromLocation({itemId: itemId, locationName: props.locationName}));
    dispatch(UI.actions.setActiveItemOrNpcTarget({ type: null, id: null }));
  }

  return (
    <div className={props.className}>
      <div className={styles.header}>
        <i
          className={`${styles[itemColorClass(item?.rarity)]} ${
            styles.icon
          } fas ${item?.icon} fa-4x`}
        />
        <div className={styles.itemName}>{item?.name}</div>
      </div>
      <div className={styles.descContainer}>
        <p className={`${styles[itemColorClass(item?.rarity)]} ${styles.itemRarityDesc}`}>{itemRarityName(item?.rarity)} rarity</p>
        <p className={styles.itemDesc}>{item?.desc}</p>
        <p className={styles.itemDesc__details}>{item?.descDetails}</p>
      </div>
      <button
        onClick={() => pickupItem(item?.id)}
        className={styles.pickupButton}
      >
        Pick Up
      </button>
    </div>
  );
}

export default ActiveItemInfo;
