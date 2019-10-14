import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../UI/Header/Header';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Ticket from './Ticket/Ticket';

import '../Page.css';
import './Profile.css'

class Profile extends Component {
    render() {
        return (
            <div className='Profile Page'>
                <Header heading='Profile' subHeading='Order food using wallet'>
                    <i class="fa fa-sign-out LogOut"></i>
                </Header>
                <ProfileInfo 
                    userName="Mukul Gupta" 
                    userId='0596' 
                    walletMoney='520' 
                    walletTokens='25' 
                    qrCode='5f307a54-93a3-42b4-b14d-a105b289a4a6'
                    openQRcodeHandler={ this.props.openQRcode } />
                <div className='TransactionButtons'>
                    <button className='TransactionButton' onClick={ this.props.openAddMoney }>Add Money</button>
                    <button className='TransactionButton' onClick={ this.props.openSendMoney }>Send Money</button>
                </div>
                <Ticket 
                    sunidhiChauhanTotal='1' sunidhiChauhanUsed='0' 
                    biswaTotal='1' biswaUsed='0' 
                    nucleyaTotal='0' nucleyaUsed='0'
                    openBuyTicketHandler={ this.props.openBuyTicket } />
            </div>
        );
    }
}


const mapDispatchToProp = dispatch => {
    return {
        openQRcode: () => dispatch({ type: 'OPEN_QRCODE' }),
        openSendMoney: () => dispatch({ type: 'OPEN_SEND_MONEY' }),
        openAddMoney: () => dispatch({ type: 'OPEN_ADD_MONEY' }),
        openBuyTicket: () => dispatch({ type: 'OPEN_BUY_TICKET' })
    };
}

export default connect(null, mapDispatchToProp)(Profile);