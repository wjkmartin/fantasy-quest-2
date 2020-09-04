import React from "react";
import styles from "./Skills.module.css";

import Skill from './Skill/Skill'

const TEST_SKILLS_DATA = {
  swimming: {
    title: "Swimming",
    desc: "Your ability to move through water with grace and speed.",
    level: 2,
  },
  sword_fighting: {
    title: "Sword Fighting",
    desc: "The skill you have with the standard sword.",
    level: 1,
  },
};

const TEST_SKILLS_STATE = [ //refactor to use this
    {swimming: 2},
    {sword_fighting: 1}
]

export default function Skills(props) {
  const skills = Object.keys(TEST_SKILLS_DATA).map((key) => {
    return (
      <Skill skillData={TEST_SKILLS_DATA[key]} />
    );
  });

return <div className={styles.Skills}>{skills}</div>;
}
