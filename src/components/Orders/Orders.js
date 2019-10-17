import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'request';

import firestore from '../../firestore/Firestore';
import * as api from '../../constants/api';

import Header from '../UI/Header/Header';
import handleResponse from '../../utils/handleResponse';
import Aux from '../hoc/Aux/Aux';
import { bindActionCreators } from 'redux'

import * as loader from '../../actionCreator/loader';

import '../Page.css';
import './Orders.css';
import Loader from '../Loader/loader';

class Orders extends Component {
    componentDidMount() {
    this.props.showLoader();
    request({
            method: 'GET',
            url: api.GET_ORDERS,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'JWT '+this.props.jwt_token
            }
        }, (error, response, body) => {
            handleResponse(error, response, body, () => {
                try {
                    body = JSON.parse(body)
                    console.log(body)
                    this.props.updateOrders(body);
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }
    render() {
        console.log(this.props.orders)
            let orders;
            let loader;
            if(this.props.isLoading && !this.props.orders) loader = <Loader style={{height: '80%'}} />
            else loader = [];
        if (this.props.orders) {
            orders = this.props.orders.map(order => {
                return order.orders.map(ord => {
                    return (
                        <div className='OrdersCard' key={ ord['order-id'] }>
                            <div className='OrderName'>{ ord.vendor.name }</div>
                            <div className='OrderDetail'>
                                <div className='OrderId'>Order ID: #{ ord['order-id'] }</div>
                                <div className='OrderPrice'>&#8377; { ord.price }</div>
                            </div>
                            <div className='OrderProgress'>
                                <div className={(ord.status == 2 && ord.status == 3) ? 'OrderOTP' : null}>{ (ord.status == 2 && ord.status == 3) ? 'OTP: ' + ord.otp : ' ' }</div>
                                <div className={['OrderStatus', ('st' + ord.status)].join(' ')}>
                                    { (ord.status == 0) ? 'Pending' : (ord.status == 1) ? 'Accepted' : (ord.status == 2) ? 'Ready' : (ord.status == 3) ? 'Finished' : 'Declined'}
                                </div>
                            </div>
                        </div>
                    )
                });
            });
        }

        return (
            <div className='Orders Page'>
                <Header heading='Orders' subHeading='Know your past orders'>
                </Header>
                {loader}
                <div className='OrdersContainer'>
                    { orders }
                </div>
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        orders: state.orders.orders,
        jwt_token: state.auth.jwt_token,
        isLoading : state.loader.isLoading
    };
};

const mapDispatchToProp = dispatch => {
    const action = bindActionCreators(Object.assign({}, loader), dispatch);
    return {
        ...action,
        updateOrders: (orders) => dispatch({ type: 'UPDATE_ORDERS', orders })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Orders);