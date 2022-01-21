import React, { useEffect, useState } from 'react';
import styles from '../Power.module.css';

import { useDispatch } from 'react-redux';
import actor from '../../../../../../DataHandlers/redux/slices/actors';
import powers from '../../../../../../DataHandlers/redux/slices/powers';

export default function Power(props) {
  const power = props.powerData;
  let dispatch = useDispatch();

  let [durationRemainingSeconds, setDurationRemainingSeconds] = useState(props.powerData.duration * 60);

  useEffect(() => {
    Object.keys(power.stats).forEach((stat) => {
      dispatch(
        actor.actions.modifyActorAttributeByActorId({
          actorId: 0,
          attribute: stat,
          value: power.stats[stat],
        })
      );
    });
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (durationRemainingSeconds > 0) {
        setDurationRemainingSeconds(durationRemainingSeconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
      if (durationRemainingSeconds === 1) {
        dispatch(
          powers.actions.removePassivePowerFromActorById({
            powerId: power.id,
            actorId: 0,
          })
        );
        Object.keys(power.stats).forEach((stat) => {
          dispatch(
            actor.actions.modifyActorAttributeByActorId({
              actorId: 0,
              attribute: stat,
              value: power.stats[stat] * -1,
            })
          );
        });
      }
    };
  });

  const durationRemainingMinutes = Math.floor(durationRemainingSeconds / 60);

  return (
    <div className={styles.Power}>
      <div>
        <p className={styles.powerLabel}>{power.name}</p>
        <div className={styles.powerBody}>
          <p className={styles.powerDescription}>{power.description}</p>
          <p className={styles.powerDetails}> {power.details}</p>
        </div>
      </div>
      Time remaining: {durationRemainingMinutes}:{String(durationRemainingSeconds).padStart(2, '0')}
      <div className={styles.activateButtonContainer}>
        {power.type === 'active' ? (
          <button className={styles.activateButton}>Activate</button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
