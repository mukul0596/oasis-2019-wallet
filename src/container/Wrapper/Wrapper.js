import React, { Component } from 'react';

import Login from '../Login/Login';

import './Wrapper.css';

class Wrapper extends Component {
    render() {
        return (
            <div className="Wrapper">
                <Login />
            </div>
        )
    }
}

export default Wrapper;