import dialogue from './d_arinya';
import token from '../../../Assets/img/combat_tokens/arinya.png';
import portrait from '../../../Assets/img/character_images/arinya/portrait.png';

export default {
  actorName: 'Arinya',
  level: 1,
  actorClass: 'Hunter',
  title: 'Kin of the Once Dead Valley',
  race: 'Elf',
  health: 100,
  maxHealth: 100,
  sp: 10,
  maxSp: 10,
  mana: 100,
  maxMana: 100,
  armor: 5,
  dodge: 10,
  focus: 33,
  strength: 12,
  dexterity: 18,
  constitution: 12,
  charisma: 15,
  wisdom: 16,
  intelligence: 11,
  isDead: false,
  hasFocusSpell: false,
  location: 'tavern_inside',
  gold: 100,
  speed: 3,
  range: 2,
  dialogue: dialogue,
  type: 'npc',
  token: token,
  portrait: portrait,
  drops: [],
  img: {},
  responses: {
    tradeItemTypeFail: "I'm afraid that doesn't interest me, human."
  }
};
