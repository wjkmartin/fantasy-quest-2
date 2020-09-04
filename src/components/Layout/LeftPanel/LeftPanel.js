import React from 'react';
import styles from './LeftPanel.module.css'

import Notebook from './Notebook/Notebook'
import PlaceTime from './PlaceTime/PlaceTime';
import Minimap from './Minimap/Minimap'

const leftPanel = (props) => (
    <div className={props.className}>
        <Notebook className={styles.NoteBook}/>
        <PlaceTime />
        <Minimap />
    </div>
);

export default leftPanel