import React from "react";

import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../../../../DataHandlers/redux/actions";

export default function EquipButton(props) {
  const playerInventory = useSelector(
    (state) => state.items.inventoryByActorId[0]
  );

  const playerObject = useSelector(state => state.actors.actorsById)[0]
  let dispatch = useDispatch();

  function onClickButton(itemId) {
    let item = playerInventory.find((item) => item.id === itemId);
    item.effectFunction(playerObject, dispatch)
    props.setActiveItem(undefined)
    dispatch(actions.dropItemByIds(0, item.id))
  }

  return (
    <button
      className={props.className}
      onClick={() => onClickButton(props.itemId)}
    >
      Use
    </button>
  );
}
