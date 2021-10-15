import React from "react";
import { useDispatch } from "react-redux";
import actions from "../../../../../DataHandlers/redux/actions";
import styles from './LevelUpStatIncreaseButton.module.css'

const LevelUpStatIncreaseButton = (props) => {
    const dispatch = useDispatch()
    function click() {
        dispatch(actions.modifyActorAttributeByActorId(0, 'levelsUpAvailable', -1))
        dispatch(actions.modifyActorAttributeByActorId(0, props.stat, 1))
    }
    return (<div className={styles.LevelUpStatIncreaseButton} onClick={() => click()}>+</div>)
}

export default LevelUpStatIncreaseButton;