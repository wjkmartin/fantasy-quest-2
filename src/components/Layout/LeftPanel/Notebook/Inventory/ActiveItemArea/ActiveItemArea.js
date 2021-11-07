import React from 'react';
import EquipButton from './EquipButton/EquipButton';
import ActivateItemButton from './ActivateItemButton/ActivateItemButton';

import itemSlice from '../../../../../../DataHandlers/redux/slices/items';

import styles from './ActiveItemArea.module.css';
import { itemColorClass, itemRarityName } from '../util';

import { useDispatch, useSelector } from 'react-redux';

export default function ActiveItemArea(props) {
  const inTrade = useSelector((state) => state.items.inTrade);
  const currentLocationName = useSelector(
    (state) => state.locations.currentLocation
  ).name;
  const dispatch = useDispatch();

  const equipButton = (
    <EquipButton
      className={styles.ActiveItemArea_buttons_button}
      item={props.item}
      setActiveItem={props.setActiveItem}
    />
  );

  const useButton = (
    <ActivateItemButton
      className={styles.ActiveItemArea_buttons_button}
      itemId={props.item.id}
      setActiveItem={props.setActiveItem}
    />
  );

  const buttonAction =
    props.item.type === 'consumable' ? useButton : equipButton;

  const dropItemButton = <button
  onClick={() =>
    dispatch(
      itemSlice.actions.dropItemFromInventory({
        itemId: props.item.id,
        locationName: currentLocationName,
      })
    )
  }
  className={styles.ActiveItemArea_buttons_button}
>
  Drop item
</button>


  return (
    <>
      <div className={styles.ActiveItemArea_info}>
        <p className={styles.ActiveItemArea_info_itemLabel}>
          {props.item.name}
        </p>
        <p
          className={`${styles.ActiveItemArea_info_rarity} + ${
            styles[itemColorClass(props.item.rarity)]
          }`}
        >
          {itemRarityName(props.item.rarity)}
        </p>
        <p className={styles.ActiveItemArea_info_flavor}>{props.item.desc}</p>
        <p className={styles.ActiveItemArea_info_details}>
          {props.item.descDetails}
        </p>
      </div>
      <div className={styles.ActiveItemArea_buttons}>
        {inTrade ? '' : buttonAction}
        {inTrade ? '' : dropItemButton}
      </div>
    </>
  );
}
