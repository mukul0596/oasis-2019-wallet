import React, { Component } from 'react';

import OrdersIcon from './NavbarIcons/OrdersIcon';
import ProfileIcon from './NavbarIcons/ProfileIcon';
import StallsIcon from './NavbarIcons/StallsIcon';
import CartIcon from './NavbarIcons/CartIcon';

import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <div className='profileIcon active'><ProfileIcon /></div>
                <div className='stallsIcon'><StallsIcon /></div>
                <div className='cartIcon'><CartIcon /></div>
                <div className='ordersIcon'><OrdersIcon /></div>
            </div>
        );
    }
}

export default Navbar;