import React from 'react';

import styles from './CombatAreaSquare.module.css';

import CharacterToken from './CharacterToken/CharacterToken';
import { useDispatch, useSelector } from 'react-redux';

import UI from '../../../../../DataHandlers/redux/slices/UI';

import {
  resolveCombatPower
} from '../CombatLogic/playerAttack';

import { getPath } from '../CombatLogic/determineValidMoves';

export default function CombatAreaSquare(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const combat = useSelector((state) => state.combat);
  const combatMoveButtonSelected = useSelector(
    (state) => state.UI.combatMoveButtonSelected
  );
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const isDuel = useSelector((state) => state.combat.isDuel);
  const activePowerId = useSelector(
    (state) => state.powers.activePowersById[0]
  );
  const combatPowersById = useSelector(
    (state) => state.powers.combatPowersById
  );
  let moveStyle,
    attackStyle = '';

  if (props.isActorHereThatIsValidAttackTarget) {
    // to do : refactor - shouldn't require actor specifically - just valid target (for aoe spells)
    attackStyle = styles.validAttackArea;
  }

  if (props.isValidToMoveHere && combatMoveButtonSelected) {
    moveStyle = styles.validMoveArea;
  }

  function onClickMovement(
    _passableMap,
    _coords,
    _actorsInCombatById,
    _actorsById,
    _actorCoordsById
  ) {
    dispatch(
      UI.actions.setIsAnimatingToCoords({
        actorId: 0,
        coords: [_coords.x, _coords.y],
      })
    );
    dispatch(UI.actions.toggleCombatMoveButtonSelected());
    dispatch(
      UI.actions.setAnimationPath(
        getPath(
          _passableMap,
          combat.actorCoordsById[0],
          _coords,
          _actorsInCombatById,
          _actorsById,
          _actorCoordsById
        )
      )
    );
  }

  function onClickShowInfo() {
    dispatch(
      UI.actions.setActiveItemOrNpcTarget({
        type: 'actor',
        id: props.actorHere?.id,
      })
    );
  }

  return (
    <div
      onClick={
        props.isValidToMoveHere && combatMoveButtonSelected
          ? () => {
              onClickMovement(
                props.passableMap,
                props.coords,
                props.combatState.actorsInCombatById,
                props.actorsById,
                combat.actorCoordsById
              );
            }
          : props.isActorHereThatIsValidAttackTarget
          ? () => {
              resolveCombatPower(dispatch, state, props.actorHere);
              // onClickAttackSquare(
              //   dispatch,
              //   props.actorsById[0],
              //   props.items,
              //   props.actorHere,
              //   combat.actorCoordsById,
              //   currentLocation,
              //   isDuel,
              //   combatPowersById[activePowerId]
              // );
            }
          : props.actorHere &&
            !combatMoveButtonSelected &&
            !props.attackIsToggled
          ? () => {
              onClickShowInfo();
            }
          : () => {}
      }
      className={`${styles.CombatSquare} ${moveStyle} ${attackStyle}`}
    >
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
