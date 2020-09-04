import React, { useState } from "react";
import styles from "./Codex.module.css";

const TEST_CODEX_DATA = {
  "Hunter": {
    title: "Hunter",
    body:
      "Relic Hunters. Players. You. The people playing RHO who are searching for Reliquaries, battling fearsome creatures, braving deadly dungeons, and surving the treachery of other Hunters. Their names are colored teal in the Target Status window.",
  },
  "Reliquary": {
    title: "Reliquary",
    body:
      "The ultimate objective of RHO. These extra-dimensional dungeons exist on seperate planes, and count dangerous monsters among its denizens. The risk is proportional to the reward however, and rumors say that the most powerful Artifact-level items can only be found in these treasure troves.",
  },
  "RHO": {
    title: "RHO",
    body:
      'Relic Hunters Online. A world famous VRMMORPG, and the most popular of its kind since release two years ago. It\'s known for the intense XP grind required to reach top level, and the easter eggs that the developers have put into the game. Critics say the game is "pay to win", citing the mechanic allowing players to pay real money to gain levels. The cost of doing this prohibitive to most players, costing tens of thousands per level at high levels. RHO is also known for its ruthless PvP (Player versus Player) combat. Players are only safe in "green zones" such as cities. Outside of those, it\'s a free for all.',
  },
  "The Red Moon": {
    title: "The Red Moon",
    body: "A pirate ship captained by the fearsome and infamous Pamina of The Crescent Moon Isles... stay away if you value your life.",
  },
};

const TEST_UNLOCKED_ENTRIES = ["Hunter", "RHO", "The Red Moon"];

export default function Codex(props) {
  let [activekey, setActiveKey] = useState("Hunter");

  const codexTabs = TEST_UNLOCKED_ENTRIES.map((key) => {
    return (
      <div
        onClick={() => onClickCodexKey(key)}
        className={styles.Codex__tabKey}
      >
        {key}
      </div>
    );
  });

  const codexText = getCodexText(activekey);

  function onClickCodexKey(key) {
    setActiveKey(key);
  }

  function getCodexText(key) {
    return TEST_CODEX_DATA[key];
  }

  return (
    <div className={styles.Codex}>
      <div className={styles.Codex__selectionColumn}>{codexTabs}</div>
      <div className={styles.Codex__textBody}>
          <p className={styles.Codex__textBody_title}>{codexText.title}</p>
          <p className={styles.Codex__textBody_body}>{codexText.body}</p>
      </div>
    </div>
  );
}
