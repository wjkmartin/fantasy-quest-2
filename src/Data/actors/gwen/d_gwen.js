
export default {
  meet: {
    text: "Welcome to the Hammer's Din! I'm Gwen, and everything you see here was made by my hands.",
    buttons: [
      { askAboutWeapons: "What weapons do you have for sale?" },
      { quitConvo: "Whoops, I thought this was the brothel. Later. (exit)" },
    ],
  },
  askAboutWeapons: {
    text: "Well, you can see what I have if you [Trade] me, but I sell a range of weapons depending on your budget, from rusty iron all the way up to enchanted steel.",
    buttons: [
      {
        whyRustyIron: {
          text: "No offence, but why are you even selling a rusty iron sword? Couldn't you make it non-rusty? Don't you have any pride?"}},
      {
        quitConvo:
          "Thanks, that's all I needed to know. (exit)",
      },
    ],
  },
  whyRustyIron: {
    text: "The sword just isn't really worth my time to fix. I found it under the stairs when I took this shop over from another blacksmith. It's more of a doorstop than anything I guess.",
    buttons: [{ quitConvo: "Awesome, so you're basically just lazy. Got it. (exit)" }],
  },
};
