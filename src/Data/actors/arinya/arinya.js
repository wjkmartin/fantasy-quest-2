import dialogue from './d_arinya'
import token from '../../../Assets/img/combat_tokens/arinya.png'
import portrait from '../../../Assets/img/character_images/arinya/portrait.jpg'

export default {

  actorName: "Arinya",
  level: 1,
  actorClass: "Hunter",
  title: "Kin of the Once Dead Valley",
  race: "Elf",
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
  location: "tavern_inside",
  gold: 999,
  speed: 3,
  dialogue: dialogue,
  type: 'npc',
  token: token,
  portrait: portrait,
  drops: [{
    item: 'potion_of_healing',
    chance: 1, //this means 1 in 6
    name: 'a dirty bottle with some kind of fluid inside!'
  }]
};
