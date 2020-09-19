import React from "react";
import styles from "./CenterPanel.module.css";

import { useSelector } from "react-redux";

import MainDisplayArea from "./MainDisplayArea/MainDisplayArea";
import TextDisplayArea from "./TextDisplayArea/TextDisplayArea";
import ButtonArea from "./ButtonArea/ButtonArea";
// import ExpBar from "./ExpBar/ExpBar";
// import HotBar from "./Hotbar/HotBar";
import CombatArea from "./CombatArea/CombatArea";
import ConversationArea from "./ConversationArea/ConversationArea";
import TradeArea from "./TradeArea/TradeArea";

function nonCombat(props) {
  return (
    <div className={props.className}>
      <MainDisplayArea className={styles.MainDisplayArea} />
      <TextDisplayArea className={styles.TextDisplayArea} />
      <ButtonArea className={styles.ButtonArea} />
      {/* <ExpBar className={styles.ExpBar} /> */}
    </div>
  );
}

function conversation(props) {
  return (
    <div className={props.className}>
      <ConversationArea />
    </div>
  );
}

function combat(props) {
  return (
    <div className={props.className}>
      <CombatArea></CombatArea>
      {/* <HotBar /> */}
    </div>
  );
}

function trade(props) {
  return (
    <div className={props.className}>
      <TradeArea />
    </div>
  );
}

function CenterPanel(props) {
  const inCombat = useSelector((state) => state.combat.inCombat);
  const inConversation = useSelector((state) => state.UI.inConversation);
  const inTrade = useSelector((state) => state.items.inTrade);

  if (inCombat) {
    return combat(props);
  } else if (inConversation) {
    return conversation(props);
  } else if (inTrade) return trade(props);
  else return nonCombat(props);
}

export default CenterPanel;
