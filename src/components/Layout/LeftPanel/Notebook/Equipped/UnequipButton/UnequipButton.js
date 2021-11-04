import React from "react";

import { useDispatch } from "react-redux";
import itemSlice from "../../../../../../DataHandlers/redux/slices/items";

export default function UnequipButton(props) {
  let dispatch = useDispatch();

  function onClickButton(id) {
    dispatch(itemSlice.actions.unequipItemFromActorByIds({actorId: 0, itemId: id}));
    props.setActiveItem(undefined)
  }

  return <button onClick={() => onClickButton(props.itemId)}>Unequip</button>;
}
