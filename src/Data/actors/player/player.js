import token from '../../../Assets/img/combat_tokens/player.png'

export default {
  actorName: "Zaster", //change everywhere to be just name
  level: 1,
  actorClass: "Wizard",
  race: "Human",
  health: 100,
  maxHealth: 100,
  sp: 10,
  maxSp: 10,
  mana: 100,
  maxMana: 100,
  armor: 0,
  dodge: undefined,
  focus: undefined,
  abilityScores: {
    strength: 30,
    dexterity: 10,
    constitution: 10,
    charisma: 10,
    wisdom: 10,
    intelligence: 10,
  },
  isDead: false,
  hasFocusSpell: false,
  location: "",
  gold: 10000,
  speed: 4,
  type: 'hunter',
  token: token,
  isPlayer: true,
};
