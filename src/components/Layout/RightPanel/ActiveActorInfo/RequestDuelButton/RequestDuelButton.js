import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";
import UI from "../../../../../DataHandlers/redux/slices/UI";
import combat from "../../../../../DataHandlers/redux/slices/combat";

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();
  const actorsById = useSelector(store => store.actors.actorsById);
  const actorsHereById = useSelector(store => store.actors.byLocationName)[useSelector(store => store.locations.currentLocation.name)];

  function handleClick() {
    let isDuel = true;
    actorsHereById.forEach((actorId) => {
      if (actorsById[actorId].isAggressive) { 
        isDuel = false;
        dispatch(combat.actions.addActorToCombatById(actorId)); 
      } else if (actorId === props.activeActor.id) {
        dispatch(
          UI.actions.addMessageToActivityLog(
            `${props.playerName} has started a duel with ${props.activeActor.actorName}`, 'red')
        );
        dispatch(combat.actions.addActorToCombatById(actorId));
        dispatch(combat.actions.setIsDuel(false));
      }
    });
    if (!isDuel) {
      dispatch(
        UI.actions.addMessageToActivityLog(`${props.playerName} is in a fight to the death!`, 'red'
        )
      );
    }
    dispatch(actions.saveCurrentMapState())
    dispatch(combat.actions.addActorToCombatById(0));
    dispatch(combat.actions.startCombat());
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      {props.activeActor.isAggressive === true ? "Fight" : "Request duel"}
    </button>
  );
}
