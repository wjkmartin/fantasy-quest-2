import dialogue from './d_rival'
import portrait from '../../../Assets/img/character_images/rival/rival.png'

export default {
  actorName: "Audrey",
  level: 1,
  actorClass: "Rogue",
  title: "Bloodletter",
  race: "Human",
  health: 100,
  maxHealth: 100,
  sp: 10,
  maxSp: 10,
  mana: 100,
  maxMana: 100,
  armor: 5,
  dodge: 10,
  focus: 33,
  abilityScores: {
    strength: 20,
    dexterity: 20,
    constitution: 20,
    charisma: 20,
    wisdom: 20,
    intelligence: 20,
  },
  isDead: false,
  hasFocusSpell: false,
  location: "centralSquare",
  gold: 999,
  speed: 3,
  type: 'hunter',
  dialogue: dialogue,
  portrait: portrait
};
