import dialogue from './d_ajwar.js';
import token from '../../../Assets/img/combat_tokens/ajwar.png';
import portrait from '../../../Assets/img/character_images/ajwar/portrait.jpg';

// import { Item }  from '../js/item.js';

// import weapons from '../items/weapons.js';
// import heads from '../items/heads.js';

export default {
  actorName: 'Ajwar',
  level: 1,
  actorClass: 'Merchant',
  race: 'Human',
  title: 'Potion Seller',
  health: 100,
  maxHealth: 100,
  sp: 10,
  maxSp: 10,
  mana: 100,
  maxMana: 100,
  armor: 5,
  dodge: 10,
  focus: 33,
  strength: 20,
  dexterity: 20,
  constitution: 20,
  charisma: 20,
  wisdom: 20,
  intelligence: 20,
  isDead: false,
  hasFocusSpell: false,
  location: 'market',
  gold: 999,
  speed: 1,
  dialogue: dialogue,
  type: 'npc',
  token: token,
  portrait: portrait,
  willBuyTypes: ["consumable"],
  willBuyRarity: 2
};
