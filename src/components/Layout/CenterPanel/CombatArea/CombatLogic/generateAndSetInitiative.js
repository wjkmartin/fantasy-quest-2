import _ from "underscore";

export default function generateInitiative(actorIdsInCombat, actorsById) {
  let turnOrderUnsorted = {};

  let initiative = [];

  actorIdsInCombat.forEach((actorId) => {
    const actorDexterity = Math.round(actorsById[actorId].dexterity / 2) - 5;
    const actorRoll = _.random(1, 20);
    const initiativeTotal = actorDexterity + actorRoll;
    turnOrderUnsorted[actorId] = initiativeTotal;
  });
  const sortedTurnOrder = Object.assign({}, turnOrderUnsorted);
 
  let keysSorted = Object.keys(sortedTurnOrder).sort(function (a, b) {
    return parseInt(sortedTurnOrder[a] - sortedTurnOrder[b]);
  });
  keysSorted.forEach((elem, index) => {
    initiative.push(parseInt(elem))
  });

  return initiative
  
}
