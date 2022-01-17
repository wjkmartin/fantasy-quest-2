import React from "react";

import { useDispatch } from "react-redux";
import itemSlice from "../../../../../../DataHandlers/redux/slices/items";

import styles from "./UnequipButton.module.css";

export default function UnequipButton(props) {
  let dispatch = useDispatch();
  function onClickButton(id) {
    dispatch(itemSlice.actions.unequipItemById({ itemId: id}));
    props.setActiveItem(undefined)
  }

  return <button className={styles.UnequipButton} onClick={() => onClickButton(props.itemId)}>Unequip</button>;
}
