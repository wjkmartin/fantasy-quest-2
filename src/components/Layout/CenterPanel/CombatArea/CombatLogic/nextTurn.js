import store from "../../../../../DataHandlers/redux/store";
import actions from "../../../../../DataHandlers/redux/actions";

import weapons from "../../../../../Data/items/weapons";

import { areCoordsAdjacent } from "./util";

import { isEqual } from "underscore";
import { getPath } from "./determineValidMoves";

// TODO: REFACTOR AND SPLIT UP

export default function nextTurn() {
  function npcTryAttack(npcObject) {
    if (
      areCoordsAdjacent(npcObject.coords, player.coords) //if beside player, attack
    ) {
      const baseDamage = Math.max(
        1, //npcs will always do a base damage of 1
        Math.floor(npcObject.abilityScores.strength / 2)
      );
      const weapon =
        npcObject.weapon === undefined
          ? weapons["rusty_sword"]
          : npcObject.weapon;
      const weaponDamage = weapon.stats.weaponDamageFunction();
      let attack = { damage: baseDamage + weaponDamage };
      let attackCallback = store.dispatch(
        actions.attackTargetWithAbility(actorCurrentTurn.id, 0, attack)
      );
      store.dispatch(
        actions.addMessageToActivityLog(
          `${actorCurrentTurn.actorName} attacks and deals ${attackCallback.ability.damage} to ${player.actorName}`, 'orange'
        )
      );
      return true;
    } else return false;
  }

  const combatData = store.getState().combat;
  const passableMap = [...combatData.passableMap];
  const currentActorTurnId = combatData.currentTurnById;
  const actorsInCombatById = combatData.actorsInCombatById;
  const actorsById = store.getState().actors.actorsById;
  const actorCurrentTurn =
    store.getState().actors.actorsById[currentActorTurnId];
  const player = store.getState().actors.actorsById[0];

  let npcDidAttack = false;

  if (isEqual(combatData.actorsInCombatById, [0])) {
    //only player is alive
    store.dispatch(actions.endCombat());
    store.dispatch(actions.addMessageToActivityLog(`You've won!`, 'green'));
  } else {
    if (actorCurrentTurn.isDead === true) {
      //actor is dead, end their turn and go to next
      store.dispatch(
        actions.endTurn(combatData.initiativeList, combatData.currentTurnById)
      );
      nextTurn();
      return;
    } else if (actorCurrentTurn.id !== 0) {
      //start npc turn
      store.dispatch(
        actions.addMessageToActivityLog(
          `${actorCurrentTurn.actorName} is taking their turn.`
        )
      );

      let path = getPath(
        passableMap,
        actorCurrentTurn.coords,
        player.coords,
        actorsInCombatById,
        actorsById
      );

      npcDidAttack = npcTryAttack(actorCurrentTurn);

      let distanceActorWillTravel;
      let actorMustMove = false;
      let finalLocationNode;

      if (path.length < 2) {
        distanceActorWillTravel = 0;
      } else {
        actorMustMove = true;
        distanceActorWillTravel = Math.min(
          actorCurrentTurn.speed - 1,
          path.length - 2
        );
        for (let i = 0; i < path.length - distanceActorWillTravel; i++) {
          path.pop();
        }
      }

      if (actorMustMove) {
        const finalNodeIndex = distanceActorWillTravel;
        finalLocationNode = path[finalNodeIndex];

        store.dispatch(
          actions.setIsAnimatingtoCoords(
            actorCurrentTurn.id,
            finalLocationNode.x,
            finalLocationNode.y
          )
        );

        store.dispatch(actions.setAnimationPath(path));
      }

      setTimeout(() => {
        if (!npcDidAttack) {
          console.log('confirm')
          let actorAfterMove = actorsById[actorCurrentTurn.id]
          actorAfterMove.coords = [finalLocationNode.x,finalLocationNode.y]
          npcTryAttack(actorAfterMove);
        }
        store.dispatch(
          actions.endTurn(combatData.initiativeList, combatData.currentTurnById)
        );
        nextTurn();
      }, (path.length * 250) + 100);

      // try attack
    } else {
      store.dispatch(actions.setPlayerCombatButtonsHidden(false));
      store.dispatch(
        actions.addMessageToActivityLog(
          `${actorCurrentTurn.actorName} is taking their turn.`
        )
      );
    }
  }
}
