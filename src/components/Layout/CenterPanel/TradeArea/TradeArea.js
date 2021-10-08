import React, { useState } from "react";
import styles from "./TradeArea.module.css";

import { useSelector } from "react-redux";

import { useDrop } from "react-dnd";

import NpcSide from "./NpcSide/NpcSide";
import TradeItem from "./TradeItem/TradeItem";
import FinalizeButton from "./FinalizeButton/FinalizeButton";

export default function TradeArea() {
  const itemState = useSelector((state) => state.items);
  const actorsById = useSelector((state) => state.actors.actorsById)

  const playerItemIds = itemState.itemsPlayerWantsToTradeById;
  const playerInventory = itemState.inventoryByActorId[0];

  const npcInTradeById = itemState.actorInTradeById;
  const npcInventory = itemState.inventoryByActorId[npcInTradeById];

  let [selectedItemIds, setSelectedItemIds] = useState([]);

  function onClickNpcItem(itemId) {
    let currentItemsSelectedById = [...selectedItemIds];
    if (!currentItemsSelectedById.includes(itemId)) {
      currentItemsSelectedById.push(itemId);
      setSelectedItemIds(currentItemsSelectedById);
    } else {
      const indexOfItem = currentItemsSelectedById.findIndex(
        (id) => id === itemId
      );
      currentItemsSelectedById.splice(indexOfItem, 1);
      setSelectedItemIds(currentItemsSelectedById);
    }
  }

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "itemInventory",
    drop: () => ({ name: "trade" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  function itemElementsFromItemArray(itemArray = [], playerOrNpc) {
    let itemsElements = [];
    itemArray.forEach((item) => {
      if (playerOrNpc === "player") {
        itemsElements.push(<TradeItem type={"player"} item={item} />);
      } else if (playerOrNpc === "npc") {
        itemsElements.push(
          <TradeItem
            selectedItems={selectedItemIds}
            onClick={() => onClickNpcItem(item.id)}
            item={item}
          />
        );
      }
    });
    return itemsElements;
  }

  function itemArrayFromIdArray(itemIdArray = [], actorInventory) {
    let items = [];
    itemIdArray.forEach((id) => {
      items.push(actorInventory.find((item) => item.id === id));
    });
    return items;
  }

  const playerItemArray = itemArrayFromIdArray(playerItemIds, playerInventory);

  let playerItemValue = playerItemArray.reduce((sum, item) => {
    return sum + (item !== undefined ? item.value : 0);
  }, 0);
  let npcItemValue = itemArrayFromIdArray(selectedItemIds, npcInventory).reduce(
    (sum, item) => {
      return sum + (item !== undefined ? item.value : 0);
    }
  ,0);

  return (
    <div className={styles.TradeArea}>
      <div className={styles.TradeArea__header}>
        <div className={styles.TradeArea__tradingWithArea}>
          Trading with {actorsById[npcInTradeById].actorName}
        </div>
        <div className={styles.TradeArea__valueArea}>
          <div className={styles.TradeArea__valueArea_value}>
            {"₮"}
            {playerItemValue}
          </div>
          <div className={styles.TradeArea__valueArea_value}>
            {"₮"}
            {npcItemValue}
          </div>
        </div>
      </div>
      <div className={styles.TradeArea__balanceArea}>
        <div
          ref={drop}
          className={`${styles.TradeArea__balanceArea_player} ${
            canDrop ? styles.onDrag : ""
          }`}
        >
          {(playerItemArray[0] !== undefined ? itemElementsFromItemArray(playerItemArray, "player").map((e) => e): "") }
        </div>
        <NpcSide items={itemElementsFromItemArray(npcInventory, "npc")} />
      </div>
      <div className={styles.TradeArea__buttonArea_commentArea}>
        <div className={styles.TradeArea__buttonArea}>
          <FinalizeButton actorInTradeId={npcInTradeById} balance={playerItemValue-npcItemValue} itemsToSendById={playerItemIds} itemsToRecieveById={selectedItemIds}/>
        </div>
        <div className={styles.TradeArea__commentArea}></div>
      </div>
    </div>
  );
}
