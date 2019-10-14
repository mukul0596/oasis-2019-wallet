import React, { Component } from 'react';

import Header from '../UI/Header/Header';

import '../Page.css';

class Stalls extends Component {
    render() {
        return (
            <div className='Stalls Page'>
                <Header heading='Stalls' subHeading='Order food using wallet'>
                    <i class="fa fa-search SearchIcon"></i>
                </Header>
            </div>
        );
    }
}

export default Stalls;