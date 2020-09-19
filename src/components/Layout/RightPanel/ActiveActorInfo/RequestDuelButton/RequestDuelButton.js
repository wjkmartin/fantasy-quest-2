import React from "react";

import { useDispatch } from "react-redux";
import actions from '../../../../../DataHandlers/redux/actions'

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    dispatch(actions.addActorToCombatById(props.activeActor.id))
    dispatch(actions.startCombat());
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      Request duel
    </button>
  );
}
