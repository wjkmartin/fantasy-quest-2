// import dialogueAjwar from './d_ajwar.js';
import token from '../../../../Assets/img/combat_tokens/goblin.png'

export default {
  actorName: "Sewer Troll",
  level: 1,
  actorClass: "Peon",
  race: "Troll",
  title: "The Pestilent Knight",
  health: 300,
  maxHealth: 300,
  sp: 50,
  maxSp: 50,
  mana: 0,
  maxMana: 0,
  armor: 3,
  dodge: 1,
  focus: 0,
  abilityScores: {
    strength: 22,
    dexterity: 6,
    constitution: 15,
    charisma: 3,
    wisdom: 3,
    intelligence: 3,
  },
  isDead: false,
  hasFocusSpell: false,
  location: "mossyCistern", 
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
