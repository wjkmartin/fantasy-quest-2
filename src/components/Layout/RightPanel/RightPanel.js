import React from 'react';
import styles from './RightPanel.module.css'

import ActiveActorInfo from './ActiveActorInfo/ActiveActorInfo';
import ActivityLog from './ActivityLog/ActivityLog';
import PlayerInfo from './PlayerInfo/PlayerInfo';

const rightPanel = (props) => (
    <div className={props.className}>
        <ActiveActorInfo className={styles.ActiveActorInfo} />
        <ActivityLog className={styles.ActivityLog} />
        <PlayerInfo 
            className={styles.PlayerInfo} />
    </div>
);

export default rightPanel