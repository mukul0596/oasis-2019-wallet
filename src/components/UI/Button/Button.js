import React from 'react';

import './Button.css';

const button = (props) => (
    <button 
        className='Button'
        onClick={ props.click }
        disabled={ props.disabled }>{ props.children }</button>
)

export default button;