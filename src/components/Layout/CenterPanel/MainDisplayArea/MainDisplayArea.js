import React from 'react';

import NpcDisplayArea from './NpcDisplayArea/NpcDisplayArea';
import LocalItemDisplayArea from './LocalItemDisplayArea/LocalItemDisplayArea';

import images from '../../../../Assets/locationImageList';

import { useSelector } from 'react-redux';

import styles from './MainDisplayArea.module.css';

export default function MainDisplayArea(props) {
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );

  const currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );
  
  const currentMap = useSelector((state) => state.locations.map.name);
  let image;

  if (currentLocation.name === 'road') {
    const numberOfImages = images[currentMap].roadImages.length;
    image = images[currentMap].roadImages[Math.floor(Math.random() * (numberOfImages + 1))]
  } else if (currentSubLocation) {
    image = images[currentMap][currentSubLocation.name]
  } else {
    image = images[currentMap][currentLocation?.name]
  }


  return (
    <div className={styles.MainDisplayArea}>
      <div className={styles.MainDisplayArea__header}>
        <NpcDisplayArea currentLocation={currentLocation}/>
        <LocalItemDisplayArea currentLocation={currentLocation}/>
      </div>
      <div className={styles.imageContainer}>
      {image !== undefined ? (
        <img className={styles.mainImage} alt={'location'} src={image} />
      ) : (
        ''
      )}
      </div>
    </div>
  );
}
