import React from "react";
import styles from "./Layout.module.css";

import LeftPanel from "./LeftPanel/LeftPanel";
import CenterPanel from "./CenterPanel/CenterPanel";
import RightPanel from "./RightPanel/RightPanel";

import { DndProvider } from "react-dnd"; //provides drag and drop context
import { HTML5Backend } from "react-dnd-html5-backend";

const layout = (props) => (
  <div className={styles.Layout}>
    <DndProvider backend={HTML5Backend}> 
      <LeftPanel className={styles.LeftPanel} worldState={props.worldState} />
      <CenterPanel
        className={styles.CenterPanel}
        worldState={props.worldState}
      />
      <RightPanel worldState={props.worldState} className={styles.RightPanel} />
    </DndProvider>
  </div>
);

export default layout;
