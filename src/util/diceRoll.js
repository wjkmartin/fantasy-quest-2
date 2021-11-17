export default function diceRoll(dice) {
    // dice = 'd20'
  let result = 0;
  let diceArray = dice.split('d');
  let numDice = parseInt(diceArray[0]);
  let numSides = parseInt(diceArray[1]);
  for (let i = 0; i < numDice; i++) {
    result += Math.floor(Math.random() * numSides) + 1;
  }
  return result;
}