import React from "react";

import { useSelector } from "react-redux";

import styles from "./ActivityLog.module.css";



export default function ActivityLog(props) {
  const activityLogItems = useSelector((state) => state.UI.activityLog);

  return (
    <div className={props.className}>
      <p className={styles.header}>ACTIVITY LOG</p>
      <div className={styles.wrapper}>
        <div className={styles.logFeed}>
          {" "}
          {Object.values(activityLogItems).map((e, index) => (
            <div key={`activityLog-${index}`} className={styles.activityLogItem}>{e}</div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
}
