import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NpcDisplayArea.module.css";

import UI from "../../../../../DataHandlers/redux/slices/UI";

const NpcDisplayArea = () => {
  const dispatch = useDispatch();
  const actorsById = useSelector((state) => state.actors.actorsById);

  const currentSuperLocation = useSelector(
    (state) => state.locations.currentLocation
  );

  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  const currentLocation = (currentSubLocation === undefined ? currentSuperLocation : currentSubLocation);

  const currentActors = actorsById.filter((actor) => {
    return (
      actor.location === currentLocation.name &&
      !actor.isDead
    );
  });

  console.log(currentActors);

  const aggressiveActorHere = currentActors.some((actor) => {
    return actor.isAggressive;
  });

  const setActiveActorInfoWindowById = useCallback(
    (id) => dispatch(UI.actions.setActiveItemOrNpcTarget({type: 'actor', id: id})),
    [dispatch]
  );

  const currentActorsButtonsList = currentActors.map((actor) => {
    return (
      <li
        className={`${styles.Npc} ${
          actor.isAggressive === true
            ? styles.aggressive
            : actor.type === "hunter"
            ? styles.hunter
            : ""
        } `}
        key={`${actor.actorName}${actor.actorName}`}
        onClick={() => setActiveActorInfoWindowById(actor.id)}
      >
        {`${actor.actorName}`}
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.NpcDisplayArea}>
        <div className={styles.npcsHereLabel}>
          PEOPLE<br></br>HERE
        </div>
        <ul className={styles.NpcList}>
          {currentActors !== undefined ? currentActorsButtonsList : " "}
        </ul>
      </div>
      {aggressiveActorHere ? (
        <div className={styles.aggressiveNpcsNotification}>
          <p>
            You can't go anywhere until you deal with the above aggressives or
            evade them!
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NpcDisplayArea;
