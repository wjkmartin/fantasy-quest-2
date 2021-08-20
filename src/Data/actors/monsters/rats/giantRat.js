import token from '../../../../Assets/img/combat_tokens/giantRat.png'

export default {
  actorName: "Giant Rat",
  level: 1,
  actorClass: "Beast",
  race: "Giant Rat",
  title: "Common",
  health: 15,
  maxHealth: 15,
  sp: 10,
  maxSp: 10,
  mana: 0,
  maxMana: 0,
  armor: 0,
  dodge: 10,
  focus: 0,
  abilityScores: {
    strength: 6,
    dexterity: 14,
    constitution: 10,
    charisma: 4,
    wisdom: 5,
    intelligence: 3,
  },
  isDead: false,
  hasFocusSpell: false,
  location: "grassy_clearing", 
  gold: 1,
  speed: 1,
  type: 'monster',
  token: token,
  drops: [{
    item: 'potion_of_healing',
    chance: 1, //this means 1 in 6
    name: 'a dirty bottle with some kind of fluid inside!'
  }]
};
