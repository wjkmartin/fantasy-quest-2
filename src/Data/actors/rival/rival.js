import dialogue from './d_rival'

export default {
  actorName: "Audrey",
  level: 1,
  actorClass: "Rogue",
  race: "Elf",
  health: 100,
  maxHealth: 100,
  stamina: 100,
  maxStamina: 100,
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
  location: "slums",
  gold: 999,
  speed: 3,
  type: 'hunter',
  dialogue: dialogue
};
