//TODO ❎ : REFACTOR - remove overlap between the two buttons, i.e. create a button for equip, create a button for drop. Drop should not be visible in combat.

import React from "react";
import EquipButton from "./EquipButton/EquipButton";
import ActivateItemButton from "./ActivateItemButton/ActivateItemButton"

import styles from "./ActiveItemArea.module.css";
import { itemColorClass, itemRarityName } from "../util";

import { useSelector } from "react-redux";

export default function ActiveItemArea(props) {
  const inTrade = useSelector((state) => state.items.inTrade);

  const buttonsEquipable = (
    <>
      <EquipButton
        className={styles.ActiveItemArea_buttons_button}
        itemId={props.item.id}
      />
      <button className={styles.ActiveItemArea_buttons_button}>
        Drop item
      </button>
    </>
  );

  const buttonsUsableItem = (
    <>
      <ActivateItemButton 
        className={styles.ActiveItemArea_buttons_button}
        itemId={props.item.id}
        setActiveItem={props.setActiveItem}
      />
      <button className={styles.ActiveItemArea_buttons_button}>
        Drop item
      </button>
    </>
  );

  const buttons = (props.item.type === 'consumable' ? buttonsUsableItem : buttonsEquipable)

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
        {inTrade ? "" : buttons}
      </div>
    </>
  );
}
