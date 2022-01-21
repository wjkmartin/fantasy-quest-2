import React, { useState } from "react";
import styles from "./Quests.module.css";
import { useSelector } from "react-redux";

import Quest from "./Quest/Quest";

const TEST_QUEST_DATA = {
  1: {
    title: "Find a rare smapple",
    1:
      "Ajwar has tasked you with finding a lost smapple... he thinks that a certain pirate scoundrel named Pamina, commonly found in the docks might have it.",
    2: "You've aquired a smapple! Return to Ajwar for a reward.",
    99:
      "You aquired a smapple for Ajwar and he gave you a protective amulet for your trouble.",
  },
};

// const TEST_QUESTS_STATE = [
//   {
//     id: 1,
//     stage: 0,
//   }
// ];

export default function Quests() {
  let [currentWindow, setCurrentWindow] = useState("active");

  const questState = useSelector((state) => state.quests.playerActiveQuests);
  // const questState = TEST_QUESTS_STATE;

  let quests = questState.map((quest) => {
    const questData = TEST_QUEST_DATA[quest.id];
    return <Quest questData={questData} stage={quest.stage} />;
  });

  let activeQuests = () => {
    let questsFiltered = quests.filter(
      (quest) => quest.props.stage > 0 && quest.props.stage < 90 // started quests are stage 1 to 89, finished quests 90 to 99 (to allow multiple endings)
    );
    if (questsFiltered.length === 0) {
      return <div className={styles.Quests__noQuest}> No active quests. </div>;
    } else return questsFiltered;
  };

  let completedQuests = () => {
    let questsFiltered = quests.filter(
      (quest) => quest.props.stage >= 90 // completed quests are stage 90 to 99
    );
    if (questsFiltered.length === 0) {
      return <div className={styles.Quests__noQuest}> No completed quests. </div>;
    } else return questsFiltered;
  };

  return (
    <div className={styles.Quests}>
      <div className={styles.Quests__active_completed_filter_buttons}>
        <button className={`${currentWindow === "active" ? styles.Quests__filterButtonActive : ''} ${styles.Quests__filterButton}`} onClick={() => setCurrentWindow("active")}>Active</button>
        <button className={`${currentWindow === "completed" ? styles.Quests__filterButtonActive : ''} ${styles.Quests__filterButton}`} onClick={() => setCurrentWindow("completed")}>Completed</button>
      </div>
      <div>{currentWindow === "active" ? activeQuests() : completedQuests()}</div>
    </div>
  );
}
