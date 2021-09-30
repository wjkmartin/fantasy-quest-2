import React from "react";

import { useSelector } from "react-redux";

import styles from "./ActivityLog.module.css";

export default function ActivityLog(props) {
  const activityLogItems = useSelector((state) => state.UI.activityLog);

  const logItems = activityLogItems.map(({ message, styleType }) => (
    <p className={`${styles.activityLogItem} ${styles[styleType]}`}>
      {message}
    </p>
  ));

  return (
    <div className={props.className}>
      <p className={styles.header}>ACTIVITY LOG</p>
      <div className={styles.wrapper}>
        <div className={styles.logFeed}>{logItems}</div>
      </div>
    </div>
  );
}
