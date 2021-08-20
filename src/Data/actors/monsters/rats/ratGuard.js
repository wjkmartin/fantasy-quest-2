import token from '../../../../Assets/img/combat_tokens/ratGuard.png'

export default {
  actorName: "Rat Guard",
  level: 5,
  actorClass: "Tough",
  race: "Giant Rat",
  title: "Common",
  health: 40,
  maxHealth: 40,
  sp: 10,
  maxSp: 10,
  mana: 0,
  maxMana: 0,
  armor: 3,
  dodge: 10,
  focus: 0,
  abilityScores: {
    strength: 10,
    dexterity: 16,
    constitution: 12,
    charisma: 6,
    wisdom: 7,
    intelligence: 6,
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
