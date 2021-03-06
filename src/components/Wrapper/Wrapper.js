import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../Login/Login';
import MessageBox from '../UI/MessageBox/MessageBox';
import PageContainer from '../PageContainer/PageContainer';
import Navbar from '../Navbar/Navbar';
import Aux from '../hoc/Aux/Aux';
import Backdrop from '../UI/Backdrop/Backdrop';
import DialogBoxContainer from '../DialogBoxContainer/DialogBoxContainer';

import './Wrapper.css';

class Wrapper extends Component {
    render() {
        // --------------------FOR ERROR MESSAGES------------------------
        let error;
        if (this.props.message) {
            error = (
                <MessageBox>
                    { this.props.message }
                </MessageBox>
            )
        }

        // ------------------------FOR BACKDROP---------------------------
        let backdrop;
        if (this.props.isQRcodeOpen || this.props.isAddMoneyOpen || this.props.isSendMoneyOpen || this.props.isBuyTicketOpen || this.props.message) {
            backdrop = <Backdrop click={ () =>  {(!this.props.message) ? this.props.closeTransaction() : this.props.closeMessage();} } />
        }

        // ------------------FOR DIALOG BOX CONTAINER---------------------
        let dialogBoxContainer;
        if (this.props.isQRcodeOpen || this.props.isAddMoneyOpen || this.props.isSendMoneyOpen || this.props.isBuyTicketOpen) {
            dialogBoxContainer = <DialogBoxContainer />
        }

        // --------------FOR PAGES AND NAVBAR OR LOGIN PAGE---------------
        let child;
        if ( this.props.loggedIn ) {
            child = (
                <Aux>
                    <PageContainer />
                    <Navbar />
                </Aux>
            );
        } else {
            child = (
                <Login />
            );
        }


        return (
            <div className="Wrapper">
                { dialogBoxContainer }
                { backdrop }
                { error }
                { child }
            </div>
        )
    }
}

const mapStateToProp = state => {
    return {
        loggedIn: state.auth.loggedIn,
        isQRcodeOpen: state.transaction.isQRcodeOpen,
        isAddMoneyOpen: state.transaction.isAddMoneyOpen,
        isSendMoneyOpen: state.transaction.isSendMoneyOpen,
        isBuyTicketOpen: state.transaction.isBuyTicketOpen,
        message: state.message.message
    };
};

const mapDispatchToProp = dispatch => {
    return {
        closeTransaction: () => {
            document.getElementsByClassName('DialogBoxContainer')[0].style.animation = 'slideOut 0.5s ease 1 forwards'
            setTimeout(() => dispatch({ type: 'CLOSE_TRANSACTION' }), 500);
        },
        closeMessage: () => {
            document.getElementsByClassName('MessageBox')[0].style.animation = 'slideOut 0.5s ease 1 forwards'
            setTimeout(() => dispatch({ type: 'CLOSE_MESSAGE' }), 500);
        },
        changeLoginStatus: (isLoggedIn, JWT, userName, userId, qrCode, referralCode, bitsianId) => dispatch({
            type: 'SET_LOGIN',
            isLoggedIn, JWT, userName, userId, qrCode, referralCode, bitsianId
        })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Wrapper);