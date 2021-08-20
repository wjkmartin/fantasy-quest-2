import React, { useState, useEffect, useCallback } from "react";
import styles from "./PlaceTime.module.css";

import { connect } from "react-redux";

function PlaceTime({ currentLocation }) {
  const [theTime, setTime] = useState(new Date());

  const setIntervalAsync = useCallback((fn, ms) => {
    fn().then(() => {
      setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
  }, []);

  useEffect(
    () =>
      setIntervalAsync(async () => {
        setTime(new Date()); //should also set global time redux?
      }, 10000),
    [setIntervalAsync]
  );

  return (
    <div className={styles.Row}>
      <div className={styles.dropShadow}>{currentLocation.prettyName}</div>
      <div className={styles.dropShadow}>
        {theTime.getHours() + ":" + (theTime.getMinutes() < 10 ? "0" : "") + theTime.getMinutes()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { currentLocation: state.locations.currentLocation };
};

export default connect(mapStateToProps)(PlaceTime);
