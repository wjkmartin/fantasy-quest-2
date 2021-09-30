import dialogue from './d_pamina'
import portrait from '../../../Assets/img/character_images/pamina/portrait.png'

export default {
  actorName: "Pamina",
  level: 1,
  actorClass: "Pirate",
  title: "Pirate Queen",
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
  location: "docks_red_moon",
  gold: 999,
  speed: 3,
  dialogue: dialogue,
  portrait: portrait,
  type: 'npc',
  img: {

  }
};
