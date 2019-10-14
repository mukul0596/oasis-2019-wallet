import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react';

import './DialogBoxContainer.css';

class DialogBoxContainer extends Component {
    render() {
        let dialogBox;
        if (this.props.isQRcodeOpen) {
            dialogBox = <QRCode value='5f307a54-93a3-42b4-b14d-a105b289a4a6' bgcolor='#31365E' fgcolor='#ffffff' size={256} />
        }
        if (this.props.isAddMoneyOpen) {
            dialogBox = <p>Add Money</p>
        }
        if (this.props.isSendMoneyOpen) {
            dialogBox = <p>Send Money</p>
        }
        if (this.props.isBuyTicketOpen) {
            dialogBox = <p>Buy Ticket</p>
        }

        return (
            <div className='DialogBoxContainer'>
            <i className="fa fa-close CloseButton" onClick={ this.props.closeTransaction }></i>
                { dialogBox }
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        isQRcodeOpen: state.transaction.isQRcodeOpen,
        isAddMoneyOpen: state.transaction.isAddMoneyOpen,
        isSendMoneyOpen: state.transaction.isSendMoneyOpen,
        isBuyTicketOpen: state.transaction.isBuyTicketOpen
    };
};

const mapDispatchToProp = dispatch => {
    return {
        closeTransaction: () => dispatch({ type: 'CLOSE_TRANSACTION' })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(DialogBoxContainer);