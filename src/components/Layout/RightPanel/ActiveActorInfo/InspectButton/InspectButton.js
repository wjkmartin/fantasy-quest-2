import React from "react";

import { useDispatch } from "react-redux";


export default function RequestDuelButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      <span><i className="fas fa-search" />Inspect</span>
    </button>
  );
}
