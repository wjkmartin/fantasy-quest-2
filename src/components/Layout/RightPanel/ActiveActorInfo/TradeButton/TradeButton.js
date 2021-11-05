import React from 'react';

import {useDispatch} from 'react-redux'


export default function TradeButton(props) {
    let dispatch = useDispatch()

    function handleClick() {
        // dispatch(actions.startTradeWithActorById(props.activeActor.id))
    }

    return (
        <button onClick={() => handleClick()} className={props.className}>Trade</button>
    )
}