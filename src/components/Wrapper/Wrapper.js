import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../Login/Login';
import MessageBox from '../UI/MessageBox/MessageBox';

import './Wrapper.css';

class Wrapper extends Component {
    render() {
        let error;
        if (this.props.errorMessage) {
            error = (
                <MessageBox>
                    { this.props.errorMessage }
                </MessageBox>
            )
        }

        let child;
        if ( this.props.loggedIn ) {
            child = (
                <p>User Logged In!</p>
            );
        } else {
            child = (
                <Login />
            );
        }

        return (
            <div className="Wrapper">
                { error }
                { child }
            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        loggedIn: state.auth.loggedIn,
        errorMessage: state.auth.errorMessage
    };
};

export default connect(mapStateToProp)(Wrapper);