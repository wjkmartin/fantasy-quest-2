import React from "react";

import NpcDisplayArea from "./NpcDisplayArea/NpcDisplayArea";

import { useSelector } from "react-redux";
import styles from "./MainDisplayArea.module.css"

import * as images from '../../../../Assets/imgList';

export default function MainDisplayArea(props) {

  const image = useSelector((state) => state.UI.mainImage);
 

  return (
    <div className={styles.MainDisplayArea}>
      <NpcDisplayArea />
      <img className={styles.mainImage} src={image} />
    </div>
  );
}
