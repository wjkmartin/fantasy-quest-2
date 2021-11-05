import React from "react";

import { useSelector, useDispatch } from "react-redux";
import itemSlice from "../../../../../../../DataHandlers/redux/slices/items";

export default function EquipButton(props) {
  const playerInventory = useSelector(
    (state) => state.items.itemsById.filter(item => item.ownerId === 0));
    
  const currentLocationName = useSelector(state => state.locations.currentLocation).name

  const playerObject = useSelector(state => state.actors.actorsById)[0]
  let dispatch = useDispatch();

  function onClickButton(itemId) {
    let item = playerInventory.find((item) => item.id === itemId);
    console.log(item)
    item.effectFunction(playerObject, dispatch)
    props.setActiveItem(undefined)
    dispatch(itemSlice.actions.removeItemFromPlayerInventory({itemId: item.id, locationName:currentLocationName}))
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
