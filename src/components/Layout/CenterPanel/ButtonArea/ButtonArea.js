import React from "react";

import styles from './ButtonArea.module.css'

import { useSelector } from "react-redux";
import LocationButton from "./LocationButton/LocationButton";

export default function ButtonArea() {
  let currentLocation = useSelector((state) => state.locations.currentLocation);
  let currentSubLocation = useSelector(
    (state) => state.locations.currentSubLocation
  );
  let buttons = [];

  if (currentSubLocation) {
    buttons = currentSubLocation.buttons.map((elem) => {
      const label = Object.keys(elem)[0];
      const action = Object.values(elem)[0];

      return (
        <LocationButton
          currentLocation={currentSubLocation}
          action={action}
          label={label}
        />
      );
    });
  } else if (currentLocation.buttons !== undefined && !currentSubLocation) {
    buttons = currentLocation.buttons.map((elem) => {
      const label = Object.keys(elem)[0];
      const action = Object.values(elem)[0];

      return (
        <LocationButton
          currentLocation={currentLocation}
          action={action}
          label={label}
        />
      );
    });
  }

return <div className={styles.ButtonArea}>{buttons}</div>;
}
