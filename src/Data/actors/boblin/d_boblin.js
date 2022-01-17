export default {
  meet: {
    text: "'Ellllllo! Ca' I ell yuh?.",
    buttons: [
      {
        askAboutName:
          "So you're a goblin, and your name is Boblin? Doesn't that seem a little lazy? What's your brother's name? Doblin?",
      },
      { quitConvo: 'By Rolep you are ugly. Anyways, bye. (exit)' },
    ],
  },
  askAboutName: {
    text: "Weugh truef be tol' uz goblens ain' mush ov a \"crea-ate-tive\" toipe. An' yah, me brotha's name IS Doblin, ass a matuh ov fac. Awl ov me brothas ahh.",
    buttons: [
      {
        whatDoYouSell: {
          text: "Well Boblin, you're in luck, I always need things. I'm not sure what I'm looking for, but I'm sure I can find something. What do you sell?",
        },
      },
      {
        quitConvo:
          "Thanks, that's all I needed to know. Be seeing you, Boblin. (exit)",
      },
    ],
  },
  whatDoYouSell: {
    text: "Wha'eva I foind ov couss! Av' a look! Eh don' smel noice buh neithuh do oye, heh.",
    buttons: [
      {
        quitConvo:
          "Great, so you sell literal garbage? I'm literally in a hole buying garbage from a tiny old green man with a lisp. Lovely. (exit)",
      },
    ],
  },
};
