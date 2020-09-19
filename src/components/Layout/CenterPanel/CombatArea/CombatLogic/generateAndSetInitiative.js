import _ from "underscore";

import actions from '../../../../../DataHandlers/redux/actions'

export default function generateInitiative(
  actorsInCombat,
  dispatch,
) {
  
  let actors = actorsInCombat; 
  let turnOrderUnsorted = {};

  Object.values(actors).forEach((actor, index) => {
    const actorDexterity =
      Math.round(actor.abilityScores.dexterity / 2) - 5;
    const actorRoll = _.random(1, 20);
    const initiativeTotal = actorDexterity + actorRoll;
    turnOrderUnsorted[actor.id] = initiativeTotal;
  });
  let sortedTurnOrder = Object.assign({}, turnOrderUnsorted);
  let keysSorted = Object.keys(sortedTurnOrder).sort(function (a, b) {
    return sortedTurnOrder[a] - sortedTurnOrder[b];
  });
  keysSorted.forEach((elem, index) => {
    dispatch(actions.setActorInitiative(elem, index))
  });
  dispatch(actions.setInitiativeOrderList(keysSorted))
  dispatch(actions.setCurrentTurnById(keysSorted[0]))

}
