import React from "react";
import styles from "./Power.module.css";

export default function Power(props) {
  const power = props.power;
  return (
    <div className={styles.Power}>
      <div>
        <p className={styles.powerLabel}>{power.name}</p>
        <div className={styles.powerBody}>
          <p className={styles.powerDescription}>{power.description}</p>
          <p className={styles.powerDetails}> {power.details}</p>
        </div>
      </div>
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
