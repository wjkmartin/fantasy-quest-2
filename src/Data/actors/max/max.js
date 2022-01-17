import dialogue from './d_max';
import token from '../../../Assets/img/combat_tokens/arinya.png';
// import portrait from '../../../Assets/img/character_images/arinya/portrait.png';

export default {
  actorName: 'Max',
  level: 1,
  actorClass: 'Merc',
  title: 'Bruiser of the Bloodfist',
  race: 'Human',
  health: 10,
  maxHealth: 150,
  sp: 10,
  maxSp: 10,
  mana: 0,
  maxMana: 0,
  armor: 6,
  dodge: 20,
  focus: 33,
  strength: 16,
  dexterity: 18,
  constitution: 18,
  charisma: 9,
  wisdom: 8,
  intelligence: 10,
  isDead: false,
  hasFocusSpell: false,
  location: 'cell1',
  gold: 100,
  speed: 3,
  range: 2,
  dialogue: dialogue,
  type: 'npc',
  token: token,
//   portrait: portrait,
  drops: [],
  img: {},
  willDuel: false,
  responses: {
    tradeItemTypeFail: "Thanks for the offer, but I'\m a minimalist."
  }
};