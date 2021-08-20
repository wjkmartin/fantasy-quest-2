import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Inventory.module.css";

import Item from "./Item/Item";
import ActiveItemArea from "./ActiveItemArea/ActiveItemArea";

import { useDrop } from "react-dnd";

import "../../../../../Assets/css/fontawesome.css";
import "../../../../../Assets/css/solid.css";

export default function Inventory() {
  const playerGold = useSelector((state) => state.actors.actorsById[0].gold);
  
  let playerInventory = useSelector(
    (state) => state.items.inventoryByActorId
  )[0];

  let [activeItem, setActiveItem] = useState(undefined);

  function onClickItem(item) {
    setActiveItem(item);
  }

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "itemTrade",
    drop: () => ({ name: "inventory" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const playerInventoryElems =
    playerInventory !== [undefined]
      ? playerInventory.map((item) => {
          return (
            <Item
              key={`item-${item.id}`}
              setActiveItem={setActiveItem}
              item={item}
              onClick={() => onClickItem(item)}
            />
          );
        })
      : "";

  return (
    <div ref={drop} className={styles.Inventory}>
      <div
        className={`${styles.Inventory__itemArea} ${
          canDrop ? styles.onDrag : ""
        }`}
      >
        {playerInventoryElems}
      </div>
      <div className={styles.Inventory__goldArea}>{`₮${playerGold}`}</div>
      <div className={styles.Inventory__itemInfoArea}>
        {activeItem !== undefined ? <ActiveItemArea setActiveItem={setActiveItem} item={activeItem} /> : " "}
      </div>
    </div>
  );
}
