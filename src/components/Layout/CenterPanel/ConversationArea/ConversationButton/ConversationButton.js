import React from "react";
import styles from "./ConversationButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import UI from '../../../../../DataHandlers/redux/slices/UI'

export default function ConversationButton(props) {
  const dispatch = useDispatch();
  let state = useSelector((state) => state);
  let player = state.actors.actorsById[0];

  const dialogueBranch = Object.keys(props.buttonData)[0];
  const values = Object.values(props.buttonData)[0];

  let active = true;
  let visible = true;

  if (values.conditions !== undefined) {
    let metConditions = 0;
    values.conditions.forEach((condition) => {
      if (typeof condition.check === "string") {
        switch (condition.check) {
          case "gold":
            if (player.gold >= condition.value) metConditions++;
            break;
          default:
            if (player.abilityScores[condition.check] >=
              condition.value) metConditions++
            break;
        }
      } else if (typeof condition.check === "function") {
       if (condition.check(state) === true) metConditions++;
      }
    });
    active = values.conditions.length === metConditions;
  }

  function handleClickAction(branch, values, store) {
    //deals with actions inside dialogue branches
    const label = values.text === undefined ? values : values.text;

    dispatch(UI.actions.addToCurrentDialogueText(label));

    if (values.onClick !== undefined && active) {
      values.onClick(store, dispatch);
    }

    switch (branch) {
      case "quitConvo": {
        dispatch(UI.actions.endConversation());
        dispatch(UI.actions.clearCurrentDialogueText());
        break;
      }
      default: {
        props.setDialogueState(branch);
      }
    }
  }

  return (
    <button
      className={visible ? styles.ConversationButton : styles.hide}
      onClick={() => handleClickAction(dialogueBranch, values, state)}
      disabled={active ? false : true}
    >
      {values.text === undefined ? values : values.text}
    </button>
  );
}
