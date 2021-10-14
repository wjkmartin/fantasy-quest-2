import store from "../../../../../DataHandlers/redux/store";
import actions from "../../../../../DataHandlers/redux/actions";

import weapons from "../../../../../Data/items/weapons";

import { areCoordsAdjacent } from "./util";

import { isEqual } from "underscore";
import { getPath } from "./determineValidMoves";

export default function nextTurn() {
  function npcTryAttack(_npcObject, _playerObject) {
    if (
      areCoordsAdjacent(_npcObject.coords, _playerObject.coords) //if beside player, attack
    ) {
      const baseDamage = Math.max(
        1, //npcs will always do a base damage of 1
        Math.floor(_npcObject.abilityScores.strength / 2)
      );
      const weapon =
        _npcObject.weapon === undefined
          ? weapons["rusty_sword"]
          : weapons[_npcObject.weapon];
      const weaponDamage = weapon.stats.weaponDamageFunction();
      let attack = { damage: baseDamage + weaponDamage };
      let attackCallback = store.dispatch(
        actions.attackTargetWithAbility(_npcObject, 0, attack)
      );
      store.dispatch(
        actions.addMessageToActivityLog(
          `${_npcObject.actorName} attacks and deals ${attackCallback.ability.damage} to ${_playerObject.actorName}`,
          "orange"
        )
      );
      if (_playerObject.health - attackCallback.ability.damage <= 0) {
        store.dispatch(actions.setPlayerCombatButtonsHidden(false));
        store.dispatch(actions.endCombat());
        store.dispatch(actions.setActorAttributeByActorId(0, "health", 1));
        store.dispatch(actions.addMessageToActivityLog(`You've lost the fight!`));
        store.dispatch(actions.setMap('city', 'centralSquare'));
        store.dispatch(actions.loadSavedMapStateForMap('city'));
        store.dispatch(actions.setActiveActorInfoWindowById(undefined));
        store.dispatch(actions.addMessageToActivityLog('In a sudden flash of light, you feel yourself dematerialize and a moment later you find yourself in front of the obelisk in the center of the city.', "italic"))
    }
      return true;
    } else return false;
  }

  const combatData = store.getState().combat;
  const passableMap = [...combatData.passableMap];
  const currentActorTurnId = combatData.currentTurnById;
  const actorsInCombatById = combatData.actorsInCombatById;
  const actorsById = store.getState().actors.actorsById;
  const player = store.getState().actors.actorsById[0];

  let npcDidAttack = false;

  if (isEqual(combatData.actorsInCombatById, [0])) {
    //only player is alive
    store.dispatch(actions.endCombat());
    store.dispatch(actions.addMessageToActivityLog(`You've won!`, "green"));
  } else {
    if (actorsById[currentActorTurnId].isDead === true) {
      //actor is dead, end their turn and go to next
      store.dispatch(
        actions.endTurn(combatData.initiativeList, combatData.currentTurnById)
      );
      nextTurn();
      return;
    } else if (currentActorTurnId !== 0 ) {
      store.dispatch(
        actions.addMessageToActivityLog(
          `${actorsById[currentActorTurnId].actorName} is taking their turn.`
        )
      );
          console.log('1-',actorsById[currentActorTurnId].actorName)

      let path = getPath(
        passableMap,
        actorsById[currentActorTurnId].coords,
        player.coords,
        actorsInCombatById,
        store.getState().actors.actorsById
      );


     
      path.pop()// always remove the endpoint (player location)
      npcDidAttack = npcTryAttack(actorsById[currentActorTurnId], player);

      let finalLocationNode;
    
      if (path.length === 0) {
        // npc doesn't move
      } else {
          for (let i = 0; i < path.length - (actorsById[currentActorTurnId].speed); i++) {
            console.log(path.pop());
          }
        finalLocationNode = path[path.length - 1];
        console.log('2-',actorsById[currentActorTurnId].actorName)
        console.log(store.dispatch(
          actions.setIsAnimatingtoCoords(
            currentActorTurnId,
            finalLocationNode.x,
            finalLocationNode.y
          )
        ));

        console.log(store.dispatch(actions.setAnimationPath(path)))

        console.log('3-',actorsById[currentActorTurnId].actorName)
      }

      setTimeout(function() {
        if (!npcDidAttack) {
          let actorAfterMove = actorsById[currentActorTurnId];
          actorAfterMove.coords = [finalLocationNode.x, finalLocationNode.y];
          npcTryAttack(actorAfterMove, player);
        }
        store.dispatch(
          actions.endTurn(combatData.initiativeList, combatData.currentTurnById)
        );

        nextTurn()
      }, 500 + (250 * path.length));

    } else if (combatData.inCombat) {
      store.dispatch(actions.setPlayerCombatButtonsHidden(false));
      store.dispatch(
        actions.addMessageToActivityLog(
          `${actorsById[currentActorTurnId].actorName} is taking their turn.`
        )
      );
    }
  }
}
