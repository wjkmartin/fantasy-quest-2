import React from "react";

import styles from "./TradeItem.module.css";

import { Popover, OverlayTrigger } from "react-bootstrap";


import { itemColorClass } from "../../../LeftPanel/Notebook/Inventory/util";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../../DataHandlers/redux/actions";

export default function TradeItem(props) {
  const itemsInTrade = useSelector(
    (state) => state.items.itemsPlayerWantsToTradeById
  );
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: { id: props.item.id, type: "itemTrade" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      const itemInTrade = itemsInTrade.includes(item.id);
      if (item && dropResult && itemInTrade) {
        dispatch(actions.removeItemFromActiveTradeWindowById(item.id));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;

  const isSelected = (props.selectedItems ? props.selectedItems.includes(props.item.id) : false)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title id="popover-basic-title" as="h3"><p>{props.item.name}</p><p>{`₮${props.item.value}`}</p></Popover.Title>
      <Popover.Content>
        {props.item.desc}
        <br />
        {`${props.item.descDetails}`}
      </Popover.Content>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="hover" overlay={popover} placement="bottom-start" transition={false}>
      <div
        onClick={props.onClick}
        ref={props.type === "player" ? drag : undefined}
        className={`${styles.TradeItem} ${styles[itemColorClass(props.item.rarity)]} fas ${props.item.icon} fa-2x ${isSelected ? styles.isSelected : ""}`}
      ></div>
    </OverlayTrigger>
  );
}
