import React from 'react';
import { useSelector } from 'react-redux'

import styles from './TextDisplayArea.module.css'

function TextDisplayArea() {
    let currentLocation = useSelector(state => state.locations.currentLocation)
    let currentSubLocation = useSelector(state => state.locations.currentSubLocation)

    const defaultView = <p className={styles.TextDisplayArea}>{(currentSubLocation ? currentSubLocation.description1 : currentLocation.description1)}</p>
    return (
        defaultView
    )
    

}

export default TextDisplayArea;