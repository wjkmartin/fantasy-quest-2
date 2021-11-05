import React from 'react';

import {useDispatch} from 'react-redux'
import itemSlice from '../../../../../DataHandlers/redux/slices/items';

export default function TradeButton(props) {
    let dispatch = useDispatch()

    function handleClick() {
        dispatch(itemSlice.actions.startTradeWithActor(props.activeActor.id))
    }

    return (
        <button onClick={() => handleClick()} className={props.className}>Trade</button>
    )
}