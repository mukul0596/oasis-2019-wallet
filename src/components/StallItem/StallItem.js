import React, { Component } from 'react';
import * as stall from '../../actionCreator/stalls';
import Header from '../UI/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, Typography, ListSubheader } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import '../Page.css';
import './StallItem.css';

class StallItem extends Component {
   render() {
        let items, k = 0, des = [];
        let desc = [];
        console.log(this.props)
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
            k = 0;
            console.log(desc[0])
            let items = Object.keys(desc).map((key) => {
                {console.log(desc[key])}
                return (
                    <List key={key} style={{background: '#31365E', padding: '10px', marginBottom: '10px', borderRadius: '12px'}} subheader={
                        <ListSubheader disableSticky={true} style={{fontSize: '24px', color: '#ffffff'}} id="header">
                          {des[key]}
                        </ListSubheader>
                    }>
                     {
                        desc[key].map((item) => {
                            return (
                                <ListItem>
                                    <ListItemText key={item.id} className="stallName" style={{color: '#ffffff'}} primary={item.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end">
                                            <RemoveCircle style={{color: '#ffffff'}} />
                                            <div className="quantity">
                                                {
                                                    (this.props.cart[this.props.activeVendorId] && this.props.cart[this.props.activeVendorId].items[item.id]) ?
                                                        this.props.cart[this.props.activeVendorId].items[item.id].quantity : 0
                                                }
                                            </div>
                                            <AddCircle style={{color: '#ffffff'}} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                  </List>
                )
              })
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
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(Object.assign({}, stall), dispatch);
};

const mapStateToProps = state => ({
    menu: state.stall.menu,
    activeVendor: state.stall.activeVendor,
    activeVendorId: state.stall.activeVendorId,
    cart: state.stall.cart

})


export default connect(mapStateToProps, mapDispatchToProps)(StallItem);