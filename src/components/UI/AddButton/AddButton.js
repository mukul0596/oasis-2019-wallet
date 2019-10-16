import React, { Component } from 'react';

import './AddButton.css';

class AddButton extends Component {
    state = {
        buttonState: 'Add',
        counter: 0
    }

    addButtonClickHandler(callFunc) {
        this.setState({ buttonState: 'Counter', counter: 1 });
        callFunc();
    }

    counterButtonClickHandler(callFunc, type) {
        if (type === 'Subtract') {
            if (this.state.counter === 1)
                this.setState({ buttonState: 'Add', counter: 0 });
            else
            this.setState({ counter: this.state.counter - 1 });
        }
        if (type === 'Add') {
            this.setState({ counter: this.state.counter + 1 });
        }
        callFunc();
    }

    render () {
        let buttonElem;
        if (this.state.buttonState === 'Add') {
            buttonElem = (
                <button 
                    className='AddButton'
                    onClick={ () => this.addButtonClickHandler(this.props.click) }
                    disabled={ this.props.disabled }
                    style={ this.props.style }>ADD +</button>
            );
        }
        if (this.state.buttonState === 'Counter') {
            buttonElem = (
                <div className='CounterButtonContainer'>
                    <button 
                        className='CounterButton'
                        onClick={ () => this.counterButtonClickHandler(this.props.click, 'Subtract') }
                        disabled={ this.props.disabled }
                        style={ this.props.style }>-</button>
                    { this.state.counter }
                    <button 
                        className='CounterButton'
                        onClick={ () => this.counterButtonClickHandler(this.props.click, 'Add') }
                        disabled={ this.props.disabled }
                        style={ this.props.style }>+</button>
                </div>
            );
        }
        return buttonElem;
    }
}

export default AddButton;