import React from 'react';

import NpcDisplayArea from './NpcDisplayArea/NpcDisplayArea';
import LocalItemDisplayArea from './LocalItemDisplayArea/LocalItemDisplayArea';

import * as images from '../../../../Assets/imgList';

import { useSelector } from 'react-redux';

import styles from './MainDisplayArea.module.css';

export default function MainDisplayArea(props) {
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );

  const image = images[currentLocation.name]

  return (
    <div className={styles.MainDisplayArea}>
      <div className={styles.MainDisplayArea__header}>
        <NpcDisplayArea currentLocation={currentLocation}/>
        <LocalItemDisplayArea currentLocation={currentLocation}/>
      </div>
      
      {image !== undefined ? (
        <img className={styles.mainImage} alt={'location'} src={image} />
      ) : (
        ''
      )}
    </div>
  );
}
