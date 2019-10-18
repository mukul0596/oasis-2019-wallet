import React, { Component } from 'react';
import * as cart from '../../actionCreator/cart';
import Header from '../UI/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, ListSubheader } from '@material-ui/core';
import '../Page.css';
import './StallItem.css';
import Loader from '../Loader/loader';

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
        this.props.addNewItemToCart(this.props.activeVendor, item.vendor_id, item.name, item.id, item.price, item.is_veg, item.current_discount)
    }

    incrementQuantity(item) {
        this.props.increaseQty(item.vendor_id, item.id)
    }

    decrementQuantity(item) {
        this.props.decreaseQty(item.vendor_id, item.id)
    }

    isVeg(item) {
        if(item.is_veg)
            return require('../../assets/images/veg.png')
        else 
            return require('../../assets/images/nonveg.png')
    }

    discount(item) {
        if(item.current_discount)
            return <span>₹ {item.price}</span>
        else {
            return (
                <span style ={{display: 'flex'}}>
                    <strike>₹ {item.price}</strike>
                    <span className="discount" style={{marginLeft: '10px'}}>₹ {item.price - item.current_discount}</span>
                </span>
            )
        }
    }

    render() {
        let items, k = 0, des = [], loader, back;
        let desc = [];
        console.log((!this.props.menu || !this.props.activeVendor || !this.props.activeVendorId || !this.props.cart) || this.props.isLoading)
        if(this.props.isLoading && Object.keys(this.props.menu).length === 0) {
            loader = <Loader style={{height: '80%'}} />;
            back = [];
        }
        else { 
            loader = [];
            back = <i className="fa fa-arrow-left" onClick={() => this.props.changeActiveTab('Stalls')}/>;
        }
        console.log(this.props)
        if ((!this.props.menu || !this.props.activeVendor || !this.props.activeVendorId || !this.props.cart) || this.props.isLoading) items = [];
        else {
            let availableItems = this.props.menu.filter(({ is_available }) => is_available);
            availableItems.map((item) => {
                if(des.indexOf(item.description) === -1){
                    des.push(item.description)
                    desc[k] = [];
                    desc[k++].push(item)
                }
                else {
                    desc[des.indexOf(item.description)].push(item)
                }
                return '';
            })

            items = Object.keys(desc).map((key) => {
                return (
                    <List key={des[key]} style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} subheader={
                        <ListSubheader disableSticky={true} style={{fontSize: '24px', color: '#ffffff'}} id="header">
                          {des[key]}
                        </ListSubheader>
                    }>
                     {
                        desc[key].map((item) => {
                            return (
                                <ListItem>
                                    <ListItemIcon>
                                        <img src={this.isVeg(item)} alt="" style={{width: '24px'}} />
                                    </ListItemIcon>
                                    <ListItemText key={item.id} className="stallName" style={{color: '#ffffff'}} primary={item.name} secondary={this.discount(item)} />
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
                    {back}
                </Header>
                {loader}
                {items}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    const action = bindActionCreators(Object.assign({}, cart), dispatch);
    return {
        ...action, 
        changeActiveTab: (activeTab) => dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab })
    }
};

const mapStateToProps = state => ({
    menu: state.stall.menu,
    activeVendor: state.stall.activeVendor,
    activeVendorId: state.stall.activeVendorId,
    cart: state.carts.cart,
    isLoading: state.loader.isLoading

})


export default connect(mapStateToProps, mapDispatchToProps)(StallItem);