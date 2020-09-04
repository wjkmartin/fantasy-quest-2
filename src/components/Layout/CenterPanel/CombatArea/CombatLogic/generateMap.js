import React from 'react'
import styles from './gridStyles.module.css'

import CombatAreaSquare from '../CombatAreaSquare/CombatAreaSquare'


export default function generateMapFromData(mapData) {
    const rowLength = Math.sqrt(mapData.flat().length)
    let combatMap = [];
    let coords = [0, 0];
  
    mapData.flat().forEach((element) => {
      const coord = Object.assign([], coords);
      
      if (element) {
        combatMap.push(
          <CombatAreaSquare key={coord} coords={coord} className={styles.gridSquare} />
        );
      } else {
        combatMap.push(<CombatAreaSquare key={coord} coords={coord} className={styles.gridSquareImpassable} />);
      }
  
      if (coords[1] < rowLength - 1) {
          coords[1] += 1;
      }
      else {
          coords[0] += 1;
          coords[1] = 0;
      }
    });
    return combatMap;
  };