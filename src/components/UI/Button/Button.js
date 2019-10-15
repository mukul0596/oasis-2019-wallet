import React from 'react';

import './Button.css';

const button = (props) => (
    <button 
        className='Button'
        onClick={ props.click }
        disabled={ props.disabled }
        style={ props.style }>{ props.children }</button>
)

export default button;