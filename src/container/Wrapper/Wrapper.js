import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../Login/Login';

import './Wrapper.css';

class Wrapper extends Component {
    render() {
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
                { child }
            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProp)(Wrapper);