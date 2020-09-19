import React from "react";

import { useSelector } from "react-redux";

import styles from "./TurnOrderArea.module.css";

export default function TurnOrderArea() {
  let actors = useSelector(state => state.actors.actorsById)
  const turnOrderById = useSelector(state => state.combat).initiativeList;
  const currentTurnById = useSelector(state => state.combat).currentTurnById;
  let turnOrderList = [];

  turnOrderById.forEach((element) => {
    turnOrderList.unshift(<li key={actors[element].actorName} style={currentTurnById === element ? {color: 'red'} : {color: 'black'}} >{actors[element].actorName}</li>); //doesn't work
  });

  return (
    <ul className={styles.TurnOrderArea}>{turnOrderList.map((e) => e)}</ul>
  );
}
