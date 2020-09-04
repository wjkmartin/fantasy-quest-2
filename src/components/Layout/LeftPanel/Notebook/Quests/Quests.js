import React, { useState } from "react";
import styles from "./Quests.module.css";
import { useSelector } from "react-redux";

import Quest from "./Quest/Quest";

const TEST_QUEST_DATA = {
  aquireSmapple: {
    title: "Find a rare smapple",
    stage0:
      "Ajwar has tasked you with finding a lost smapple... he thinks that a certain pirate scoundrel named Pamina, commonly found in the docks might have it.",
    stage1: "You've aquired a smapple! Return to Ajwar for a reward.",
    completed:
      "You aquired a smapple for Ajwar and he gave you a protective amulet for your trouble.",
  },
};

//TODO dynamically assign CSS class for active and completed buttons based on currentWindow state

// const TEST_QUESTS_STATE = [{ quest: "aquireSmapple", stage: "stage0" }];
const TEST_QUESTS_STATE = [];

export default function Quests() {
  let [currentWindow, setCurrentWindow] = useState("active");

  const questState = useSelector(state=> state.quests.questState)

  let quests = Object.keys(questState).map((key) => {
    return <Quest questData={TEST_QUEST_DATA[key]} stage={questState[key]} />;
  });

  let activeQuests = quests.filter(
    (quest) => quest.props.stage !== "completed"
  );
  let completedQuests = quests.filter(
    (quest) => quest.props.stage === "completed"
  );

  return (
    <div className={styles.Quests}>
      <div className={styles.Quests__active_completed_filter_buttons}>
        <button onClick={() => setCurrentWindow("active")}>Active</button>
        <button onClick={() => setCurrentWindow("completed")}>Completed</button>
      </div>
      <div>{currentWindow === "active" ? activeQuests : completedQuests}</div>
    </div>
  );
}
