import actions from "../../../DataHandlers/redux/actions";
import store from '../../../DataHandlers/redux/store'

export default {
  meet: {
    text:
      "What do you want, little boy?",
    buttons: [
      { whereSmapple: "Where's the smapple, girl?!" },
      { quitConvo: "Welp, see you later!" },
    ],
  },
  whereSmapple: {
      text: "It's safely tucked away... I make no secret of the fact that we took it from the old man... it's yours for say... 10000 coins? Or you could duel me for it, and prove that you're a man."
    ,buttons: [
        { quitConvo: "Maybe I'll duel you, maybe I won't." },
      ],
    }
}