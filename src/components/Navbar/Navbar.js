import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrdersIcon from './NavbarIcons/OrdersIcon';
import ProfileIcon from './NavbarIcons/ProfileIcon';
import StallsIcon from './NavbarIcons/StallsIcon';
import CartIcon from './NavbarIcons/CartIcon';

import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <div className={ (this.props.activeTab === 'Profile') ? 'active' : null } onClick={() => this.props.changeActiveTab('Profile') }><ProfileIcon /></div>
                <div className={ (this.props.activeTab === 'Stalls') ? 'active' : null } onClick={() => this.props.changeActiveTab('Stalls') }><StallsIcon /></div>
                <div className={ (this.props.activeTab === 'Cart') ? 'active' : null } onClick={() => this.props.changeActiveTab('Cart') }><CartIcon /></div>
                <div className={ (this.props.activeTab === 'Orders') ? 'active' : null } onClick={() => this.props.changeActiveTab('Orders') }><OrdersIcon /></div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        activeTab: state.activeTab.activeTab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeActiveTab: (activeTab) => dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab })
    };
};

export default connect(mapStateToProp, mapDispatchToProps)(Navbar);