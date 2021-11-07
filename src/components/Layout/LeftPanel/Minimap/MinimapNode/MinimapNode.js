import React from "react";

import styles from "./MinimapNode.module.css";

function miniMapNode(props) {
  if (props.icon === undefined) {
    return <div className={styles.MinimapNodeEmpty}></div>;
  } else {
    return (
      <i
        className={`${styles.MinimapNode} ${
          props.onClick !== undefined ? styles.clickable : ""
        } ${
          props.isHere === true  ? styles.isHere : ""
        } ${
          props.isHidden === true ? styles.isHidden : ""
        } fas fa-${props.icon}`}      
        onClick={props.onClick}
      />
    );
  }
}

export default miniMapNode;
