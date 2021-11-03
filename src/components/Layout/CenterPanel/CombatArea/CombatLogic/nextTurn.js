import store from '../../../../../DataHandlers/redux/store';
import actions from '../../../../../DataHandlers/redux/actions';

import UI from '../../../../../DataHandlers/redux/slices/UI';
import combat from '../../../../../DataHandlers/redux/slices/combat';
import actors from '../../../../../DataHandlers/redux/slices/actors';

import weapons from '../../../../../Data/items/weapons';

import { areCoordsAdjacent } from './util';

import { isEqual } from 'underscore';
import { getPath } from './determineValidMoves';

export default function nextTurn() {
  function npcTryAttack(_npcObject, _playerObject, actorCoords) {
    if (
      areCoordsAdjacent(
        actorCoords[_npcObject.id],
        actorCoords[_playerObject.id]
      ) //if beside player, attack
    ) {
      const direction = () => {
        const deltaX = actorCoords[0].x - actorCoords[_npcObject.id].x; // 1, 0, -1
        const deltaY = actorCoords[0].y - actorCoords[_npcObject.id].y; // 1, 0, -1
        if (deltaX === -1 && deltaY === 0) return 'north';
        else if (deltaX === 1 && deltaY === 0) return 'south';
        else if (deltaX === 0 && deltaY === 1) return 'east';
        else if (deltaX === 0 && deltaY === -1) return 'west';
        else if (deltaX === -1 && deltaY === 1) return 'northEast';
        else if (deltaX === -1 && deltaY === -1) return 'northWest';
        else if (deltaX === 1 && deltaY === 1) return 'southEast';
        else if (deltaX === 1 && deltaY === -1) return 'southWest';
      };

      store.dispatch(
        UI.actions.setActorAttackAnimation({
          actorId: _npcObject.id,
          direction: direction(),
        })
      );
      const baseDamage = Math.max(
        1, //npcs will always do a base damage of 1
        Math.floor(_npcObject.abilityScores.strength / 2)
      );
      const weapon =
        _npcObject.weapon === undefined
          ? weapons['rusty_sword']
          : weapons[_npcObject.weapon];
      const weaponDamage = weapon.stats.weaponDamageFunction();
      let attack = { damage: baseDamage + weaponDamage };
      store.dispatch(
        actors.actions.setActorAttributeByActorId({
          actorId: _npcObject.id,
          attribute: 'actionUsed',
          value: true,
        })
      );
      store.dispatch(
        actors.actions.modifyActorAttributeByActorId({
          actorId: 0,
          attribute: 'health',
          value: -attack.damage,
        })
      );

      store.dispatch(
        UI.actions.addMessageToActivityLog(
          `${_npcObject.actorName} attacks and deals ${attack.damage} to ${_playerObject.actorName}`,
          'orange'
        )
      );
      if (_playerObject.health - attack.damage <= 0) {
        store.dispatch(UI.actions.setPlayerCombatButtonsHidden(false));
        store.dispatch(combat.actions.endCombat());
        store.dispatch(
          actors.actions.setActorAttributeByActorId({
            actorId: 0,
            attribute: 'health',
            value: 1,
          })
        );
        store.dispatch(
          UI.actions.addMessageToActivityLog(`You've lost the fight!`)
        );
        store.dispatch(actions.setMap('city', 'centralSquare'));
        store.dispatch(actions.loadSavedMapStateForMap('city'));
        store.dispatch(
          UI.actions.setActiveItemOrNpcTarget({ type: 'null', id: null })
        );
        store.dispatch(
          UI.actions.addMessageToActivityLog(
            'In a sudden flash of light, you feel yourself dematerialize and a moment later you find yourself in front of the obelisk in the center of the city.',
            'italic'
          )
        );
      }
      return true;
    } else return false;
  }

  const combatData = store.getState().combat;
  const passableMap = [...combatData.passableMap];
  const currentActorTurnId = combatData.currentTurnById;
  const actorsInCombatById = combatData.actorsInCombatById;
  const actorCoordsById = combatData.actorCoordsById;
  const actorsById = store.getState().actors.actorsById;
  const player = store.getState().actors.actorsById[0];

  let npcDidAttack = false;

  if (isEqual(combatData.actorsInCombatById, [0])) {
    //only player is alive
    store.dispatch(combat.actions.endCombat());
    store.dispatch(UI.actions.addMessageToActivityLog(`You've won!`, 'green'));
  } else {
    if (actorsById[currentActorTurnId].isDead === true) {
      //actor is dead, end their turn and go to next
      store.dispatch(combat.actions.endTurn());
      nextTurn();
      return;
    } else if (currentActorTurnId !== 0) {
      store.dispatch(
        UI.actions.addMessageToActivityLog(
          `${actorsById[currentActorTurnId].actorName} is taking their turn.`
        )
      );

      let path = getPath(
        passableMap,
        actorCoordsById[currentActorTurnId],
        actorCoordsById[0],
        actorsInCombatById,
        store.getState().actors.actorsById,
        actorCoordsById
      );

      path.pop(); // always remove the endpoint (player location)
      npcDidAttack = npcTryAttack(
        actorsById[currentActorTurnId],
        player,
        actorCoordsById
      );

      let finalLocationNode;

      if (path.length === 0) {
        // npc doesn't move
      } else {
        for (
          let i = 0;
          i < path.length - actorsById[currentActorTurnId].speed;
          i++
        ) {
          console.log(path.pop());
        }
        finalLocationNode = path[path.length - 1];
        store.dispatch(
          UI.actions.setIsAnimatingToCoords({
            actorId: currentActorTurnId,
            coords: [finalLocationNode.x, finalLocationNode.y],
          })
        );
        store.dispatch(UI.actions.setAnimationPath(path));
      }

      setTimeout(function () {
        if (!npcDidAttack) {
          const actorCoordsByIdAfterMove = {};
          Object.assign(actorCoordsByIdAfterMove, actorCoordsById);
          actorCoordsByIdAfterMove[currentActorTurnId] = {
            x: finalLocationNode.x,
            y: finalLocationNode.y,
          };
          npcTryAttack(
            actorsById[currentActorTurnId],
            player,
            actorCoordsByIdAfterMove
          );
        }
        store.dispatch(combat.actions.endTurn());

        nextTurn();
      }, 500 + 250 * path.length);
    } else if (combatData.inCombat) {
      store.dispatch(UI.actions.setPlayerCombatButtonsHidden(false));
      store.dispatch(
        UI.actions.addMessageToActivityLog(
          `${actorsById[currentActorTurnId].actorName} is taking their turn.`
        )
      );
    }
  }
}
