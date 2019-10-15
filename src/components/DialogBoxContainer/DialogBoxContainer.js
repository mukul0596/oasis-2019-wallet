import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react';

import Aux from '../hoc/Aux/Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import './DialogBoxContainer.css';

class DialogBoxContainer extends Component {
    render() {
        let dialogBox;
        if (this.props.isQRcodeOpen) {
            dialogBox = <QRCode value='5f307a54-93a3-42b4-b14d-a105b289a4a6' bgColor="#31365E" fgColor="#eeeeee" size={225} />
        }
        if (this.props.isAddMoneyOpen) {
            dialogBox = (
                <Aux>
                    <div className='DialogBoxHeading'>Add Money (Stalls)</div>
                    <form>
                        <Input type='text' placeholder='Amount' style={{ fontSize: '1.5rem' }} />
                        <Button>Add Money (SWD)</Button>
                    </form>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <hr size='1px' width='35%' color='#FFFFFF' />
                        <div style={{fontSize: '1.25rem', color: '#FFFFFF', width: '30%', boxSizing: 'border-box', textAlign: 'center'}}> OR </div>
                        <hr size='1px' width='35%' color='#FFFFFF' />
                    </div>
                    <Button style={{background: '#ffffff', color: '#333333', padding: '12px'}}>
                        <img src={require('../../assets/images/paytm.svg')} alt='paytm-logo' style={{width: '45px', height: '18px', marginRight: '12px'}} />Add via Paytm
                    </Button>
                </Aux>
            )
        }
        if (this.props.isSendMoneyOpen) {
            dialogBox = (
                <Aux>
                    <div className='DialogBoxHeading'>Send Money</div>
                    <form>
                        <Input type='text' placeholder='Amount' style={{ fontSize: '1.5rem' }} />
                        <Input type='text' placeholder='User Id' style={{ fontSize: '1.5rem' }} />
                        <Button>Send Money</Button>
                    </form>
                </Aux>
            )
        }
        if (this.props.isBuyTicketOpen) {
            dialogBox = (
                <Aux>
                    <div className='ShowsTickets'></div>
                    <div className='CombosTickets'></div>
                </Aux>
            )
        }

        return (
            <div className='DialogBoxContainer'>
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