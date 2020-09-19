import React, { useState } from "react";
import styles from "./ConversationArea.module.css";

import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../DataHandlers/redux/actions";

import TextArea from "./TextArea/TextArea";
import ConversationButton from "./ConversationButton/ConversationButton";

export default function ConversationArea(props) {
  const [dialogueState, setDialogueState] = useState("meet");
  const dispatch = useDispatch();

  const activeActorId = useSelector((state) => state.actors.activeActorById);
  const activeActor = useSelector((state) => state.actors.actorsById)[
    activeActorId
  ];
  const currentDialogueText = useSelector(
    (state) => state.UI.currentDialogueText
  );

  let currentDialogue = activeActor.dialogue[dialogueState];

  if (
    currentDialogueText[currentDialogueText.length - 1] !== currentDialogue.text
  ) {
    dispatch(actions.addtoCurrentDialogueText(currentDialogue.text));
  }

  if (currentDialogue.actionsOnShow === undefined) {
  } else if (currentDialogue.actionsOnShow.length > 0) {
    currentDialogue.actionsOnShow.forEach((action) => {
      action();
    });
  }

  const buttons = currentDialogue.buttons.map((elem) => {
    return (
      <ConversationButton
        setDialogueState={setDialogueState}
        buttonData={elem}
      />
    );
  });

  return (
    <div className={styles.ConversationArea}>
      <TextArea dialogue={currentDialogueText} />
      <div className={styles.ConversationArea_buttons}>{buttons}</div>
    </div>
  );
}
