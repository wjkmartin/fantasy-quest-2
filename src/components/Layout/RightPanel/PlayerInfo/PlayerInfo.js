import React from "react";
import { useSelector } from "react-redux";

import styles from "./PlayerInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getDerivedPhysicalString } from "./util";

const PlayerInfo = (props) => {
  let player = useSelector((state) => state.actors.actorsById[0]);
  let playerInv = useSelector((state) => state.items.inventoryByActorId[0]);
  let playerEquippedItemsByIds = useSelector(
    (state) => state.items.equippedItemsIdsByActorId[0]
  );

  const healthPercentage =
    Math.round((player.health / player.maxHealth) * 100) + "%";

  const spPercentage = Math.round((player.sp / player.maxSp) * 100) + "%";
  const manaPercentage = Math.round((player.mana / player.maxMana) * 100) + "%";

  return (
    <div className={props.className}>
      <div className={styles.header}>
        <p className={styles.playerName}>{player.actorName}</p>
        <p className={styles.raceLevelClass}>{player.raceLevelClassString}</p>
      </div>

      <div className={styles.playerStats__col_1}>
        <div className={styles.barWrapper}>
          <FontAwesomeIcon
            className={styles.attributeIcon}
            icon={["fas", "plus"]}
          ></FontAwesomeIcon>
          <div className={styles.bar}>
            <div className={styles.bar__numerals}>
              {player.health} / {player.maxHealth}
            </div>
            <div
              style={{
                width: healthPercentage,
                position: "absolute",
                height: "22px",
                backgroundColor: "#e06666",
                borderRadius: "10% 10% 10% 10% / 0% 50% 50% 0% ",
              }}
            ></div>
          </div>
        </div>
        <div className={styles.barWrapper}>
          <FontAwesomeIcon
            className={styles.attributeIcon}
            icon={["fas", "star"]}
          ></FontAwesomeIcon>
          <div className={styles.bar}>
            <div className={styles.bar__numerals}>
              {player.mana} / {player.maxMana}
            </div>
            <div
              style={{
                width: manaPercentage,
                height: "22px",
                backgroundColor: "#6fa8dc",
                borderRadius: "10% 10% 10% 10% / 0% 50% 50% 0% ",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className={styles.playerStats__col_2}>
        <p>Armor: {player.armor}</p>
        <p>Dodge %: {player.dodge}</p>
        <p>Focus %: {player.focus}</p>
      </div>

      <div className={styles.playerStatsAS}>
        <div className={styles.playerStatsAS__col_1}>
          <p>Strength: {player.abilityScores.strength}</p>
          <p>Dexterity: {player.abilityScores.dexterity}</p>
          <p>Constitution: {player.abilityScores.constitution}</p>
        </div>
        <div className={styles.playerStatsAS__col_2}>
          <p>Charisma: {player.abilityScores.charisma}</p>
          <p>Wisdom: {player.abilityScores.wisdom}</p>
          <p>Intelligence: {player.abilityScores.intelligence}</p>
        </div>
      </div>
      <div className={styles.combatStats}>
        <p>
          Physical attack:{" "}
          {getDerivedPhysicalString(
            player,
            playerInv,
            playerEquippedItemsByIds
          )}
        </p>
      </div>
      <div className="playerActiveEffects"></div>
    </div>
  );
};

export default PlayerInfo;
