import React from "react";
import { useSelector } from "react-redux";

import styles from "./PlayerInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getDerivedPhysicalString } from "./util";
import LevelUpStatIncreaseButton from "./LevelUpStatIncreaseButton/LevelUpStatIncreaseButton";

const PlayerInfo = (props) => {
  const player = useSelector((state) => state.actors.actorsById[0]);
  const playerInv = useSelector((state) => state.items.itemsById.filter(item => item.ownerId === 0));
  const playerEquippedItemsByIds = playerInv.filter(item => item.equipped) || [];

  const healthPercentage =
    Math.round((player.health / player.maxHealth) * 100) + "%";

  // const spPercentage = Math.round((player.sp / player.maxSp) * 100) + "%";
  const manaPercentage = Math.round((player.mana / player.maxMana) * 100) + "%";
  const xpPercentage = Math.round((player.xp / player.xpToNextLevel) * 100) + "%";

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

      <div className={styles.playerStatsAS}>
        <div className={styles.playerStatsAS__col_1}>
          <div className={styles.ASrow}>{(player.levelsUpAvailable > 0 ? <LevelUpStatIncreaseButton stat={'strength'} /> : '')}<div>Strength: </div><div>{player.strength}</div></div>
          <div className={styles.ASrow}>{(player.levelsUpAvailable > 0 ? <LevelUpStatIncreaseButton stat={'dexterity'} /> : '')}<div>Dexterity: </div><div>{player.dexterity}</div></div>
          <div className={styles.ASrow}>{(player.levelsUpAvailable > 0 ? <LevelUpStatIncreaseButton stat={'constitution'} /> : '')}<div>Constitution: </div><div>{player.constitution}</div></div>
        </div>
        <div className={styles.playerStatsAS__col_2}>
        <div className={styles.ASrow}>{(player.levelsUpAvailable > 0 ? <LevelUpStatIncreaseButton stat={'charisma'} /> : '')}<div>Charisma: </div><div>{player.charisma}</div></div>
        <div className={styles.ASrow}>{(player.levelsUpAvailable > 0 ? <LevelUpStatIncreaseButton stat={'wisdom'} /> : '')}<div>Wisdom: </div><div>{player.wisdom}</div></div>
        <div className={styles.ASrow}>{(player.levelsUpAvailable > 0 ? <LevelUpStatIncreaseButton stat={'intelligence'} /> : '')}<div>Intelligence: </div><div>{player.intelligence}</div></div>
        </div>
      </div>

      <div className={styles.playerStats__col_2}>
        <p className={styles.statColumn}>
          <span>ARMOR</span>
          <span>{player.armor}</span>
        </p>
        <p className={styles.statColumn}>
          <span>DODGE</span>
          <span>{player.dodge}%</span>
        </p>
        <p className={styles.statColumn}>
          <span>FOCUS</span>
          <span>{player.focus}%</span>
        </p>
      </div>
      <div className={styles.combatStats}>
        <p>
          Physical attack:{" "}
          {getDerivedPhysicalString(
            player,
            playerInv,
            playerEquippedItemsByIds
          )}
          {" damage"}
        </p>
      </div>
      <div className={styles.XPBar}>
        <div className={styles.XPBar_XP}>XP</div>
        <div className={styles.xpNumeralsDisplay}>{player.xp} <div className={styles.horizontalLine} /> {player.xpToNextLevel}</div>
        <div className={styles.XPBar_bar}>
          <div style={{
            width: xpPercentage,
            backgroundColor: "gold",
            height: "12px",
            borderRight: "1px solid black"
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
