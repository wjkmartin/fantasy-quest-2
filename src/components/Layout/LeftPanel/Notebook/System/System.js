import React from "react";
import styles from "./System.module.css";

export default function System() {
  function clearStorage() {
    localStorage.clear();
    document.location.reload();
  }
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.systemButton} onClick={clearStorage}>
        Clear local storage
      </button>
    </div>
  );
}
