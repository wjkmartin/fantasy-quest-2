import actions from "../../../DataHandlers/redux/actions";

export default {
  meet: {
    text:
      "What do you want, little boy?",
    buttons: [
      {
        conditional: {
          nextState: "whereSmapple",
          text: "Where's the smapple, girl?!",
          condition: { check: (state) => {return state.quests.questState.aquireSmapple} , value: 'stage0' },
        },
      },
      { quitConvo: "Welp, you're scary. See you later!" },
    ],
  },
  whereSmapple: {
      text: "It's safely tucked away... I make no secret of the fact that we took it from the old man... it's yours for say... 10000 coins? Or you could duel me for it, and prove that you're a man."
    ,buttons: [
        { quitConvo: "Maybe I'll duel you, maybe I won't." },
      ],
    }
}