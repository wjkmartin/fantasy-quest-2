//TODO ❎ : REFACTOR - remove overlap between the two buttons, i.e. create a button for equip, create a button for drop. Drop should not be visible in combat.

import React from "react";
import EquipButton from "./EquipButton/EquipButton";
import ActivateItemButton from "./ActivateItemButton/ActivateItemButton"

import itemSlice from "../../../../../../DataHandlers/redux/slices/items";

import styles from "./ActiveItemArea.module.css";
import { itemColorClass, itemRarityName } from "../util";

import { useDispatch, useSelector } from "react-redux";

export default function ActiveItemArea(props) {
  const inTrade = useSelector((state) => state.items.inTrade);
  const currentLocationName = useSelector((state) => state.locations.currentLocation).name;
  const dispatch = useDispatch();

  const equipButton = 
   <EquipButton
        className={styles.ActiveItemArea_buttons_button}
        itemId={props.item.id}
      />;

  const useButton =
      <ActivateItemButton 
        className={styles.ActiveItemArea_buttons_button}
        itemId={props.item.id}
        setActiveItem={props.setActiveItem}
      />;


  const buttonAction = (props.item.type === 'consumable' ? useButton : equipButton)

  return (
    <>
      {" "}
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
        {inTrade ? "" : buttonAction}
        <button onClick={() => dispatch(itemSlice.actions.dropItemFromInventory({itemId: props.item.id, locationName: currentLocationName}))} className={styles.ActiveItemArea_buttons_button}>
        Drop item
      </button>
      </div>
    </>
  );
}
