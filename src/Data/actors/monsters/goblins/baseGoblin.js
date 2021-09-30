// import dialogueAjwar from './d_ajwar.js';
import token from '../../../../Assets/img/combat_tokens/goblin.png'

export default {
  actorName: "Goblin",
  level: 1,
  actorClass: "Peon",
  race: "Goblin",
  title: "Common",
  health: 15,
  maxHealth: 25,
  sp: 10,
  maxSp: 10,
  mana: 0,
  maxMana: 0,
  armor: 1,
  dodge: 10,
  focus: 0,
  abilityScores: {
    strength: 8,
    dexterity: 12,
    constitution: 8,
    charisma: 7,
    wisdom: 8,
    intelligence: 6,
  },
  isDead: false,
  hasFocusSpell: false,
  location: undefined, 
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
