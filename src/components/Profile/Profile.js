import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../UI/Header/Header';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Ticket from './Ticket/Ticket';
import Button from '../UI/Button/Button';

import '../Page.css';
import './Profile.css'

class Profile extends Component {
    render() {
        console.log(this.props)
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
                    sunidhiChauhanTotal='1' sunidhiChauhanUsed='0' 
                    biswaTotal='1' biswaUsed='0' 
                    nucleyaTotal='0' nucleyaUsed='0'
                    openBuyTicketHandler={ this.props.openBuyTicket } />
            </div>
        );
    }
}


const mapStateToProp = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        qrCode: state.auth.qrCode,
        referralCode: state.auth.referralCode,
        bitsianId: state.auth.bitsianId
    };
};

const mapDispatchToProp = dispatch => {
    return {
        openQRcode: () => dispatch({ type: 'OPEN_QRCODE' }),
        openSendMoney: () => dispatch({ type: 'OPEN_SEND_MONEY' }),
        openAddMoney: () => dispatch({ type: 'OPEN_ADD_MONEY' }),
        openBuyTicket: () => dispatch({ type: 'OPEN_BUY_TICKET' })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Profile);