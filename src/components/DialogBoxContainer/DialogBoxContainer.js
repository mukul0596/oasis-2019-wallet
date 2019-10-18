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
import Loader from '../Loader/loader'
import './DialogBoxContainer.css';
import * as load from '../../actionCreator/loader';

class DialogBoxContainer extends Component {
    state = {
        amountToBeAdded: null,
        amountToBeSent: null,
        userId: null,
        combosTickets: [],
        showsTickets: [],
        totalPrice: 0,
        cart: {},
        showcart: {}
    }
    addMoneyHandler(e) {
        e.preventDefault();
        if (!this.state.amountToBeAdded) {
            this.props.updateMessage('Please enter the amount to be added!');
            return;
        }
        this.props.closeTransaction();
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
                    this.props.updateMessage('Amount successfully added');
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }

    sendMoneyHandler(e) {
        this.props.showLoader();
        e.preventDefault();
        if (!this.state.amountToBeSent) {
            this.props.updateMessage('Please enter the amount to be sent!');
            return;
        }
        if (!this.state.userId) {
            this.props.updateMessage('Please enter the user id!');
            return;
        }
        this.props.closeTransaction();
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
                    this.props.updateMessage('Amount successfully sent');
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }

    addNewCombo(id, price, combo) {
        if(combo) {
            this.setState({...this.state, 
                totalPrice: this.state.totalPrice + price,
                cart: {
                ...this.state.cart,
                [id]: 1
            }})
        }
        else {
            this.setState({...this.state, 
                totalPrice: this.state.totalPrice + price,
                showcart: {
                ...this.state.showcart,
                [id]: 1
            }})
        }
        console.log(this.state, id, price)
        
    }

    add(id, price, combo) {
        if(combo) {
            this.setState({
                ...this.state,
                totalPrice: this.state.totalPrice + price,
                cart: {
                    ...this.state.cart,
                    [id]: this.state.cart[id] + 1
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                totalPrice: this.state.totalPrice + price,
                showcart: {
                    ...this.state.showcart,
                    [id]: this.state.showcart[id] + 1
                }
            })
        }
        console.log(this.state, id, price)
        
    }

    minus(id, price, combo) {
        console.log(this.state, id, price)
        if(combo){
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
        else {
            if(this.state.showcart[id] === 1) {
                let newState = this.state;
                delete newState.showcart[id];
                this.setState({
                    ...newState,
                    totalPrice: this.state.totalPrice - price,                
                });
            }
            else {
                this.setState({
                    ...this.state, 
                    totalPrice: this.state.totalPrice - price,
                    showcart: {
                        ...this.state.cart,
                        [id]: this.state.cart[id] - 1
                    }
                })
            }
        }
    }

    AddButton(id, price, combo) {
        if(combo) {
            if (!this.state.cart[id]) {
                return (
                    <button 
                        className='AddButton'
                        onClick={ () => this.addNewCombo(id, price, combo) }
                        disabled={ this.props.disabled }
                        style={ this.props.style }>ADD +</button>
                );
            }
            else {
                return (
                    <div className='CounterButtonContainer'>
                        <button 
                            className='CounterButton'
                            onClick={ () => this.minus(id, price, combo) }
                            disabled={ this.props.disabled }
                            style={ this.props.style }>-</button>
                        { this.state.cart[id] }
                        <button 
                            className='CounterButton'
                            onClick={ () => this.add(id, price, combo) }
                            disabled={ this.props.disabled }
                            style={ this.props.style }>+</button>
                    </div>
                );
            }
        }
        else {
            if (!this.state.showcart[id]) {
                return (
                    <button 
                        className='AddButton'
                        onClick={ () => this.addNewCombo(id, price, combo) }
                        disabled={ this.props.disabled }
                        style={ this.props.style }>ADD +</button>
                );
            }
            else {
                return (
                    <div className='CounterButtonContainer'>
                        <button 
                            className='CounterButton'
                            onClick={ () => this.minus(id, price, combo) }
                            disabled={ this.props.disabled }
                            style={ this.props.style }>-</button>
                        { this.state.showcart[id] }
                        <button 
                            className='CounterButton'
                            onClick={ () => this.add(id, price, combo) }
                            disabled={ this.props.disabled }
                            style={ this.props.style }>+</button>
                    </div>
                );
            }
        }
        
    }

    getAllShows() {
        this.props.showLoader();
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
            let button;
            if(this.props.isLoading) {
                button = <Loader />
            }
            else {
                button = (
                    <Button  click={ (e) => this.addMoneyHandler(e) }>Add Money (SWD)</Button>
                )
            }
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
                        {button}
                    </form>
                </Aux>
            )
        }
        if (this.props.isSendMoneyOpen) {
            let button;
            if(this.props.isLoading) {
                button = <Loader />
            }
            else {
                button = (
                    <Button click={ (e) => this.sendMoneyHandler(e) }>Send Money</Button>
                )
            }
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
                            {button}
                    </form>
                </Aux>
            )
        }
        if (this.props.isBuyTicketOpen) {
            let combos = [];
            if (this.state.combosTickets.length === 0 && this.state.showsTickets.length === 0)
                this.getAllShows();
            if (true)
                    combos = <Loader style={{height: '20%'}} />
            combos = this.state.combosTickets.map(combo => {
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
                    </div>
                )
            });
            let shows = this.state.showsTickets.map(show => {
                return (
                    <div className='TicketCard' key={ show.id }>
                        <div className='ShowDetail'>
                            <div className="ShowName">
                                { show.name }
                            </div>
                            <div className='ShowDescription'>
                                { (this.props.bitsianId) ? ('₹ ' + show.price) : (show.allow_participants ? ('₹ ' + show.price) : "Not available") }
                            </div>
                        </div>
                        {this.AddButton(show.id, show.price, false)}
                    </div>
                )
            });
            let button;
            if(this.props.isLoading) {
                button = (
                    <div className="TicketFooter">
                        <Loader />
                    </div>
                )
            }
            else {
                button = (
                    <div className='TicketFooter'>
                        <div className='totalTicketPrice'>&#8377; { this.state.totalPrice }</div>
                        <Button style={{ margin: '0', padding: '8px 16px', fontSize: '0.95rem', marginTop: '4px' }} click={ () => this.props.buyProfShow(this.state.cart, this.state.showcart) }>Buy</Button>
                    </div>
                )
            }
            dialogBox = (
                <Aux>
                    <div className='CombosTickets'>
                        { combos }
                    </div>
                    <div className='CombosTickets'>
                        { shows }
                    </div>
                    {button}
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
        bitsianId: state.auth.bitsianId,
        isLoading: state.loader.isLoading
    };
};

const mapDispatchToProp = dispatch => {
    const action = bindActionCreators(Object.assign({}, profShow), dispatch);
    const actions = bindActionCreators(Object.assign({}, load), dispatch);
    return {
        ...action,
        ...actions,
        closeTransaction: () => dispatch({ type: 'CLOSE_TRANSACTION' }),
        updateMessage: (message) => dispatch({ type: 'UPDATE_MESSAGE',  message })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(DialogBoxContainer);