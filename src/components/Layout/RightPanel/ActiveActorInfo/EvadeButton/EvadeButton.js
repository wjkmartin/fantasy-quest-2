import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import diceRoll from '../../../../../util/diceRoll';

import UI from '../../../../../DataHandlers/redux/slices/UI';
import combat from '../../../../../DataHandlers/redux/slices/combat';
import locations from '../../../../../DataHandlers/redux/slices/locations';

import styles from './EvadeButton.module.css'

export default function EvadeButton(props) {
  let dispatch = useDispatch();
  const actorsById = useSelector((store) => store.actors.actorsById);
  const player = actorsById[0];
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

  const didEvadeEnemiesAtCurrentLocation = useSelector((state) => state.locations.didEvadeEnemiesAtCurrentLocation)

  function handleClick() {
    let didFailEvade = false;
    dispatch(
      UI.actions.addMessageToActivityLog({message:
        `${actorsById[0].actorName} is trying to evade the enemies in this location...`}
      )
    );
    actorsHere.some((actor) => {
      if (
        diceRoll('1d20') + Math.floor(player.dexterity - 10) / 2 <
        actor.wisdom
      ) {
        didFailEvade = true;
        dispatch(
          UI.actions.addMessageToActivityLog({
            message: `...but was spotted by ${actor.actorName}!`,
            styleType: 'red'}
          )
        );
        dispatch(
          UI.actions.addMessageToActivityLog({
            message: `${actorsById[0].actorName} is attacked!`,
            styleType: 'red'}
          )
        );
        return true;
      }
      return false;
    });
    if (didFailEvade) {
      actorsHere.forEach((actor) => {
        dispatch(combat.actions.addActorToCombatById(actor.id));
      });
      dispatch(locations.actions.saveCurrentMapState());
      dispatch(combat.actions.addActorToCombatById(0));
      dispatch(combat.actions.setIsDuel(false));
      dispatch(combat.actions.startCombat());
    } else {
      dispatch(
        UI.actions.addMessageToActivityLog(
          {message: `...and did it! You can now pass through this area.`,
          styleType: 'green'}
        )
      );
      dispatch(locations.actions.didEvadeEnemiesAtCurrentLocation(true));
    }
  }
  return (
    <button disabled={didEvadeEnemiesAtCurrentLocation} onClick={() => handleClick()} className={`${didEvadeEnemiesAtCurrentLocation ? styles.didEvade : ''} ${props.className}`}>
      <span><i className="fas fa-shoe-prints" /> Evade</span>
    </button>
  );
}
