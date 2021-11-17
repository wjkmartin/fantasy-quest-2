import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import UI from '../../../../../DataHandlers/redux/slices/UI';
import combat from '../../../../../DataHandlers/redux/slices/combat';
import locations from '../../../../../DataHandlers/redux/slices/locations';

export default function EvadeButton(props) {
  let dispatch = useDispatch();
  const actorsById = useSelector((store) => store.actors.actorsById);
  const currentSuperLocation = useSelector(
    (store) => store.locations.currentLocation
  );
  const currentSubLocation = useSelector(
    (store) => store.locations.currentSubLocation
  );
  const currentLocation = currentSubLocation || currentSuperLocation;
  const actorsHere = actorsById.filter(
    (actor) => actor.location === currentLocation.name
  );

  function handleClick() {
    let didFailEvade = false;
    dispatch(
      UI.actions.addMessageToActivityLog(
        `${actorsById[0].actorName} is trying to evade the enemies in this location!`,
        'blue'
      )
    );
    actorsHere.forEach((actor) => {
        // roll a d20 and add the players dexterity modifier. If the result is lower than the enemy's wisdom score then the player fails to evade. A fight results.
        // If evaded the player can move freely. They must re-evade if they want to move through the same location again.
    });

    actorsHere.forEach((actor) => {
      dispatch(combat.actions.addActorToCombatById(actor.id));
      dispatch(
        UI.actions.addMessageToActivityLog(
          `${actorsById[0].actorName} is in a fight to the death!`,
          'red'
        )
      );
    });
    dispatch(locations.actions.saveCurrentMapState());
    dispatch(combat.actions.addActorToCombatById(0));
    dispatch(combat.actions.setIsDuel(false));
    dispatch(combat.actions.startCombat());
  }
  return (
    <button onClick={() => handleClick()} className={props.className}>
      <i className="fas fa-shoe-prints" /> Evade
    </button>
  );
}
