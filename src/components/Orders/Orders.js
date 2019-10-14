import React, { Component } from 'react';

import Header from '../UI/Header/Header';

import '../Page.css';

class Orders extends Component {
    render() {
        return (
            <div className='Orders Page'>
                <Header heading='Orders' subHeading='Know your past orders'>
                </Header>
            </div>
        );
    }
}

export default Orders;