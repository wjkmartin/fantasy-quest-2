import React from "react";
import styles from "./TradeArea.module.css";

import { useSelector, useDispatch } from "react-redux";
import itemSlice from "../../../../DataHandlers/redux/slices/items";
import actorSlice from "../../../../DataHandlers/redux/slices/actors";
import { useDrop } from 'react-dnd'

import TradeItem from "./TradeItem/TradeItem";


export default function TradeArea() {
  const itemsById = useSelector((state) => state.items.itemsById);
  const actorsById = useSelector((state) => state.actors.actorsById)

  const actorInTradeById = useSelector((state) => state.items.actorInTradeById); 

  const itemsActorCanTrade = itemsById.filter((item) => item.ownerId === actorInTradeById)

  const dispatch = useDispatch();

  const [collectedProps, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => {
      dispatch(itemSlice.actions.addItemToTrade(item.id));
    }
  }))

  const itemsPlayerWantsToTradeById = useSelector(
    (state) => state.items.itemsPlayerWantsToTradeById
  );
  const itemsSelectedByPlayerById = useSelector(
    (state) => state.items.itemsSelectedByPlayerById
  );

  const actorItemsElems = itemsActorCanTrade.map((itemId) => {
    return (
      <TradeItem key={`__ACTOR_TRADE_ITEM__${itemId}`} itemId={itemId}/>
    )
  }) 

  const actorItemValue = itemsSelectedByPlayerById.reduce((acc, itemId) => {
    return acc + itemsById[itemId].value
  }, 0)

  const playerItemElems = itemsPlayerWantsToTradeById.map((itemId) => {
    return (
      <TradeItem key={`__PLAYER_TRADE_ITEM__${itemId}`} itemId={itemId}/>
    )
  })

  const playerItemValue = itemsPlayerWantsToTradeById.reduce((acc, itemId) => {
    return acc + itemsById[itemId].value
  }, 0)

  const balanceOwing = playerItemValue - actorItemValue;

  function finalizeTrade() {
    dispatch(itemSlice.actions.doTrade());
    dispatch(actorSlice.actions.modifyActorAttributeByActorId({actorId: 0, attribute:'gold', value:balanceOwing}));
  }

  return (
    <div ref={drop} className={styles.TradeArea}>
      <div className={styles.TradeArea__header}>
        <div className={styles.TradeArea__tradingWithArea}>
          Trading with {actorsById[actorInTradeById].actorName}
        </div>
        <div className={styles.TradeArea__valueArea}>
          <div className={styles.TradeArea__valueArea_value}>
            {"₮"}
            {playerItemValue}
          </div>
          <div className={styles.TradeArea__valueArea_value}>
            {"₮"}
            {actorItemValue}
          </div>
        </div>
      </div>
      <div className={styles.TradeArea__balanceArea}>
        <div>
          {playerItemElems}
        </div>
        <div>
          {actorItemsElems}
      </div>
      </div>
      <div className={styles.TradeArea__buttonArea_commentArea}>
        <div className={styles.TradeArea__buttonArea}>
          <button onClick={() => finalizeTrade()}>Finalize</button>
        </div>
        <div className={styles.TradeArea__commentArea}></div>
      </div>
    </div>
  );
}
