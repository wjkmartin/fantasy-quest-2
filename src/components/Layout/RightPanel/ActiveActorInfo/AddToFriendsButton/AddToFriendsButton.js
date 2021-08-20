import React from "react";

import { useDispatch } from "react-redux";
import actions from '../../../../../DataHandlers/redux/actions'

export default function AddToFriendsButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      Add to Friends
    </button>
  );
  // TODO: Handle this button press
}
