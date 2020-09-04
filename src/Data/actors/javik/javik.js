import dialogue from './d_javik'

export default {
  actorName: "Javik",
  level: 1,
  actorClass: "Fighter",
  race: "Human",
  title: "Brigand of the Seas",
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
  location: "docks",
  gold: 999,
  speed: 3,
  type: 'npc',
  dialogue: dialogue
};
