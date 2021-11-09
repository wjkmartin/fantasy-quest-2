import React from 'react';

import { useSelector } from 'react-redux';

import styles from './TurnOrderArea.module.css';

export default function TurnOrderArea() {
  let actorsById = useSelector((state) => state.actors.actorsById);
  const turnOrderById = useSelector((state) => state.combat).initiativeList;
  const currentTurnById = useSelector((state) => state.combat).currentTurnById;
  let turnOrderListElems = [];

  const currentTurnIndicator = <i className="fas fa-arrow-down fa-2x" />;

  turnOrderById.forEach((actorId, index) => {
    turnOrderListElems.push(
      <div
        className={`${styles.actor} ${currentTurnById === actorId ? styles.currentTurn : ''}`}
        key={`${actorsById[actorId].actorName}${index}`}
      >
        <div className={styles.actor__indicator}>
          {currentTurnById === actorId ? currentTurnIndicator : ''}
        </div>
        <div className={styles.actor__name}>
          {actorsById[actorId].actorName}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.TurnOrderArea}>
      <h3 className={styles.header}>TURN ORDER</h3>
      <div className={styles.actorList}>{turnOrderListElems}</div>
    </div>
  );
}
