import _ from "underscore";

export default function generateInitiative(
  actorsInCombat,
  setInitiativeOrderById,
  setInitiativeOrderList,
  setCurrentTurnById
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
    setInitiativeOrderById(elem, index);
  });
  setInitiativeOrderList(keysSorted);
  setCurrentTurnById(keysSorted[0]);
}
