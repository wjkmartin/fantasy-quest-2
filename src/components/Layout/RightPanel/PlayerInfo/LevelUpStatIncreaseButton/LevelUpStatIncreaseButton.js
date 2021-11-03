import React from "react";
import { useDispatch } from "react-redux";
import actors from "../../../../../DataHandlers/redux/slices/actors";
import styles from './LevelUpStatIncreaseButton.module.css'

const LevelUpStatIncreaseButton = (props) => {
    const dispatch = useDispatch()
    function click() {
        dispatch(actors.actions.modifyActorAttributeByActorId({actorId: 0, attribute: 'levelsUpAvailable', value: -1}))
        dispatch(actors.actions.modifyActorAttributeByActorId({actorId: 0, attribute: props.stat, value: 1}))
    }
    return (<div className={styles.LevelUpStatIncreaseButton} onClick={() => click()}>+</div>)
}

export default LevelUpStatIncreaseButton;