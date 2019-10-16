import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrdersIcon from './NavbarIcons/OrdersIcon';
import ProfileIcon from './NavbarIcons/ProfileIcon';
import StallsIcon from './NavbarIcons/StallsIcon';
import CartIcon from './NavbarIcons/CartIcon';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './Navbar.css';

class Navbar extends Component {
    render() {
        console.log(this.props)
        if(this.props.activeTab != 'MenuItem'){
            return (
                <div className='Navbar'>
                    <div className={ (this.props.activeTab === 'Profile') ? 'active' : null } onClick={() => this.props.changeActiveTab('Profile') }><ProfileIcon /></div>
                    <div className={ (this.props.activeTab === 'Stalls') ? 'active' : null } onClick={() => this.props.changeActiveTab('Stalls') }><StallsIcon /></div>
                    <div className={ (this.props.activeTab === 'Cart') ? 'active' : null } onClick={() => this.props.changeActiveTab('Cart') }><CartIcon /></div>
                    <div className={ (this.props.activeTab === 'Orders') ? 'active' : null } onClick={() => this.props.changeActiveTab('Orders') }><OrdersIcon /></div>
                </div>
            );
        }
        else if(this.props.totalItems > 0) {
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
            )
        }
        else {
            return (
                <div></div>
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