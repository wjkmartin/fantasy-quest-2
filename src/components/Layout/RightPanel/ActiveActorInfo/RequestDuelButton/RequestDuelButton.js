import React from "react";

import { useDispatch, useSelector } from "react-redux";

import UI from "../../../../../DataHandlers/redux/slices/UI";
import combat from "../../../../../DataHandlers/redux/slices/combat";
import locations from "../../../../../DataHandlers/redux/slices/locations";

export default function RequestDuelButton(props) {
  let dispatch = useDispatch();
  const actorsById = useSelector(store => store.actors.actorsById);
  const currentSuperLocation = useSelector(store => store.locations.currentLocation);
  const currentSubLocation = useSelector(store => store.locations.currentSubLocation);
  const currentLocation = currentSubLocation || currentSuperLocation;
  const actorsHere = actorsById.filter(actor => actor.location === currentLocation.name);

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
        dispatch(combat.actions.setIsDuel(true));
      }
    });
    if (!isDuel) {
      dispatch(
        UI.actions.addMessageToActivityLog(`${actorsById[0].actorName} is in a fight to the death!`, 'red'
        )
      );
    }
    dispatch(locations.actions.saveCurrentMapState())
    dispatch(combat.actions.addActorToCombatById(0));
    dispatch(combat.actions.setIsDuel(false));
    dispatch(combat.actions.startCombat());
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      {props.activeActor?.isAggressive === true ? (<span><i className="fas fa-swords" /> Fight</span>) : (<span><i className="fas fa-swords" /> Request duel</span>)}
    </button>
  );
}
