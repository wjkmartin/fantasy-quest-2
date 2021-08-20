import token from '../../../../Assets/img/combat_tokens/ratQueen.png'

export default {
  actorName: "The Rat Queen",
  level: 12,
  actorClass: "Piper",
  race: "Unknown Race",
  title: "Her Royal Lowness",
  health: 250,
  maxHealth: 250,
  sp: 100,
  maxSp: 100,
  mana: 250,
  maxMana: 250,
  armor: 5,
  dodge: 15,
  focus: 50,
  abilityScores: {
    strength: 14,
    dexterity: 18,
    constitution: 12,
    charisma: 22,
    wisdom: 22,
    intelligence: 20,
  },
  isDead: false,
  hasFocusSpell: false,
  location: "ratQueenRoom", 
  gold: 1,
  speed: 4,
  type: 'monster',
  token: token,
  drops: [{
    item: 'potion_of_healing',
    chance: 1, //this means 1 in 6
    name: 'a dirty bottle with some kind of fluid inside!'
  }]
};
