import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NpcDisplayArea.module.css";

import actions from "../../../../../DataHandlers/redux/actions";

const NpcDisplayArea = () => {
  const dispatch = useDispatch();
  const actorIdsByLocation = useSelector((state) => state.actors.byLocationName);
  const actorsById = useSelector((state) => state.actors.actorsById);

  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );

  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  let currentActors = [];

  if (currentSubLocation !== undefined) {
    currentActors =
      actorIdsByLocation[currentSubLocation.name] !== undefined
        ? actorIdsByLocation[currentSubLocation.name]
        : [];
  } else if (actorIdsByLocation[currentLocation.name] !== undefined) {
    currentActors = actorIdsByLocation[currentLocation.name];
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

  const currentActorsButtonsList = currentActors.map((actorId) => {
    return (
      <li
        className={`${styles.Npc} ${
          actorsById[actorId].isAggressive === true
            ? styles.aggressive
            : actorsById[actorId].type === "hunter"
            ? styles.hunter
            : ""
        } `}
        key={`${actorsById[actorId].actorName}${actorsById[actorId].actorName}`}
        onClick={() => setActiveActorInfoWindowById(actorId)}
      >
        {`${actorsById[actorId].actorName}`}
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
