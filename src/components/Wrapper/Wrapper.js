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
        if (this.props.errorMessage) {
            error = (
                <MessageBox>
                    { this.props.errorMessage }
                </MessageBox>
            )
        }

        // ------------------------FOR BACKDROP---------------------------
        let backdrop;
        if (this.props.isQRcodeOpen || this.props.isAddMoneyOpen || this.props.isSendMoneyOpen || this.props.isBuyTicketOpen) {
            backdrop = <Backdrop click={ this.props.closeTransaction } />
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
        
        errorMessage: state.auth.errorMessage,
        isQRcodeOpen: state.transaction.isQRcodeOpen,
        isAddMoneyOpen: state.transaction.isAddMoneyOpen,
        isSendMoneyOpen: state.transaction.isSendMoneyOpen,
        isBuyTicketOpen: state.transaction.isBuyTicketOpen
    };
};

const mapDispatchToProp = dispatch => {
    return {
        closeTransaction: () => {
            document.getElementsByClassName('MessageBox')[0].style.animation = 'slideOut 0.5s ease 1 forwards'
            setTimeout(() => dispatch({ type: 'CLOSE_TRANSACTION' }), 500);
        }
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(Wrapper);