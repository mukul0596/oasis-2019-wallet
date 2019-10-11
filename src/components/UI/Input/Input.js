import React from 'react';

import "./Input.css";

const input = (props) => {
    let label = props.children;

    const otherProps = {
        ...props
    }

    delete otherProps.children;
    delete otherProps.dangerouslySetInnerHTML;

    switch(props.type) {
        case ( 'textarea' ):
            delete otherProps.type;
            return <textarea className='Input' {...otherProps} />;
            break;
        case ( null || undefined ): 
            return null;
            break;
        case ( 'select' ):
            const options = props.options;
            delete otherProps.options;
            return (
                <select className='Input' {...otherProps}>
                    { options.map(option => (
                        <option value={ option.value } key={ option.value }>{ option.displayValue }</option>
                    )) }
                </select>
            );
            break;
        default: {
            return <input className='Input' {...otherProps} />;
        }
    }
}

export default input;