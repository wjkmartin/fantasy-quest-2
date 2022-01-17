import React, { useState } from 'react';
import styles from './TradeArea.module.css';

import { useSelector, useDispatch } from 'react-redux';
import itemSlice from '../../../../DataHandlers/redux/slices/items';
import actorSlice from '../../../../DataHandlers/redux/slices/actors';
import { useDrop } from 'react-dnd';

import TradeItem from './TradeItem/TradeItem';
import ItemInfo from './ItemInfo/ItemInfo';
import UISlice from '../../../../DataHandlers/redux/slices/UI';

export default function TradeArea() {
  const itemsById = useSelector((state) => state.items.itemsById);
  const actorsById = useSelector((state) => state.actors.actorsById);

  const actorInTradeById = useSelector((state) => state.items.actorInTradeById);

  const itemsActorCanTrade = itemsById.filter(
    (item) => item.ownerId === actorInTradeById
  );

  const itemTypesActorWillBuy = actorsById[actorInTradeById].willBuyTypes || [];
  const rarityActorWillBuy = (actorsById[actorInTradeById].willBuyRarity === undefined ? 100 : actorsById[actorInTradeById].willBuyRarity);

  const dispatch = useDispatch();

  const [collectedProps, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => {
      if (itemTypesActorWillBuy.includes(itemsById[item.id].type) && itemsById[item.id].rarity >= rarityActorWillBuy) {
        dispatch(itemSlice.actions.addItemToTrade(item.id));
      } else {
        if (actorsById[actorInTradeById].responses?.tradeItemTypeFail) {
          dispatch(UISlice.actions.addMessageToActivityLog({message: `${actorsById[actorInTradeById].actorName}: ${actorsById[actorInTradeById].responses.tradeItemTypeFail}`, styleType: 'italic'}));
        } else {
          dispatch(UISlice.actions.addMessageToActivityLog({message: `${actorsById[actorInTradeById].actorName}: I don't want to buy your ${itemsById[item.id].name.toLowerCase()}.`, styleType: 'italic'}));
        }
      }
    },
  }));

  const itemsPlayerWantsToTradeById = useSelector(
    (state) => state.items.itemsPlayerWantsToTradeById
  );
  const itemsSelectedByPlayerById = useSelector(
    (state) => state.items.itemsSelectedByPlayerById
  );

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = (id) => {
    setIsHovering(id);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  const actorItemsElems = itemsActorCanTrade.map((item) => {
    return (
      <TradeItem
        onClick={() => {
          onClickItem();
        }}
        isSelected={itemsSelectedByPlayerById.includes(item.id)}
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        key={`__ACTOR_TRADE_ITEM__${item.id}`}
        itemId={item.id}
      />
    );
  });

  const actorItemValue = itemsSelectedByPlayerById.reduce((acc, itemId) => {
    return acc + itemsById[itemId].value;
  }, 0);

  const playerItemElems = itemsPlayerWantsToTradeById.map((itemId) => {
    return (
      <TradeItem
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        key={`__PLAYER_TRADE_ITEM__${itemId}`}
        itemId={itemId}
      />
    );
  });

  const playerItemValue = Math.floor(itemsPlayerWantsToTradeById.reduce((acc, itemId) => {
    return acc + itemsById[itemId].value;
  }, 0) * 0.85);

  const balanceOwing = actorItemValue - playerItemValue;

  function finalizeTrade() {
    if (balanceOwing !== 0) {
      if (actorsById[0].gold <= balanceOwing) {
        dispatch(UISlice.actions.addMessageToActivityLog({message: `You don't have enough gold to complete this trade.`, styleType: 'red'}));
      } else {
        dispatch(itemSlice.actions.doTrade());
        dispatch(
          actorSlice.actions.modifyActorAttributeByActorId({
            actorId: 0,
            attribute: 'gold',
            value: -balanceOwing,
          })
        );
      }
    }
  }

  function onClickItem() {
    if (itemsSelectedByPlayerById.includes(isHovering)) {
      dispatch(itemSlice.actions.removeItemFromTrade(isHovering));
    } else {
      dispatch(itemSlice.actions.addItemToTrade(isHovering));
    }
  }

  return (
    <div onMouseOut={handleMouseOut} ref={drop} className={styles.TradeArea}>
      <div className={styles.TradeArea__header}>
        <div className={styles.TradeArea__tradingWithArea}>
          Trading with {actorsById[actorInTradeById].actorName}
        </div>
        <div className={styles.TradeArea__valueArea}>
          <div className={styles.TradeArea__valueArea_value}>
            {'₮'}
            {playerItemValue}
          </div>
          <div className={styles.TradeArea__valueArea_value}>
            {'₮'}
            {actorItemValue}
          </div>
        </div>
      </div>
      <div className={styles.TradeArea__balanceArea}>
        <div className={styles.TradeArea__balanceArea_player}>
          {playerItemElems}
        </div>
        <div className={styles.TradeArea__balanceArea_npc}>
          {actorItemsElems}
        </div>
      </div>
      <div className={styles.TradeArea__buttonArea_commentArea}>
        <ItemInfo itemId={isHovering} />
        <div className={styles.TradeArea__buttonArea}>
          <button onClick={() => finalizeTrade()}>Finalize</button>
          <button onClick={() => {dispatch(itemSlice.actions.cancelTrade()) }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
