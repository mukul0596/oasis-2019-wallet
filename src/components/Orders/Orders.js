import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'request';

import firestore from '../../firestore/Firestore';
import * as api from '../../constants/api';

import Header from '../UI/Header/Header';
import handleResponse from '../../utils/handleResponse';
import { bindActionCreators } from 'redux'

import * as loader from '../../actionCreator/loader';

import '../Page.css';
import './Orders.css';
import Loader from '../Loader/loader';

class Orders extends Component {
    componentDidMount() {
    this.props.showLoader();

    firestore.collection('orders').where("userid", "==", this.props.userId).onSnapshot((querySnapshot) => {
        let realtimeOrders = {};
        querySnapshot.forEach(doc => {
            realtimeOrders[doc._key.path.segments[6]] = doc.data();
        });
        console.log("Yahah pe hai! ", realtimeOrders);
        this.props.updateRealtimeOrders(realtimeOrders);
    });
    
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

    makeOtpSeenHandler(e, orderId, otp) {
        request({
            method: 'GET',
            url: api.MAKE_OTP_SEEN,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'JWT '+this.props.jwt_token
            },
            body: {
                'order-id': orderId
            }
        }, (error, response, body) => {
            handleResponse(error, response, body, () => {
                try {
                    body = JSON.parse(body)
                    console.log(body)
                    e.target.innerHTML = otp;
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
                            <div className='OrderItem'>{ ord.items.map(item => item.name + ' X ' + item.quantity + '\n') }</div>
                            <div className='OrderDetail'>
                                <div className='OrderId'>Order ID: #{ ord['order-id'] }</div>
                                <div className='OrderPrice'>&#8377; { ord.price }</div>
                            </div>
                            <div className='OrderProgress'>
                                <div 
                                    className={(this.props.realtimeOrders[ord['order-id']].status === 4) ? null : 'OrderOTP'} 
                                    onClick={(!this.props.realtimeOrders[ord['order-id']].otp_seen) ? ((this.props.realtimeOrders[ord['order-id']].status === 2 || this.props.realtimeOrders[ord['order-id']].status === 3)) ? (e) => this.makeOtpSeenHandler(e, ord['order-id'], ord.otp) : () => alert('Available when item is ready') : null}>
                                        {(this.props.realtimeOrders[ord['order-id']].status === 4) ? null : (!this.props.realtimeOrders[ord['order-id']].otp_seen) ? 'OTP' : ord.otp}
                                </div>
                                <div className={['OrderStatus', ('st' + this.props.realtimeOrders[ord['order-id']].status)].join(' ')}>
                                    { (this.props.realtimeOrders[ord['order-id']].status === 0) ? 'Pending' : (this.props.realtimeOrders[ord['order-id']].status === 1) ? 'Accepted' : (this.props.realtimeOrders[ord['order-id']].status === 2) ? 'Ready' : (this.props.realtimeOrders[ord['order-id']].status === 3) ? 'Finished' : 'Declined'}
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
        isLoading : state.loader.isLoading,
        userId: state.auth.userId,
        realtimeOrders: state.orders.realtimeOrders
    };
};

const mapDispatchToProp = dispatch => {
    const action = bindActionCreators(Object.assign({}, loader), dispatch);
    return {
        ...action,
        updateOrders: (orders) => dispatch({ type: 'UPDATE_ORDERS', orders }),
        updateRealtimeOrders: (realtimeOrders) => dispatch({ type: 'UPDATE_REALTIME_ORDERS', realtimeOrders })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Orders);