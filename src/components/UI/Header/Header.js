import React from 'react';

import './Header.css';

const header = (props) => {
    return (
        <header className='Header'>
            <div className='Heading'>{ props.heading }</div>
            <div className='SubHeading'>{ props.subHeading }</div>
            { props.children }
        </header>
    );
}

export default header;