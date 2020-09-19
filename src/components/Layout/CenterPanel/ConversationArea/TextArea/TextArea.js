import React from "react";
import styles from "./TextArea.module.css";

export default function TextArea(props) {
  let dialogue = [];

  props.dialogue.forEach((element, index) => {
    const actorIndicator = index % 2 === 0 ? "npc" : "player";
    dialogue.push(
      <div
        key={index}
        className={`${styles[actorIndicator]} ${styles.dialogue}`}
      >
        {element}
      </div>
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.textFeed}>{dialogue.map((e) => e)}</div>
    </div>
  );
}
