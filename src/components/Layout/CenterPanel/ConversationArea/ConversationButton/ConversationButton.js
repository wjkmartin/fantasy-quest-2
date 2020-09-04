import React from "react";
import styles from './ConversationButton.module.css'

import { useDispatch } from "react-redux";
import actions from '../../../../../DataHandlers/redux/actions'

export default function ConversationButton(props) {
  const dispatch = useDispatch();

  const action = Object.keys(props.buttonData)[0];
  const label = Object.values(props.buttonData)[0];

  function handleClickAction(actionFromButton) {
    switch (actionFromButton) {
      case "quitConvo": {
        dispatch(actions.endConversation())
        break;
      }
      default:
        props.setDialogueState(actionFromButton)
    }
  }

  return (
    <button className={styles.ConversationButton} onClick={() => handleClickAction(action)}>{label}</button>
  );
}
