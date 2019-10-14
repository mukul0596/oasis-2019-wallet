import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../Profile/Profile';
import Stalls from '../Stalls/Stalls';
import Cart from '../Cart/Cart';
import Orders from '../Orders/Orders';

class PageConatiner extends Component {
    render() {
        let activePage;
        switch (this.props.activeTab) {
            case 'Profile':
                activePage = <Profile />
                break;
        
            case 'Stalls':
                activePage = <Stalls />
                break;
        
            case 'Cart':
                activePage = <Cart />
                break;
        
            case 'Orders':
                activePage = <Orders />
                break;
        
            default:
                activePage = null;
                break;
        }
        return activePage;
    }
}

const mapStateToProp = state => {
    return {
        activeTab: state.activeTab.activeTab
    };
};

export default connect(mapStateToProp)(PageConatiner);