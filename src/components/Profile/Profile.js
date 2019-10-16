import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'request';

import * as api from '../../constants/api';
import Header from '../UI/Header/Header';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Ticket from './Ticket/Ticket';
import Button from '../UI/Button/Button';
import handleResponse from '../../utils/handleResponse';

import '../Page.css';
import './Profile.css';

class Profile extends Component {
    componentDidMount() {
        request({
            method: 'GET',
            url: api.GET_MY_PROFSHOWS,
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
                    console.log(body.shows)
                    this.props.getUserTickets(body.shows);
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }
    render() {
        return (
            <div className='Profile Page'>
                <Header heading='Profile' subHeading='Order food using wallet'>
                    <i className="fa fa-sign-out LogOut"></i>
                </Header>
                <ProfileInfo 
                    userName={ this.props.userName } 
                    userId={ this.props.userId } 
                    walletMoney='520' 
                    walletTokens='25' 
                    qrCode={ this.props.qrCode }
                    openQRcodeHandler={ this.props.openQRcode } />
                <div className='TransactionButtons'>
                    <Button click={ this.props.openAddMoney }>Add Money</Button>
                    <Button click={ this.props.openSendMoney }>Send Money</Button>
                </div>
                <Ticket 
                    userTickets={ this.props.userTickets }
                    openBuyTicketHandler={ this.props.openBuyTicket } />
            </div>
        );
    }
}


const mapStateToProp = state => {
    return {
        jwt_token: state.auth.jwt_token,
        userName: state.auth.userName,
        userId: state.auth.userId,
        qrCode: state.auth.qrCode,
        referralCode: state.auth.referralCode,
        bitsianId: state.auth.bitsianId,
        userTickets: state.userTickets.userTickets
    };
};

const mapDispatchToProp = dispatch => {
    return {
        openQRcode: () => dispatch({ type: 'OPEN_QRCODE' }),
        openSendMoney: () => dispatch({ type: 'OPEN_SEND_MONEY' }),
        openAddMoney: () => dispatch({ type: 'OPEN_ADD_MONEY' }),
        openBuyTicket: () => dispatch({ type: 'OPEN_BUY_TICKET' }),
        getUserTickets: (tickets) => dispatch({ type: 'GET_USER_TICKETS', payload: tickets })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Profile);