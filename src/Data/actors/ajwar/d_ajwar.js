

export default {
  meet: {
    text:
      "Ey there! Yes you! You look like you get yourself beat up from time to time. You'll be wanting some of these potions son! And do yourself a favor! Stay away from The Red Moon!",
    buttons: [
      { redMoon: "What's the Red Moon?" },
      { quitConvo: "Welp, see you later!" },
    ],
  },
  redMoon: {
    text:
      "What's the Red Moon you ask?! It's the pirate ship that's moored in the harbor! The men on the ship have been picking a fight with anyone that gets near! Even killed a few folk I've heard! But the guard won't do nothin' because they've paid 'em off you see... \n If you're lookin' to make some coin, I may be able to give you some work... if you're up for it... ",
    buttons: [
      { smappleQuest: "What kind of work are we talking here?" },
      { smappleQuestExtraMoney: {
        text: "How about we sweeten the pot a little? (CHA 15)",
        condition: { check: "charisma", value: 15 },
        // onClick: function () {
        //   store.dispatch();
        // }, 
      }},
      { quitConvo: "Thanks for the info! See you later." },
    ],
  },
  smappleQuest: {
    text:
      "Well I was mugged you see... by one of those damned pirates from the Red Moon! And they- th- they stole my magic smapple! My pride and joy! A one of a kind smapple... I need someone to get it back from those brigands.",
    buttons: [
      { smappleQuest2: "Okey, I'll help you old man." },
      { quitConvo: "Nah, that sounds too hard. Bye." },
    ],
  },
  smappleQuestExtraMoney: {
    text:
      "Well I was mugged you see... by one of those damned pirates from the Red Moon! And they- th- they stole my magic smapple! My pride and joy! A one of a kind smapple... I need someone to get it back from those brigands.",
    buttons: [
      { smappleQuest2: "Okey, I'll help you old man." },
      { quitConvo: "Nah, that sounds too hard. Bye." },
    ],
  },
  smappleQuest2: {
    text:
      "Thank you! Now make haste for the Red Moon and look for Pamina. And don't let her good looks fool you... she's a savage. She'll tear of yer ears and eat them if she gets a chance!",
    buttons: [{ quitConvo: "I'll see you in a bit." }],
    // actionsOnShow: [
    //   function () {
    //     store.dispatch(actions.setQuestStage("aquireSmapple", "stage0"));
    //   },
    // ],
  },
};
