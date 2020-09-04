import React from "react";

import { useDispatch } from "react-redux";
import actions from '../../../../../DataHandlers/redux/actions'
import startCombat from '../../../CenterPanel/CombatArea/CombatLogic/startCombat'

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      Inspect
    </button>
  );
}
