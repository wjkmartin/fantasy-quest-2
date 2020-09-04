import React from "react";

import { useSelector } from "react-redux";

import styles from "./TurnOrderArea.module.css";

export default function TurnOrderArea() {
  let actors = useSelector(state => state.actors.actorsById)
  let combatState = useSelector(state => state.combat)
  let turnOrderById = combatState.initiativeList;
  let currentTurnById = combatState.currentTurnById;
  let turnOrderList = [];

  turnOrderById.forEach((element) => {
    turnOrderList.unshift(<li style={currentTurnById === element ? {color: 'red'} : {color: 'black'}} >{actors[element].actorName}</li>);
  });

  return (
    <ul className={styles.TurnOrderArea}>{turnOrderList.map((e) => e)}</ul>
  );
}
