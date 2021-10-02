import _ from "underscore";

export default function generateInitiative(actorsInCombat) {
  let actors = actorsInCombat;
  let turnOrderUnsorted = {};

  let initiative = [];

  Object.values(actors).forEach((actor) => {
    const actorDexterity = Math.round(actor.abilityScores.dexterity / 2) - 5;
    const actorRoll = _.random(1, 20);
    const initiativeTotal = actorDexterity + actorRoll;
    turnOrderUnsorted[actor.id] = initiativeTotal;
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
