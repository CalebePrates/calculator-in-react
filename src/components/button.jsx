import React from 'react'
import './button.css'

export default props => 
    <button 
    onClick={e => props.click && props.click(props.label)}
    className={`
        button-calc
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double' : ''}
        ${props.triple ? 'triple' : ''}
    `}>
        {props.label}
    </button>