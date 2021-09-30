import React, { useEffect, useState } from "react";
import styles from "./Power.module.css";

import { useDispatch } from "react-redux";
import actions from "../../../../../../DataHandlers/redux/actions";

export default function Power(props) {
  const power = props.powerData;
  let dispatch = useDispatch();

  let [durationRemainingSeconds, setDurationRemainingSeconds] = useState(10);

  useEffect(() => {
    Object.keys(power.stats).forEach((stat) => {
      dispatch(
        actions.modifyActorAttributeByActorId(0, stat, power.stats[stat])
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
        
        dispatch(actions.removePowerFromActorByDataReferenceAndId(power.ref, 0));
        Object.keys(power.stats).forEach((stat) => {
          dispatch(
            actions.modifyActorAttributeByActorId(0, stat, power.stats[stat] * -1)
          );
        });
      }
      
      
    };
  });

  // let dispatch = useDispatch();
  // let remainingTimeSeconds;

  // // get remainingTimeSeconds and use that state
  // useEffect(() => {

  // })

  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   remainingTimeSeconds = seconds;
  //   if (completed) {
  //     // Render a completed state
  //     return "expired";
  //   } else {
  //     // Render a countdown
  //     return (
  //       <span>
  //         {hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  // let countdown =
  //   power.duration !== undefined ? (
  //     <Countdown
  //       onTick={() => {actions.updatePowerDuration(power.ref, 0, remainingTimeSeconds)}}
  //       onComplete={() => {
  //
  //
  //       renderer={renderer}
  //       date={Date.now() + power.duration * 60000}
  //     />
  //   ) : (
  //     ""
  //   );

  return (
    <div className={styles.Power}>
      <div>
        <p className={styles.powerLabel}>{power.name}</p>
        <div className={styles.powerBody}>
          <p className={styles.powerDescription}>{power.description}</p>
          <p className={styles.powerDetails}> {power.details}</p>
        </div>
      </div>
      {durationRemainingSeconds}
      <div className={styles.activateButtonContainer}>
        {power.type === "active" ? (
          <button className={styles.activateButton}>Activate</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
