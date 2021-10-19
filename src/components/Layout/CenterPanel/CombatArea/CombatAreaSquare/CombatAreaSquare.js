import React from 'react';

import styles from './CombatAreaSquare.module.css';

import CharacterToken from './CharacterToken/CharacterToken';
import { useDispatch } from 'react-redux';
import actions from '../../../../../DataHandlers/redux/actions';

import { onClickAttackSquare } from '../CombatLogic/playerAttack';

import { getPath } from "../CombatLogic/determineValidMoves";

export default function CombatAreaSquare(props) {
  const dispatch = useDispatch();

  let moveStyle,
    attackStyle = '';

  if (props.isActorHereThatIsValidAttackTarget) {
    attackStyle = styles.validAttackArea;
  }

  if (props.isValidToMoveHere === true) {
    moveStyle = styles.validMoveArea;
  }

  function onClickMovement(dispatch, _passableMap, _player, _coords, _actorsInCombatById, _actorsById) {
    dispatch(
      actions.setIsAnimatingtoCoords(0, _coords[0], _coords[1])
    );
    dispatch(actions.toggleMoveClick());
    dispatch(
      actions.setAnimationPath(
        getPath(
          _passableMap,
          _player.coords,
          _coords,
          _actorsInCombatById,
          _actorsById
        )
      )
    );
  }

  function onClickShowInfo(dispatch) {
    dispatch(actions.setActiveActorInfoWindowById(props.actorHere?.id));
  }

  return (
    <div onClick={
      props.isValidToMoveHere
      ? () => {
          onClickMovement(dispatch, props.mapData.passableMap, props.actorsById[0], props.coords, props.combatState.actorsInCombatById, props.actorsById);
        }
      : props.isActorHereThatIsValidAttackTarget
      ? () => {
          onClickAttackSquare(
            dispatch,
            props.actorsById[0],
            props.items,
            props.actorHere?.id
          );
        }
      : props.nonPlayerActorIsHere &&
      props.moveIsToggled &&
      props.attackIsToggled
      ? () => {
          onClickShowInfo(dispatch);
        }
      : () => {}
    } className={`${styles.CombatSquare} ${moveStyle} ${attackStyle}`}>
      {props.actorHere?.id !== undefined ? (
        <CharacterToken
          actorId={props.actorHere.id}
          tokenImage={props.actorToken}
        />
      ) : (
        ''
      )}
    </div>
  );
}
