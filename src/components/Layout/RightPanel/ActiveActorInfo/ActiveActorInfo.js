import React from "react";
import { useSelector } from "react-redux";

import styles from "./ActiveActorInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RequestDuelButton from "./RequestDuelButton/RequestDuelButton";
import TradeButton from "./TradeButton/TradeButton";
import TalkButton from "./TalkButton/TalkButton";
import InspectButton from "./InspectButton/InspectButton";
import AddToFriendsButton from "./AddToFriendsButton/AddToFriendsButton"


function ActiveActorInfo(props) {
  const combatObject = useSelector((state) => state.combat);
  const inCombat = combatObject.inCombat;
  const actorObject = useSelector((state) => state.actors);
  const activeActor = actorObject.actorsById[actorObject.activeActorById];
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );

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
      playerName={actorObject.actorsById[0].actorName}
      activeActor={activeActor}
      actorsHere={
        currentSubLocation !== undefined
          ? actorObject.byLocationName[currentSubLocation.name]
          : actorObject.byLocationName[currentLocation.name]
      }
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

  const addToFriendsButton = (
    <AddToFriendsButton key={"addToFriendsButton"} className={styles.actionButton} />
  );

  const buttons = [talkButton, tradeButton, duelButton, inspectButton, addToFriendsButton];
  const monsterButtons = [duelButton];
  const healthPercentage =
    activeActor === undefined
      ? "none"
      : Math.round(activeActor.health / activeActor.maxHealth * 100) + "%";
  const spPercentage =
    activeActor === undefined
      ? "none"
      : Math.round(activeActor.sp / activeActor.maxSp * 100) + "%";
  const manaPercentage =
    activeActor === undefined
      ? "none"
      : Math.round(activeActor.mana / activeActor.maxMana * 100) + "%";

  return activeActor === undefined ? (
    <div className={props.className}>
      <p className={styles.noTarget}> No active target </p>
    </div>
  ) : (
    <div className={props.className}>
      <div className={styles.topRow}>
        <img
          src={activeActor.portrait}
          alt="character portrait"
          className={styles.characterPortrait}
        />
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <p
            className={`${styles.actorName} ${
              activeActor.type === "hunter" ? styles.hunter : ""
            }`}
            id="targetActorName"
          >
            ~ {activeActor.actorName} ~
          </p>
          <p className={styles.actorTitle}>
            {`<< ${
              activeActor.title !== undefined ? activeActor.title : ""
            } >>`}
          </p>
          <p className={styles.actorTitle}>
            {activeActor.raceLevelClassString}
          </p>
          <div className={styles.barWrapper}>
            <FontAwesomeIcon className={styles.attributeIcon} icon={["fas", "plus"]}></FontAwesomeIcon>
            <div className={styles.bar}>
              <div
                style={{
                  width: healthPercentage,
                  position: "absolute",
                  height: "11px",
                  backgroundColor: "#e06666",
                  borderRadius: "10% 10% 10% 10% / 0% 50% 50% 0% ",
                }}
              ></div>
            </div>
            <div className={styles.bar__numerals}>
              {activeActor.health} / {activeActor.maxHealth}
            </div>
          </div>
          <div className={styles.barWrapper}>
            <FontAwesomeIcon className={styles.attributeIcon} icon={["fas", "user"]}></FontAwesomeIcon>
            <div className={styles.bar}>
              <div
                style={{
                  width: spPercentage,
                  height: "11px",
                  backgroundColor: "#93c47d",
                  borderRadius: "10% 10% 10% 10% / 0% 50% 50% 0% ",
                }}
              ></div>
            </div>
            <div className={styles.bar__numerals}>
              {activeActor.sp} / {activeActor.maxSp}
            </div>
          </div>
          <div className={styles.barWrapper}>
            <FontAwesomeIcon className={styles.attributeIcon} icon={["fas", "star"]}></FontAwesomeIcon>
            <div className={styles.bar}>
              <div
                style={{
                  width: manaPercentage,
                  height: "11px",
                  backgroundColor: "#6fa8dc",
                  borderRadius: "10% 10% 10% 10% / 0% 50% 50% 0% ",
                }}
              ></div>
            </div>
            <div className={styles.bar__numerals}>
              {activeActor.mana} / {activeActor.maxMana}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomRow}>
        {inCombat
          ? " "
          : activeActor.type === "monster"
          ? monsterButtons.map((button) => button)
          : buttons.map((button) => button)}
      </div>
    </div>
  );
}

export default ActiveActorInfo;
