import React from 'react';
import styles from './RightPanel.module.css';

import { useSelector } from 'react-redux';

import ActiveActorInfo from './ActiveActorInfo/ActiveActorInfo';
import ActiveItemInfo from './ActiveItemInfo/ActiveItemInfo';

import ActivityLog from './ActivityLog/ActivityLog';
import PlayerInfo from './PlayerInfo/PlayerInfo';

const rightPanel = (props) => {
  const actorsById = useSelector((state) => state.actors.actorsById);
  const itemsById = useSelector((state) => state.items.itemsById);
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const itemsAtCurrentLocation = itemsById.filter(
    (item) => item.location === currentLocation.name
  );
  const activeTarget = useSelector((state) => state.UI.activeTarget);

  return (
    <div className={props.className}>
      {activeTarget.type === 'actor' ? (
        <ActiveActorInfo
          activeActor={actorsById[activeTarget.id]}
          className={styles.ActiveActorInfo}
        />
      ) : activeTarget.type === 'item' ? (
        <ActiveItemInfo
          locationName={currentLocation.name}
          activeItem={itemsAtCurrentLocation.find((item) => {
            return item.id === activeTarget.id;
          })}
          className={styles.ActiveItemInfo}
        />
      ) : (
        <div className={`${styles.noTarget} ${styles.ActiveActorInfo}`}>
          <p> No active target </p>
        </div>
      )}
      <ActivityLog className={styles.ActivityLog} />
      <PlayerInfo className={styles.PlayerInfo} />
    </div>
  );
};

export default rightPanel;
