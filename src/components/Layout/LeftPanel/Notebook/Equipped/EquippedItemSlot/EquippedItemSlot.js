import React from "react";
import { itemColorClass } from "../../Inventory/util";

import styles from "./EquippedItemSlot.module.css";


export default function EquippedItemSlot(props) {

  return (
    <div onClick={props.onClick} className={styles.itemSlot}>
      <i
        className={`${props.slot !== undefined ? styles[itemColorClass(props.slot.rarity)] : ''} ${styles.itemIcon} fas ${props.slot !== undefined ? props.slot.icon : ""} fa-4x`}
      ></i>
    </div>
  );
}
