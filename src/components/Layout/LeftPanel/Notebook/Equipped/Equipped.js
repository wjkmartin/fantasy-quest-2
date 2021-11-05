import React, { useState } from "react";

import { useSelector } from "react-redux";
import bgImageMale from "../../../../../Assets/img/Asset 1.png";

import EquippedItemSlot from "./EquippedItemSlot/EquippedItemSlot";

import { itemColorClass, itemRarityName } from "../Inventory/util";

import styles from "./Equipped.module.css";
import UnequipButton from "./UnequipButton/UnequipButton";

export default function Equipped() {
  const items = useSelector((state) => state.items.itemsById);
  const playerItems = items.filter((item) => item.ownerId == 0);
  const equippedItems = playerItems.filter((item) => item.equipped);

  let playerEquippedItemsBySlot = {};

    playerEquippedItemsBySlot = equippedItems
      .reduce((obj, item) => {
        obj[item.slot] = item;
        return obj;
      }, {});


  let [activeItem, setActiveItem] = useState(undefined);

  function onClickItem(item) {
    setActiveItem(item);
  }

  return (
    <div className={styles.Equipped}>
      <div className={styles.Equipped__itemArea}>
        <img
          className={styles.backgroundImage}
          src={bgImageMale}
          alt={"background"}
        />
        <div className={styles.itemSlotRows__container}>
          <div className={styles.itemSlot1__container}>
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.head)}
              slot={playerEquippedItemsBySlot.head}
            />
          </div>
          <div className={styles.itemSlot2__container}>
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.neck)}
              slot={playerEquippedItemsBySlot.neck}
            />
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.eyes)}
              slot={playerEquippedItemsBySlot.eyes}
            />
          </div>
          <div className={styles.itemSlot2__container}>
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.torso_under)}
              slot={playerEquippedItemsBySlot.torso_under}
            />
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.torso_over)}
              slot={playerEquippedItemsBySlot.torso_over}
            />
          </div>
          <div className={styles.itemSlot2__container}>
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.weapon_main)}
              slot={playerEquippedItemsBySlot.weapon_main}
            />
            <EquippedItemSlot
              onClick={() =>
                onClickItem(playerEquippedItemsBySlot.weapon_shield_offhand)
              }
              slot={playerEquippedItemsBySlot.weapon_shield_offhand}
            />
          </div>
          <div className={styles.itemSlot2__container}>
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.legs_under)}
              slot={playerEquippedItemsBySlot.legs_under}
            />
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.legs_over)}
              slot={playerEquippedItemsBySlot.legs_over}
            />
          </div>
          <div className={styles.itemSlot1__container}>
            <EquippedItemSlot
              onClick={() => onClickItem(playerEquippedItemsBySlot.feet)}
              slot={playerEquippedItemsBySlot.feet}
            />
          </div>
        </div>
      </div>
      <div className={styles.Equipped__itemInfoArea}>
        {activeItem !== undefined ? (
          <>
            <div className={styles.Equipped__itemInfoArea_info}>
              <p className={styles.Equipped__itemInfoArea_info_itemLabel}>
                {activeItem.name}
              </p>
              <p
                className={`${styles.Equipped__itemInfoArea_info_rarity} + ${
                  styles[itemColorClass(activeItem.rarity)]
                }`}
              >
                {itemRarityName(activeItem.rarity)}
              </p>
              <p className={styles.Equipped__itemInfoArea_info_flavor}>
                {activeItem.desc}
              </p>
              <p className={styles.Equipped__itemInfoArea_info_details}>
                {activeItem.descDetails}
              </p>
            </div>
            <div className={styles.Equipped__itemInfoArea_buttons}>
              <UnequipButton
                className={styles.Equipped__itemInfoArea_buttons_button}
                itemId={activeItem.id}
                setActiveItem={setActiveItem}
              />
            </div>
          </>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
