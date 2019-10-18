import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrdersIcon from './NavbarIcons/OrdersIcon';
import ProfileIcon from './NavbarIcons/ProfileIcon';
import StallsIcon from './NavbarIcons/StallsIcon';
import CartIcon from './NavbarIcons/CartIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MoreIcon from './NavbarIcons/MoreIcon';

import './Navbar.css';

class Navbar extends Component {
    render() {
        console.log(this.props)
        if(this.props.activeTab === 'MenuItem' && this.props.totalItems > 0){
            let items = this.props.totalItems > 1 ? `${this.props.totalItems} Items` : `${this.props.totalItems} Item`; 
            
            return (
                <div className='Navbar'>
                    <div className="quantityPrice">
                        <div className="quantity">{items}</div>
                        <div className="price">&#8377; {this.props.totalPrice}</div>
                    </div>
                    <div className="viewCart" onClick={(e) => {
                            e.preventDefault();
                            this.props.changeActiveTab('Cart')
                        }}>
                            <div className="view">View Cart</div> 
                            <ArrowForwardIcon />
                    </div>
                </div>
            );
        }
        else if(this.props.activeTab === 'Contact' || this.props.activeTab === 'Developer' || this.props.activeTab === 'KindStore') {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div className='Navbar'>
                    <div className={ (this.props.activeTab === 'Profile') ? 'active' : null } onClick={() => this.props.changeActiveTab('Profile') }><ProfileIcon /></div>
                    <div className={ (this.props.activeTab === 'Stalls' || this.props.activeTab === 'MenuItem') ? 'active' : null } onClick={() => this.props.changeActiveTab('Stalls') }><StallsIcon /></div>
                    <div className={ (this.props.activeTab === 'Cart') ? 'active' : null } onClick={() => this.props.changeActiveTab('Cart') }><CartIcon /></div>
                    <div className={ (this.props.activeTab === 'Orders') ? 'active' : null } onClick={() => this.props.changeActiveTab('Orders') }><OrdersIcon /></div>
                    <div className={ (this.props.activeTab === 'More' || this.props.activeTab === 'KindStore' || this.props.activeTab === 'Contact' || this.props.activeTab === 'Developers') ? 'active' : null } onClick={() => this.props.changeActiveTab('More') }><MoreIcon /></div>
                </div>
            )
        }
        
    }
}

const mapStateToProp = state => {
    return {
        activeTab: state.activeTab.activeTab,
        cart: state.carts.cart,
        totalItems: state.carts.totalItems,
        totalPrice: state.carts.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeActiveTab: (activeTab) => dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab })
    };
};

export default connect(mapStateToProp, mapDispatchToProps)(Navbar);