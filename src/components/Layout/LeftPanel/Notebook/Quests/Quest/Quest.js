import React from 'react'
import styles from './Quest.module.css'

export default function Quest(props) {

    return (
        <div className={styles.Quest}>
            <p className={styles.Quest__title}>{props.questData.title}</p>
            <p className={styles.Quest__body}>{props.questData[props.stage]}</p>
        </div>
    )
}