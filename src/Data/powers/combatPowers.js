export default {
  basicAttack: {
    name: 'Basic Attack',
    type: 'attack',
    icon: 'none',
    description:
      'A basic attack that does damage equal to your strength modifier.',
    damage: [
        {
            type: 'physical',
            diceNumber: 0,
            diceSides: 0,
            bonus: 'strengthMod',
        }
    ],
    additionalEffects: [],
    range: 1,
    areaOfEffect: 0,
    duration: 0,
    cooldown: 0,
    mpCost: 0,
    hpCost: 0,
    hpHealed: 0,
    mpHealed: 0,
    hpDrain: 0,
    mpDrain: 0,
  },
  firebolt: {
    name: 'Magic Firebolt',
    type: 'attack',
    icon: 'magic_firebolt',
    description:
      'A simple bolt of arcane flame that never misses but has a limited range. Deals 1d6 fire damage.',
    damage: [
      {
        type: 'fire',
        diceNumber: 1,
        diceSides: 6,
        bonus: 0,
      },
    ],
    additionalEffects: [
      function (target) {
        dispatch(
          UI.actions.addMessageToActivityLog({
            message: `${target.name} is burned!`,
            styleType: 'red',
          })
        );
      },
    ],
    range: 3,
    areaOfEffect: 0,
    duration: 0,
    cooldown: 2,
    mpCost: 20,
    hpCost: 0,
    hpHealed: 0,
    mpHealed: 0,
    hpDrain: 0,
    mpDrain: 0,
  },
};
