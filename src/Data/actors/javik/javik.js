import dialogue from './d_javik'
import token from '../../../Assets/img/combat_tokens/javik.png'

export default {
  actorName: "Javik",
  level: 1,
  actorClass: "Fighter",
  race: "Human",
  title: "Brigand of the Seas",
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
  location: "docks1",
  gold: 999,
  speed: 1,
  type: 'npc',
  dialogue: dialogue,
  token: token,
  img: {

  }
};
