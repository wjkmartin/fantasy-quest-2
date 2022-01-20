import React from "react";
import styles from "./Powers.module.css";

import { useSelector } from "react-redux";

import Power from "./Power/Power";

export default function Powers(props) { 
  // to do: add a tab for active vs passive powers
  let powers = useSelector((state) => state.powers.unlockedPowersById)[0] || [];
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
