import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./MinimapNode.module.css";

function miniMapNode(props) {
  if (props.icon === undefined) {
    return <div className={styles.MinimapNodeEmpty}></div>;
  } else {
    return (
      <FontAwesomeIcon
        className={`${styles.MinimapNode} ${
          props.onClick !== undefined ? styles.clickable : ""
        } ${
          props.isHere === true  ? styles.isHere : ""
        } ${
          props.isHidden === true ? styles.isHidden : ""
        }` }      
        onClick={props.onClick}
        size="lg"
        icon={props.icon}
      />
    );
  }
}

export default miniMapNode;
