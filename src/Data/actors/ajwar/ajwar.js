import dialogueAjwar from './d_ajwar.js';

// import { Item }  from '../js/item.js';

// import weapons from '../items/weapons.js';
// import heads from '../items/heads.js';

export default {
  actorName: "Ajwar",
  level: 1,
  actorClass: "Merchant",
  race: "Human",
  title: "Potion Seller",
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
  location: "tavern",
  gold: 999,
  speed: 3,
  dialogue: dialogueAjwar,
  // itemsForTrade: [
  //   new Item(weapons.sword_splarth),
  //   new Item(heads.head_splarth)
  // ],
  type: 'npc'
};
