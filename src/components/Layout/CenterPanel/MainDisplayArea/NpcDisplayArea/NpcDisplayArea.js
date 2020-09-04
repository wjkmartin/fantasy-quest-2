import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NpcDisplayArea.module.css";

import actions from "../../../../../DataHandlers/redux/actions";

const NpcDisplayArea = () => {
  const dispatch = useDispatch();
  const actorsByLocation = useSelector((state) => state.actors.byLocationName);
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  
  const currentActors =
    actorsByLocation[currentLocation.name] !== undefined
      ? actorsByLocation[currentLocation.name]
      : [];

  const setActiveActorInfoWindowById = useCallback(
    (id) => dispatch(actions.setActiveActorInfoWindowById(id)),
    [dispatch]
  );

  const currentActorsButtonsList = currentActors.map((actor) => {
    return (
      <li
        className={`${styles.Npc} ${actor.type ==='hunter' ? styles.hunter : ""}`}
        key={actor.actorName}
        onClick={() => setActiveActorInfoWindowById(actor.id)}
      >
        {actor.actorName}
      </li>
    );
  });

  return (
    <div className={styles.NpcDisplayArea}>
      <div className={styles.npcsHereLabel}> PEOPLE<br></br>HERE:</div>
      <ul className={styles.NpcList}>
        {currentActors !== undefined ? currentActorsButtonsList : " "}
      </ul>
    </div>
  );
};

export default NpcDisplayArea;
