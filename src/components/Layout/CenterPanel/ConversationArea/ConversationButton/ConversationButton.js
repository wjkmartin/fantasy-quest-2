import React from "react";
import styles from "./ConversationButton.module.css";

import { useSelector, useDispatch } from "react-redux";

import actors from "../../../../../DataHandlers/redux/slices/actors";
import items from "../../../../../DataHandlers/redux/slices/items";
import UI from '../../../../../DataHandlers/redux/slices/UI'


export default function ConversationButton(props) {
  const dispatch = useDispatch();
  const actions = {actors, items, UI};
  let state = useSelector((state) => state);
  let player = state.actors.actorsById[0];
  const dialogueBranch = Object.keys(props.buttonData)[0];
  const values = Object.values(props.buttonData)[0];
  console.log(values)

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
            if (player[condition.check] >=
              condition.value) metConditions++
            break;
        }
      } else if (typeof condition.check === "function") {
       if (condition.check(state) === true) metConditions++;
      }
    });
    active = values.conditions.length === metConditions;
  }

  function handleClickAction(_branch, _values) {
    //deals with actions inside dialogue branches
    const label = _values.text === undefined ? _values : _values.text;

    dispatch(UI.actions.addToCurrentDialogueText(label));
    
    if (_values.onClick !== undefined && active) {
      _values.onClick(state, actions, dispatch); 
    }

    switch (_branch) {
      case "quitConvo": {
        dispatch(UI.actions.endConversation());
        dispatch(UI.actions.clearCurrentDialogueText());
        break;
      }
      default: {
        props.setDialogueState(_branch);
      }
    }
  }

  return (
    <button
      className={`${visible ? styles.ConversationButton : styles.hide} ${active ? '' : styles.inactive}`}
      onClick={() => handleClickAction(dialogueBranch, values)}
      disabled={active ? false : true}
    >
      {values.text === undefined ? values : values.text}
    </button>
  );
}
