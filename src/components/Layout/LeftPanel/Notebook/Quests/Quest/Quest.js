import React from 'react'
import styles from './Quest.module.css'

export default function Quest(props) {
    const {questData, stage} = props;

    return (
        <div className={styles.Quest}>
            <p className={styles.Quest__title}>{questData.title}</p>
            <p className={styles.Quest__body}>{questData[props.stage]}</p>
        </div>
    )
}