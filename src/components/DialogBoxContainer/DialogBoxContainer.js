import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react';
import request from 'request';
import { bindActionCreators } from 'redux'

import * as api from '../../constants/api';
import handleResponse from '../../utils/handleResponse';
import Aux from '../hoc/Aux/Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import * as profShow from '../../actionCreator/profShows';

import './DialogBoxContainer.css';

class DialogBoxContainer extends Component {
    state = {
        amountToBeAdded: null,
        amountToBeSent: null,
        userId: null,
        combosTickets: [],
        showsTickets: [],
        totalPrice: 0,
        cart: {}
    }
    addMoneyHandler(e) {
        e.preventDefault();
        if (!this.state.amountToBeAdded) {
            alert('Please enter the amount to be added!');
            return;
        }
        request({
            method: 'POST',
            url: api.ADD_MONEY,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'JWT '+this.props.jwt_token
            },
            body: JSON.stringify({
                amount: this.state.amountToBeAdded
            })
        }, (error, response, body) => {
            handleResponse(error, response, body, () => {
                try {
                    this.setState({ amountToBeAdded: null });
                    this.props.closeTransaction();
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }

    sendMoneyHandler(e) {
        e.preventDefault();
        if (!this.state.amountToBeSent) {
            alert('Please enter the amount to be sent!');
            return;
        }
        if (!this.state.userId) {
            alert('Please enter the user id!');
            return;
        }
        request({
            method: 'POST',
            url: api.TRANSFER_MONEY,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'JWT '+this.props.jwt_token
            },
            body: JSON.stringify({
                amount: this.state.amountToBeSent,
                id: this.state.userId
            })
        }, (error, response, body) => {
            handleResponse(error, response, body, () => {
                try {
                    this.setState({ userId: null, amountToBeSent: null });
                    this.props.closeTransaction();
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }

    addNewCombo(id, price) {
        console.log(this.state, id, price)
        this.setState({...this.state, 
            totalPrice: this.state.totalPrice + price,
            cart: {
            ...this.state.cart,
            [id]: 1
        }})
    }

    add(id, price) {
        console.log(this.state, id, price)
        this.setState({
            ...this.state,
            totalPrice: this.state.totalPrice + price,
            cart: {
                ...this.state.cart,
                [id]: this.state.cart[id] + 1
            }
        })
    }

    minus(id, price) {
        console.log(this.state, id, price)
        if(this.state.cart[id] === 1) {
            let newState = this.state;
            delete newState.cart[id];
            this.setState({
                ...newState,
                totalPrice: this.state.totalPrice - price,                
            });
        }
        else {
            this.setState({
                ...this.state, 
                totalPrice: this.state.totalPrice - price,
                cart: {
                    ...this.state.cart,
                    [id]: this.state.cart[id] - 1
                }
            })
        }
    }

    AddButton(id, price) {
        if (!this.state.cart[id]) {
            return (
                <button 
                    className='AddButton'
                    onClick={ () => this.addNewCombo(id, price) }
                    disabled={ this.props.disabled }
                    style={ this.props.style }>ADD +</button>
            );
        }
        else {
            return (
                <div className='CounterButtonContainer'>
                    <button 
                        className='CounterButton'
                        onClick={ () => this.minus(id, price) }
                        disabled={ this.props.disabled }
                        style={ this.props.style }>-</button>
                    { this.state.cart[id] }
                    <button 
                        className='CounterButton'
                        onClick={ () => this.add(id, price) }
                        disabled={ this.props.disabled }
                        style={ this.props.style }>+</button>
                </div>
            );
        }
    }

    getAllShows() {
        request({
            method: 'GET',
            url: api.GET_ALL_PROFSHOWS,
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
                    this.setState({ combosTickets: body.combos, showsTickets: body.shows });
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }

    render() {
        let dialogBox;
        if (this.props.isQRcodeOpen) {
            dialogBox = (
                <div style={{background: '#ffffff'}}>
                    <QRCode value={ this.props.qrCode } bgColor="#ffffff" fgColor="#31365E" size={225} />
                </div>
            )
        }
        if (this.props.isAddMoneyOpen) {
            dialogBox = (
                <Aux>
                    <div className='DialogBoxHeading'>Add Money (Stalls)</div>
                    <form>
                        <Input 
                            type='text' 
                            placeholder='Amount' 
                            style={{ fontSize: '1.5rem' }} 
                            value={this.state.amountToBeAdded} 
                            onChange={e => this.setState({ amountToBeAdded: e.target.value })} />
                        <Button  click={ (e) => this.addMoneyHandler(e) }>Add Money (SWD)</Button>
                    </form>
                </Aux>
            )
        }
        if (this.props.isSendMoneyOpen) {
            dialogBox = (
                <Aux>
                    <div className='DialogBoxHeading'>Send Money</div>
                    <form>
                        <Input 
                            type='text' 
                            placeholder='Amount' 
                            style={{ fontSize: '1.5rem' }}
                            value={this.state.amountToBeSent}  
                            onChange={e => this.setState({ amountToBeSent: e.target.value })} />
                        <Input 
                            type='text' 
                            placeholder='User Id' 
                            style={{ fontSize: '1.5rem' }}
                            value={this.state.userId}  
                            onChange={e => this.setState({ userId: e.target.value })} />
                        <Button click={ (e) => this.sendMoneyHandler(e) }>Send Money</Button>
                    </form>
                </Aux>
            )
        }
        if (this.props.isBuyTicketOpen) {
            if (this.state.combosTickets.length === 0 && this.state.showsTickets.length === 0)
                this.getAllShows();
            let combos = this.state.combosTickets.map(combo => {
                return (
                    <div className='TicketCard' key={ combo.id }>
                        <div className='ShowDetail'>
                            <div className="ShowName">
                                { combo.shows[0].name + ' + ' + combo.shows[1].name }
                            </div>
                            <div className='ShowDescription'>
                                { (this.props.bitsianId) ? ('₹ ' + combo.price) : (combo.allow_participants ? ('₹ ' + combo.price) : "Not available") }
                            </div>
                        </div>
                        {this.AddButton(combo.id, combo.price)}
                    </div>
                )
            });
            // let shows = this.state.showsTickets.map(show => {
            //     return (
            //         <div className='TicketCard' key={ show.id }>
            //             <div className='ShowDetail'>
            //                 <div className="ShowName">
            //                     { show.name }
            //                 </div>
            //                 <div className='ShowDescription'>
            //                     { (this.props.bitsianId) ? ('₹ ' + show.price) : (show.allow_participants ? ('₹ ' + show.price) : "Not available") }
            //                 </div>
            //             </div>
            //             <AddButton click={ () => this.changeShowsTicketCounter(show.id, show.price) } />
            //         </div>
            //     )
            // });
            dialogBox = (
                <Aux>
                    <div className='CombosTickets'>
                        { combos }
                    </div>
                    {/* <div className='ShowsTickets'>
                        { shows }
                    </div> */}
                    <div className='TicketFooter'>
                        <div className='totalTicketPrice'>&#8377; { this.state.totalPrice }</div>
                        <Button style={{ margin: '0', padding: '8px 16px', fontSize: '0.95rem', marginTop: '4px' }} click={ () => this.props.buyProfShow(this.state.cart) }>Buy</Button>
                    </div>
                </Aux>
            )
        }

        if (this.props.isReferralOpen) {
            dialogBox = (
                <Aux>
                    <div className='DialogBoxHeading'>Add Money (Stalls)</div>
                    <div className='ShowName'>{ this.props.referralCode }</div>
                </Aux>
            )
        }

        console.log("Idhar",this.props);
        return (
            <div className='DialogBoxContainer'>
                { dialogBox }
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        jwt_token: state.auth.jwt_token,
        isQRcodeOpen: state.transaction.isQRcodeOpen,
        isAddMoneyOpen: state.transaction.isAddMoneyOpen,
        isSendMoneyOpen: state.transaction.isSendMoneyOpen,
        isBuyTicketOpen: state.transaction.isBuyTicketOpen,
        isReferralOpen: state.transaction.isReferralOpen,
        qrCode: state.auth.qrCode,
        referralCode: state.auth.referralCode,
        bitsianId: state.auth.bitsianId
    };
};

const mapDispatchToProp = dispatch => {
    const action = bindActionCreators(Object.assign({}, profShow), dispatch);
    return {
        ...action,
        closeTransaction: () => dispatch({ type: 'CLOSE_TRANSACTION' })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(DialogBoxContainer);