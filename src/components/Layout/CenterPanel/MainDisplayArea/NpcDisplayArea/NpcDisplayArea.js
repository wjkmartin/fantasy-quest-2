import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./NpcDisplayArea.module.css";

import UI from "../../../../../DataHandlers/redux/slices/UI";

const NpcDisplayArea = () => {
  const dispatch = useDispatch();
  const actorIdsByLocation = useSelector((state) => state.actors.byLocationName);
  const actorsById = useSelector((state) => state.actors.actorsById);

  const currentSuperLocation = useSelector(
    (state) => state.locations.currentLocation
  );

  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

  const currentLocation = (currentSubLocation === undefined ? currentSuperLocation : currentSubLocation);

  const currentActors = (actorIdsByLocation[currentLocation.name] || [])

  const aggressiveActorHere = () => {
    if (currentActors !== undefined) {
      for (let i = 0; i < currentActors.length; i++) {
        if (actorsById[currentActors[i]].isAggressive) {
          return true;
        }
      }
    }
    return false;
  }

  const setActiveActorInfoWindowById = useCallback(
    (id) => dispatch(UI.actions.setActiveItemOrNpcTarget({type: 'actor', id: id})),
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
    <div className={styles.container}>
      <div className={styles.NpcDisplayArea}>
        <div className={styles.npcsHereLabel}>
          PEOPLE<br></br>HERE
        </div>
        <ul className={styles.NpcList}>
          {currentActors !== undefined ? currentActorsButtonsList : " "}
        </ul>
      </div>
      {aggressiveActorHere() ? (
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
