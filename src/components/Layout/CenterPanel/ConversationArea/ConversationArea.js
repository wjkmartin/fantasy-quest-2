import React, { useState } from "react";
import styles from "./ConversationArea.module.css";

import { useSelector, useDispatch } from "react-redux";
import UI from '../../../../DataHandlers/redux/slices/UI'

import TextArea from "./TextArea/TextArea";
import ConversationButton from "./ConversationButton/ConversationButton";

import defaultImage from "../../../../Assets/img/character_images/defaultGreet.png";

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

  const displayImage =
    activeActor.img !== undefined ? activeActor.img.greet : defaultImage;

  let currentDialogue = activeActor.dialogue[dialogueState];
  
  if (
    currentDialogueText[currentDialogueText.length - 1] !== currentDialogue.text
  ) {
    dispatch(UI.actions.addToCurrentDialogueText(currentDialogue.text));
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
      <img
        className={styles.characterImg}
        src={displayImage}
        alt={"character"}
      />
      <TextArea dialogue={currentDialogueText} />
      <div className={styles.ConversationArea_buttons}>{buttons}</div>
    </div>
  );
}
