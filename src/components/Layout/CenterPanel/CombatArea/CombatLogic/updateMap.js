import React from "react";
import styles from "./gridStyles.module.css";
import styled from "styled-components";

import _ from "underscore";

import CombatAreaSquare from "../CombatAreaSquare/CombatAreaSquare";

export default function updateMap(mapData, actorsInCombatById) {
  const rowLength = mapData.width;
  const CombatSquareStyled = styled(CombatAreaSquare)`
    border: 0.05em solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: ${mapData.heightWidthPerSquare}rem;
    height: ${mapData.heightWidthPerSquare}rem;

    &:hover {
      background-color: lightgrey;
    }
  `;
  let combatMap = [];
  let coords = [0, 0];

  mapData.passableMap.flat().forEach((element, index) => {

    let actorHere = undefined;

    const coord_x = index % rowLength
    const coord_y = Math.floor(index / rowLength)

    coords = [coord_y, coord_x]

    actorsInCombatById.forEach((actor) => {
      if (_.isEqual(actor.coords, coords)) {
        actorHere = actor;
      }
    });

    combatMap.push(
      <CombatSquareStyled
        key={coords}
        coords={coords}
        className={styles.gridSquare}
        actorHere={actorHere !== undefined ? actorHere : undefined}
        actorToken={actorHere !== undefined ? actorHere.token : undefined}
      />
    );
    
  });
  return combatMap;
}
