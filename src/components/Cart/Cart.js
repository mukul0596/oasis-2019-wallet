import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../UI/Header/Header';
import { bindActionCreators } from 'redux'
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, ListSubheader } from '@material-ui/core';
import * as cart from '../../actionCreator/cart';
import Button from '../UI/Button/Button';

import '../Page.css';
import './Cart.css';

class Cart extends Component {

    addButton(vendor_id, id, quantity) {
            return (
                <div className='CounterButtonContainer'>
                    <button 
                        className='CounterButton'
                        onClick={ () => this.decrementQuantity(vendor_id, id) }
                        >-</button>
                    { quantity }
                    <button 
                        className='CounterButton'
                        onClick={ () => this.incrementQuantity(vendor_id, id) }
                        >+</button>
                </div>
            );
    }

    incrementQuantity(vendor_id, item_id) {
        this.props.increaseQty(vendor_id, item_id)
    }

    decrementQuantity(vendor_id, item_id) {
        this.props.decreaseQty(vendor_id, item_id)
    }

    discount(price, current_discount) {
        if(current_discount)
            return <span>₹ {price}</span>
        else {
            return (
                <span style ={{display: 'flex'}}>
                    <strike>₹ {price}</strike>
                    <span className="discount" style={{marginLeft: '10px'}}>₹ {price - current_discount}</span>
                </span>
            )
        }
    }

    isVeg(isVeg) {
        if(isVeg)
            return require('../../assets/images/veg.png')
        else 
            return require('../../assets/images/nonveg.png')
    }

    order(cart, totalPrice) {
        if(Object.keys(cart).length !== 0) {
            return  (
                <List style={{background: '#31365E', padding: '10px', borderRadius: '2px'}}>
                    <ListItem>            
                        <ListItemText className="order" style={{color: '#ffffff'}} primary={'₹ ' + totalPrice} />
                        <ListItemSecondaryAction>
                            <div edge="end">
                                <Button click={(e) => {
                                    e.preventDefault();
                                    this.props.placeOrder();
                                }}>Order</Button>
                            </div>
                        </ListItemSecondaryAction>
                    </ListItem>  
                </List>
            )
        }
    }

    render() {
        console.log(this.props)
        let items = Object.keys(this.props.cart).map((key) => {
            console.log(this.props.cart[key].items)
            return (
                <List key={key} style={{background: '#31365E', padding: '10px', borderRadius: '2px'}} subheader={
                    <ListSubheader disableSticky={true} style={{fontSize: '24px', color: '#ffffff'}} id="header">
                      {this.props.cart[key].stallName}
                    </ListSubheader>
                }>
                    {
                        Object.keys(this.props.cart[key].items).map((newKey) => {
                            return(
                                <ListItem>
                                    <ListItemIcon>
                                        <img src={this.isVeg(this.props.cart[key].items[newKey].isVeg)} alt="" style={{width: '24px'}} />
                                    </ListItemIcon>
                                    <ListItemText key={newKey} className="stallName" style={{color: '#ffffff'}} primary={this.props.cart[key].items[newKey].itemName} secondary={this.discount(this.props.cart[key].items[newKey].price, this.props.cart[key].items[newKey].discount)} />
                                    <ListItemSecondaryAction>
                                        <div edge="end">
                                            {/* <RemoveCircle style={{color: '#ffffff'}} />
                                            <div className="quantity">
                                                {
                                                    (this.props.cart[this.props.activeVendorId] && this.props.cart[this.props.activeVendorId].items[item.id]) ?
                                                        this.props.cart[this.props.activeVendorId].items[item.id].quantity : 0
                                                }
                                            </div>
                                            <AddCircle style={{color: '#ffffff'}} /> */}
                                            {this.addButton(key, newKey, this.props.cart[key].items[newKey].quantity)}
                                        </div>
                                    </ListItemSecondaryAction>
                                </ListItem>  
                            )
                        })
                    }
                </List>
            )
        })

        return (
            <div className='Cart Page'>
                <Header heading='Cart' subHeading='Know your current orders'>
                </Header>
                {items}
                {this.order(this.props.cart, this.props.totalPrice)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.carts.cart,
    totalItems: state.carts.totalItems,
    totalPrice: state.carts.totalPrice
})

const mapDispatchToProps = dispatch => {
    const action = bindActionCreators(Object.assign({}, cart), dispatch);
    return {
        ...action, 
        changeActiveTab: (activeTab) => dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);