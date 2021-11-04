// import dialogueAjwar from './d_ajwar.js';
import token from '../../../../Assets/img/combat_tokens/goblin.png'
import portrait from '../../../../Assets/img/character_images/goblin/portrait.jpg'

export default {
  actorName: "Goblin",
  level: 3,
  actorClass: "Peon",
  race: "Goblin",
  title: "Common",
  health: 10,
  maxHealth: 10,
  sp: 10,
  maxSp: 10,
  mana: 0,
  maxMana: 0,
  armor: 1,
  dodge: 10,
  focus: 0,
    strength: 8,
    dexterity: 12,
    constitution: 8,
    charisma: 7,
    wisdom: 8,
    intelligence: 6,
  isDead: false,
  hasFocusSpell: false,
  location: undefined, 
  gold: 1,
  speed: 2  ,
  type: 'monster',
  token: token,
  portrait: portrait,
  weapon: 'rusty_sword',
  drops: [{
    item: 'potion_of_healing',
    chance: 1, //this means 1%
    name: 'a dirty bottle with some kind of fluid inside!',
    item_type: 'consumable'
  }]
};
