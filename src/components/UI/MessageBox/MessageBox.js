import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MessageBox.css';

class MessageBox extends Component {
    render() {
        return (
            <div className="MessageBox">
                <i className="fa fa-close CloseButton" onClick={ this.props.closeError }></i>
                { this.props.children }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeError: () => {
            document.getElementsByClassName('MessageBox')[0].style.animation = 'slideOut 0.5s ease 1 forwards'
            setTimeout(() => {
                dispatch({ type: 'CLOSE_ERROR' });
            }, 500);
        }
    };
};

export default connect(null, mapDispatchToProps)(MessageBox);