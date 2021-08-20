import React, { useState } from "react";
import styles from "./ConversationButton.module.css";

import { useSelector ,useDispatch } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";

export default function ConversationButton(props) {
  const dispatch = useDispatch();
  let state = useSelector(state => state)
  let player = useSelector(state => state.actors.actorsById[0])

  let action = Object.keys(props.buttonData)[0];
  const values = Object.values(props.buttonData)[0];
  let label = "whoops this should never";
  let inactive = false; //Todo: add 'visible' as well + refactor 'inactive' to 'active'
  let visible = true;

  if (values.text !== undefined) {
    label = values.text;
    action = values;
    console.log(values.condition.check)
    if (typeof values.condition.check === 'string') {
      inactive = (player.abilityScores[values.condition.check] <= values.condition.value)
    } else if (typeof values.condition.check === 'function') {
      visible = (values.condition.check(state) === values.condition.value)
      console.log(visible)
    }
  } else {
    label = Object.values(props.buttonData)[0];
  }

  function handleClickAction(action, label) {
    dispatch(actions.addtoCurrentDialogueText(label));

    switch (action) {
      case "quitConvo": {
        dispatch(actions.endConversation());
        dispatch(actions.clearCurrentDialogueText());
        break;
      }
      default:
        if (action.nextState !== undefined) {
          props.setDialogueState(action.nextState);

        } else {
          props.setDialogueState(action);
        }
    }
  }

  return (
    <button
      className={visible ? styles.ConversationButton : styles.hide}
      onClick={() => handleClickAction(action, label)}
      disabled={inactive ? true : false}
    >
      {label}
    </button>
  );
}
