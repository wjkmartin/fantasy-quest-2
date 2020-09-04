import React from "react";
import styles from "./Powers.module.css";

import { useSelector } from "react-redux";

import Power from "./Power/Power";

export default function Powers(props) {
  let powers = useSelector(state => state.actors.activePowersById[0]).map((power) => {
    return <Power power={power} />;
  });

  return <div className={styles.Powers}>{powers.length > 0 ? powers.map((e) => e) : <p className={styles.Powers__noPowers}>You currently have no powers.</p>}
    {}</div>;
}
