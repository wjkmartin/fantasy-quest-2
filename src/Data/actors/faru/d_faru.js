export default {
  meet: {
    text: "Ah, it's you. I've been expecting you.",
    buttons: [
      { expectingMe: "You've been expecting me?" },
      { buyHerbs: "I hear you buy herbs?" },
      { buyPotions: "Do you sell potions of healing?" },
      {
        quitConvo:
          "Actually, something here is giving me a headache. Goodbye. (exit)",
      },
    ],
  },
  expectingMe: {
    text: "Forget I said anything... please, tell me, what brings you here?",
    buttons: [
      { buyHerbs: "I hear you buy herbs?" },
      { buyPotions: "Do you sell potions of healing?" },
    ],
  },
  buyHerbs: {
    text: "Certainly. I buy most types of herbs, although most of the ones you'll find outside town are of such low quality that they are nearly worthless.",
    buttons: [
      { quitConvo: "Great, so you're going to lowball me. Thanks. (exit)" },
    ],
  },
  buyPotions: {
    text: "I do. But I will say right now that they are expensive and I have a very limited quantity. They take much time and resources to brew.",
    buttons: [
      {
        quitConvo:
          "In other words they cost an arm and a leg. I'll think about it. (exit)",
      },
    ],
  },
};
