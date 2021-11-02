import React from 'react';

import NpcDisplayArea from './NpcDisplayArea/NpcDisplayArea';
import LocalItemDisplayArea from './LocalItemDisplayArea/LocalItemDisplayArea';

import { useSelector, useDispatch } from 'react-redux';
import UI from '../../../../DataHandlers/redux/slices/UI'
import styles from './MainDisplayArea.module.css';

export default function MainDisplayArea(props) {
  const dispatch = useDispatch();
  const currentLocation = useSelector(
    (state) => state.locations.currentLocation
  );
  
  dispatch(UI.actions.setMainImage(currentLocation.name));
  const image = useSelector((state) => state.UI.mainImage);

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
