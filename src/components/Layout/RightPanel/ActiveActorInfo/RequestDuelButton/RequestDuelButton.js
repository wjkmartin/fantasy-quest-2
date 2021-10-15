import React from "react";

import { useDispatch } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();

  function handleClick() {
    let isDuel = true;
    props.actorsHere.forEach((actor) => { //todo: this is stupid
      if (actor.isAggressive) {
        isDuel = false;
        dispatch(actions.addActorToCombatById(actor.id)); 
      } else if (actor.id === props.activeActor.id) {
        dispatch(
          actions.addMessageToActivityLog(
            `${props.playerName} has started a duel with ${props.activeActor.actorName}`, 'red')
        );
        dispatch(actions.addActorToCombatById(actor.id));
        dispatch(actions.setDuelFlag());
      }
    });
    if (!isDuel) {
      dispatch(
        actions.addMessageToActivityLog(`${props.playerName} is in a fight to the death!`, 'red'
        )
      );
    }
    dispatch(actions.saveCurrentMapState())
    dispatch(actions.addActorToCombatById(0));
    dispatch(actions.startCombat());
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      {props.activeActor.isAggressive === true ? "Fight" : "Request duel"}
    </button>
  );
}
