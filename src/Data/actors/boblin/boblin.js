import dialogue from './d_boblin'
import token from '../../../Assets/img/combat_tokens/arinya.png'
import portrait from '../../../Assets/img/character_images/gwen/portrait.png'

export default {
  actorName: "Boblin",
  level: 1,
  actorClass: "Scavenger",
  title: "The Goblin",
  race: "Goblin",
  health: 15,
  maxHealth: 15,
  sp: 0,
  maxSp: 0,
  mana: 0,
  maxMana: 0,
  armor: 0,
  dodge: 0,
  focus: 0,
    strength: 3,
    dexterity: 3,
    constitution: 4,
    charisma: 5,
    wisdom: 5,
    intelligence: 8,
  isDead: false,
  hasFocusSpell: false,
  location: "deadEndShop",
  gold: 300,
  speed: 1,
  dialogue: dialogue,
  type: 'npc',
  // token: token,
  portrait: portrait,
  token: token,
  drops: [{
    item: 'potion_of_healing',
    chance: 1, //this means 1 in 6
    name: 'a dirty bottle with some kind of fluid inside!'
  }],
  img: {

  }
};
