import React from "react";
import styles from "./Skill.module.css";

export default function Skill(props) {
  return (
    <div className={styles.Skill}>
      <div className={styles.Skill__body}>
        <p className={styles.Skill__body_title}>{props.skillData.title}</p>
        <p className={styles.Skill__body_desc}>{props.skillData.desc}</p>
      </div>
      <p className={styles.Skill__level}>{props.skillData.level} / 1000</p>
    </div>
  );
}
