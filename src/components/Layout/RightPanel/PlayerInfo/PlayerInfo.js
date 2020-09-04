import React from "react";
import { useSelector } from "react-redux";

import styles from "./PlayerInfo.module.css";

import { getDerivedPhysicalString } from './util';

const PlayerInfo = (props) => {
  let player = useSelector((state) => state.actors.actorsById[0]);
  let playerInv = useSelector((state) => state.items.inventoryByActorId[0]);
  let playerEquippedItemsByIds = useSelector((state) => state.items.equippedItemsIdsByActorId[0]);

  return (
    <div className={props.className}>
      <p className={styles.playerName}>{player.actorName}</p>
      <p className={styles.raceLevelClass}>{player.raceLevelClassString}</p>
      <div className={styles.playerStats}>
        <div className={styles.playerStats__col_1}>
          <p>Health: {player.health}</p>
          <p>Mana: {player.mana}</p>
          <p>SP: {3}</p>
        </div>
        <div className={styles.playerStats__col_2}>
          <p>Armor: {player.armor}</p>
          <p>Dodge %: {player.dodge}</p>
          <p>Focus %: {player.focus}</p>
        </div>
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
        <p>Physical attack: {getDerivedPhysicalString(player, playerInv, playerEquippedItemsByIds)}</p>
      </div>
      <div className="playerActiveEffects"></div>
    </div>
  );
};

export default PlayerInfo;
