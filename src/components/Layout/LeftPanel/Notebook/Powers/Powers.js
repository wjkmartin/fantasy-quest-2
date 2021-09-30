import React from "react";
import styles from "./Powers.module.css";

import { useSelector } from "react-redux";

import Power from "./Power/Power";

export default function Powers(props) { 

  let powers = useSelector((state) => state.actors.activePowersById[0]); //array of powers - default empty array
  let powersComponents = undefined;

  if (powers.length > 0) {
    powersComponents = powers.map((power) => {
      return <Power key={power.ref} powerData={power} />
    })
  }

  const noPowers = <p className={styles.Powers__noPowers}>You currently have no powers.</p>;
  
  return (
    <div className={styles.Powers}>
        {powersComponents === undefined ? noPowers : powersComponents}
    </div>
  );
}
