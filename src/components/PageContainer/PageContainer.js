import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../Profile/Profile';
import Stalls from '../Stalls/Stalls';
import Cart from '../Cart/Cart';
import Orders from '../Orders/Orders';
import StallItem from '../StallItem/StallItem';
import More from '../More/More';
import Contact from '../Contact/Contact';
import KindStore from '../KindStore/KindStore';
import Developer from '../Developer/Developer';

class PageConatiner extends Component {
    render() {
        let activePage;
        console.log(this.props.activeTab)
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
            case 'MenuItem':
                activePage = <StallItem />
                break;

            case 'More':
                activePage = <More />
                break;
            
            case 'Contact':
                activePage = <Contact />
                break;
            
            case 'KindStore':
                activePage = <KindStore />
                break;

            case 'Developers': 
                activePage = <Developer />
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