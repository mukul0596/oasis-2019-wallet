import React, { Component } from 'react';
import * as cart from '../../actionCreator/cart';
import Header from '../UI/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, Typography, ListSubheader } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import '../Page.css';
import './StallItem.css';

class StallItem extends Component {

    addButton(item) {
        if (!this.props.cart[this.props.activeVendorId] || !this.props.cart[this.props.activeVendorId].items[item.id]) {
            return (
                <button 
                    className='AddButton'
                    onClick={ () => this.addNewItem(item) }
                    >ADD +</button>
            );
        }
        else {
            return (
                <div className='CounterButtonContainer'>
                    <button 
                        className='CounterButton'
                        onClick={ () => this.decrementQuantity(item) }
                        >-</button>
                    { this.props.cart[this.props.activeVendorId].items[item.id].quantity }
                    <button 
                        className='CounterButton'
                        onClick={ () => this.incrementQuantity(item) }
                        >+</button>
                </div>
            );
        }
    }

    addNewItem(item) {
        console.log(item)
        this.props.addNewItemToCart(this.props.activeVendor, item.vendor_id, item.name, item.id, item.price)
    }

    incrementQuantity(item) {
        this.props.increaseQty(item.vendor_id, item.id)
    }

    decrementQuantity(item) {
        this.props.decreaseQty(item.vendor_id, item.id)
    }

    render() {
        let items, k = 0, des = [];
        let desc = [];
        console.log(this.props.cart)
        if (!this.props.menu || !this.props.activeVendor || !this.props.activeVendorId || !this.props.cart) items = [];
        else {
            let availableItems = this.props.menu.filter(({ is_available }) => is_available);
            availableItems.map((item) => {
                if(des.indexOf(item.description) == -1){
                    des.push(item.description)
                    desc[k] = [];
                    desc[k++].push(item)
                }
                else {
                    desc[des.indexOf(item.description)].push(item)
                }
            })

            items = Object.keys(desc).map((key) => {
                {console.log(desc[key])}
                return (
                    <List key={des[key]} style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} subheader={
                        <ListSubheader disableSticky={true} style={{fontSize: '24px', color: '#ffffff'}} id="header">
                          {des[key]}
                        </ListSubheader>
                    }>
                     {
                        desc[key].map((item) => {
                            {console.log(item.id)}
                            return (
                                <ListItem>
                                    <ListItemText key={item.id} className="stallName" style={{color: '#ffffff'}} primary={item.name} />
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
                                            {this.addButton(item)}
                                        </div>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                  </List>
                )
              })
        }
        return(
            <div className="stallMenu Page">
                <Header heading={this.props.activeVendor}>
                    <i className="fa fa-search SearchIcon"></i>
                </Header>
                {items}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({}, cart), dispatch);
};

const mapStateToProps = state => ({
    menu: state.stall.menu,
    activeVendor: state.stall.activeVendor,
    activeVendorId: state.stall.activeVendorId,
    cart: state.carts.cart

})


export default connect(mapStateToProps, mapDispatchToProps)(StallItem);