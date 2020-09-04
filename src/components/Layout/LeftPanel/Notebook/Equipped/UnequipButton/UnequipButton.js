import React from "react";

import { useDispatch } from "react-redux";
import actions from "../../../../../../DataHandlers/redux/actions";

export default function UnequipButton(props) {
  let dispatch = useDispatch();

  function onClickButton(id) {
    dispatch(actions.unequipItemByActorIds(0, id));
    props.setActiveItem(undefined)
  }

  return <button onClick={() => onClickButton(props.itemId)}>Unequip</button>;
}
