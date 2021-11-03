import React from "react";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";
import UI from "../../../../../DataHandlers/redux/slices/UI";
import combat from "../../../../../DataHandlers/redux/slices/combat";

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();
  const actorsById = useSelector(store => store.actors.actorsById);
  const currentLocation = useSelector(store => store.locations.currentLocation).name;
  const actorsHere = actorsById.filter(actor => actor.location === currentLocation);

  function handleClick() {
    let isDuel = true;
    actorsHere.forEach((actor) => {
      if (actor.isAggressive) { 
        isDuel = false;
        dispatch(combat.actions.addActorToCombatById(actor.id)); 
      } else if (actor.id === props.activeActor.id) {
        dispatch(
          UI.actions.addMessageToActivityLog(
            `${actorsById[0].actorName} has started a duel with ${props.activeActor.actorName}`, 'red')
        );
        dispatch(combat.actions.addActorToCombatById(actor.id));
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
      {props.activeActor?.isAggressive === true ? "Fight" : "Request duel"}
    </button>
  );
}
