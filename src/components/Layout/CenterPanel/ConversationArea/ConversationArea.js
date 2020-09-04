import React, { useState } from "react";
import styles from "./ConversationArea.module.css";

import { useSelector } from "react-redux";

import ConversationButton from "./ConversationButton/ConversationButton";

export default function ConversationArea(props) {
  let [dialogueState, setDialogueState] = useState("meet"); //this should be changed to be the current actor variable dialogue state

  const activeActorId = useSelector((state) => state.actors.activeActorById);
  const activeActor = useSelector((state) => state.actors.actorsById)[
    activeActorId
  ];
  const currentDialogue = activeActor.dialogue[dialogueState];
  const dialogueNPC = [currentDialogue.text];
  
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
      <div className={styles.ConversationArea_dialogue}>
        {dialogueNPC.map((e) => e)}
      </div>
      <div className={styles.ConversationArea_buttons}>{buttons}</div>
    </div>
  );
}
