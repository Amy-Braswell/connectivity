import React from 'react'
import './Tooltip.css'

export default function Tooltip(props) {
    return(
        <span className='Tooltip'>
            <span 
                className ='Tooltip-content'
                style={{ color: props.color }}
            >
                {props.children}
            </span>
            <div className='Tooltip-message'
                 style={{ top: props.top, left: props.left}}      
            >
                {props.message}
            </div>
        </span>
    )
}