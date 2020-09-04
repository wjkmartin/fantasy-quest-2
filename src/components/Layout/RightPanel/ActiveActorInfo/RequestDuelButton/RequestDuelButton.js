import React from "react";

import { useDispatch } from "react-redux";
import actions from '../../../../../DataHandlers/redux/actions'
import startCombat from '../../../CenterPanel/CombatArea/CombatLogic/startCombat'

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    dispatch(actions.addActorToCombatById(props.activeActor.id))
    startCombat(props.activeActor.id)
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      Request duel
    </button>
  );
}
