import React from "react";

import styles from "./EquippedItemSlot.module.css";

import "../../../../../../../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css";
import "../../../../../../../node_modules/@fortawesome/fontawesome-free-webfonts/css/solid.css";

export default function EquippedItemSlot(props) {

  return (
    <div onClick={props.onClick} className={styles.itemSlot}>
      <i
        className={`${styles.itemIcon} fas ${props.slot !== undefined ? props.slot.icon : ""} fa-3x`}
      ></i>
    </div>
  );
}
