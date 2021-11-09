import React from 'react';
import styles from './Layout.module.css';

import LeftPanel from './LeftPanel/LeftPanel';
import CenterPanel from './CenterPanel/CenterPanel';
import RightPanel from './RightPanel/RightPanel';

import { DndProvider } from 'react-dnd'; //provides drag and drop context
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useSelector } from 'react-redux';

import images from '../../Assets/locationImageList'

const Layout = (props) => {
  const mapName = useSelector((state) => state.locations.map.name);
  const background = images[mapName].bg;
  return (
    <div className={styles.Layout} style={{backgroundImage: `url(${background})`}}>
      <DndProvider backend={HTML5Backend}>
        <LeftPanel className={styles.LeftPanel} worldState={props.worldState} />
        <CenterPanel
          className={styles.CenterPanel}
          worldState={props.worldState}
        />
        <RightPanel
          worldState={props.worldState}
          className={styles.RightPanel}
        />
      </DndProvider>
    </div>
  );
};

export default Layout;
