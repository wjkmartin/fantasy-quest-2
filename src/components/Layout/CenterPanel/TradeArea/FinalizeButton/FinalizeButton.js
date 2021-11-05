import React from 'react'
import styles from './FinalizeButton.module.css'

import { useSelector, useDispatch } from 'react-redux'

import actor from '../../../../../DataHandlers/redux/slices/actors';

export default function FinalizeButton(props) {
    let dispatch = useDispatch()
    const player = useSelector(state => state.actors.actorsById[0])

    function onClickButton(props) {
        if (player.gold >= (props.balance * -1)) {
            dispatch(actor.actions.setActorAttributeByActorId({actorId: 0, attribute: 'gold', value: player.gold + props.balance}))

            // props.itemsToSendById.forEach(itemId => {
            //     dispatch(actions.tradeItemByIdFromActorToActorByIds(itemId, 0, props.actorInTradeId))
            // })

            // props.itemsToRecieveById.forEach(itemId => {
            //     dispatch(actions.tradeItemByIdFromActorToActorByIds(itemId, props.actorInTradeId, 0))
            // })
            
            // dispatch(actions.finalizeTrade())

        } else alert('cant do it mon')
        
    }

    return (
        <button onClick={() => onClickButton(props)} className={styles.FinalizeButton}>Finalize trade</button>
    )
}