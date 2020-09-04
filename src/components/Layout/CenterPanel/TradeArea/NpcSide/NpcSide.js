import React from 'react'

export default function NpcSide(props) {
    return (<div className={props.className}> {props.items.map(e => e)} </div> )
}