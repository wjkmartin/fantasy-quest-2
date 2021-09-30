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

  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  let currentActors = [];

  if (currentSubLocation !== undefined) {
    currentActors =
      actorsByLocation[currentSubLocation.name] !== undefined
        ? actorsByLocation[currentSubLocation.name]
        : [];
  } else if (actorsByLocation[currentLocation.name] !== undefined) {
    currentActors = actorsByLocation[currentLocation.name];
  }

  let atLeastOneAggressiveActorHere = () => {
    let _atLeastOneAggressiveActorHere = false;
    currentActors.forEach((actor) => {
      if (actor.isAggressive) {
        _atLeastOneAggressiveActorHere = true;
        
      }
    });
    return _atLeastOneAggressiveActorHere;
  };

  const setActiveActorInfoWindowById = useCallback(
    (id) => dispatch(actions.setActiveActorInfoWindowById(id)),
    [dispatch]
  );

  const currentActorsButtonsList = currentActors.map((actor, index) => {
    return (
      <li
        className={`${styles.Npc} ${
          actor.isAggressive === true
            ? styles.aggressive
            : actor.type === "hunter"
            ? styles.hunter
            : ""
        } `}
        key={`${actor.actorName}${index}`}
        onClick={() => setActiveActorInfoWindowById(actor.id)}
      >
        {`${actor.actorName}`}
      </li>
    );
  });

  return (
    <div>
      <div className={styles.NpcDisplayArea}>
        <div className={styles.npcsHereLabel}>
          {" "}
          PEOPLE<br></br>HERE:
        </div>
        <ul className={styles.NpcList}>
          {currentActors !== undefined ? currentActorsButtonsList : " "}
        </ul>
      </div>
      {atLeastOneAggressiveActorHere() ? (
        <div className={styles.aggressiveNpcsNotification}>
          <p>
            {" "}
            You can't go anywhere until you deal with the above aggressives or
            evade them!{" "}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NpcDisplayArea;
