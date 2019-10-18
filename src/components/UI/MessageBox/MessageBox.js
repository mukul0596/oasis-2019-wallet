import React, { Component } from 'react';
import { connect } from 'react-redux';

import './MessageBox.css';

class MessageBox extends Component {
    render() {
        return (
            <div className="MessageBox">
                <i className="fa fa-close CloseButton" onClick={ this.props.closeMessage }></i>
                <div dangerouslySetInnerHTML={{ __html: this.props.children }}></div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeMessage: () => {
            document.getElementsByClassName('MessageBox')[0].style.animation = 'slideOut 0.5s ease 1 forwards'
            setTimeout(() => {
                dispatch({ type: 'CLOSE_MESSAGE' });
            }, 500);
        }
    };
};

export default connect(null, mapDispatchToProps)(MessageBox);