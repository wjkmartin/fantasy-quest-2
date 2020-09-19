import React, {memo} from "react";
import { useSelector } from "react-redux";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import styles from "./ActiveActorInfo.module.css";

import RequestDuelButton from "./RequestDuelButton/RequestDuelButton";
import TradeButton from "./TradeButton/TradeButton";
import TalkButton from "./TalkButton/TalkButton";
import InspectButton from "./InspectButton/InspectButton";

import { getFancyNameForDamage } from "./util";

function ActiveActorInfo(props) {
  const combatObject = useSelector((state) => state.combat);
  const inCombat = combatObject.inCombat;
  const actorObject = useSelector((state) => state.actors);

  const activeActor = actorObject.actorsById[actorObject.activeActorById];

  const talkButton = (
    <TalkButton
      key={"talkButton"}
      activeActor={activeActor}
      className={styles.actionButton}
    />
  );

  const duelButton = (
    <RequestDuelButton
      key={"requestDuelButton"}
      activeActor={activeActor}
      className={styles.actionButton}
    />
  );

  const tradeButton = (
    <TradeButton
      key={"tradeButton"}
      activeActor={activeActor}
      className={styles.actionButton}
    />
  );

  const inspectButton = (
    <InspectButton key={"inspectButton"} className={styles.actionButton} />
  );

  const buttons = [talkButton, duelButton, tradeButton, inspectButton];

  return activeActor === undefined ? (
    <div className={props.className}>
      <p className={styles.noTarget}> No active target </p>
    </div>
  ) : (
    <div className={props.className}>
      <div className={styles.topLine}>
        <p
          className={`${styles.actorName} ${
            activeActor.type === "hunter" ? styles.hunter : ""
          }`}
          id="targetActorName"
        >
          ~ {activeActor.actorName} ~
        </p>
        <p className={styles.actorTitle}>
          {`<< ${activeActor.title !== undefined ? activeActor.title : ""} >>`}
        </p>
      </div>
      <Tabs
        bsPrefix={`nav nav-tabs ${styles.actorTabs}`}
        defaultActiveKey="info"
        transition={false}
      >
        <Tab eventKey="info" title="Info">
          <div className={styles.tabContent}>
            <p className={styles.actorDetailsString}>
              {activeActor.raceLevelClassString}
            </p>
            <p className={styles.actorHealth}>
              <span>Health: </span>
              {activeActor.health}
            </p>

            {/* <p>Stamina: {actorData !== undefined ? actorData.stamina : ""}</p>
          <p>Mana: {actorData !== undefined ? actorData.mana : ""}</p> */}
          </div>
        </Tab>
        <Tab className={styles.tabby} eventKey="actions" title="Actions">
          <div className={styles.tabContent}>
            {inCombat ? " " : buttons.map((button) => button)}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ActiveActorInfo;
