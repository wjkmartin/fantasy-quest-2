import React from "react";

import startConversation from './startConversation'

export default function RequestDuelButton(props) {

  function handleClick() {
    startConversation(props.activeActor.id)
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      Talk
    </button>
  );
}