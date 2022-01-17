import React from "react";

import { useDispatch } from "react-redux";


export default function AddToFriendsButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      <span><i className="fas fa-plus" />Add to Friends</span>
    </button>
  );
  // TODO: Handle this button press
}
