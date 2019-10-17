import React, { Component } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode-react';
import request from 'request';

import * as api from '../../constants/api';
import handleResponse from '../../utils/handleResponse';
import Aux from '../hoc/Aux/Aux';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AddButton from '../UI/AddButton/AddButton';

import './DialogBoxContainer.css';

class DialogBoxContainer extends Component {
    state = {
        amountToBeAdded: null,
        amountToBeSent: null,
        userId: null,
        combosTickets: [],
        showsTickets: [],
        comboTicketCounter: [],
        showsTicketCounter: [],
        ticketPrice: 0
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
                    body = JSON.parse(body)
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
                    body = JSON.parse(body)
                    this.setState({ userId: null, amountToBeSent: null });
                    this.props.closeTransaction();
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
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
                    this.setState({ combosTickets: body.combos, showsTickets: body.shows });
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }

    changeComboTicketCounter(id, price) {
        this.setState({ comboTicketCounter: [...this.state.comboTicketCounter, id], ticketPrice: this.state.ticketPrice + price });
    }

    changeShowsTicketCounter(id, price) {
        this.setState({ showsTicketCounter: [...this.state.showsTicketCounter, id], ticketPrice: this.state.ticketPrice + price });
    }

    buyTickets() {
        let Combos = [...this.state.comboTicketCounter];
        let Shows = [...this.state.showsTicketCounter];
        if (Combos.length === 0 && Shows.length === 0) {
            alert ("Please select a ticket to buy!");
            return;
        }
        let dupCombos = [Combos[0]];
        let dupShows = [Shows[0]];
        for (let i = 1; i < Combos.length; i++) {
            let isPresent = false;
            for (let j = 0; j < dupCombos.length; j++) {
                if (Combos[i] === dupCombos[j]) {
                    isPresent = true;
                    break;
                }
            }
            if (!isPresent) {
                dupCombos.push(Combos[i]);
            }
        }
        for (let i = 1; i < Shows.length; i++) {
            let isPresent = false;
            for (let j = 0; j < dupShows.length; j++) {
                if (Shows[i] === dupShows[j]) {
                    isPresent = true;
                    break;
                }
            }
            if (!isPresent) {
                dupShows.push(Shows[i]);
            }
        }
        let combosTickets = [];
        let showsTickets = [];
        for (let i = 0; i < dupCombos.length; i++) {
            let c = 0;
            for (let j = 0; j < Combos.length; j++) {
                if (dupCombos[i] === Combos[j])
                    c++;
            }
            let obj = {};
            obj[dupCombos[i]] = c;
            combosTickets.push(obj);
        }
        for (let i = 0; i < dupShows.length; i++) {
            let c = 0;
            for (let j = 0; j < Shows.length; j++) {
                if (dupShows[i] === Shows[j])
                    c++;
            }
            let obj = {};
            obj[dupShows[i]] = c;
            showsTickets.push(obj);
        }
        console.log("Combos: ", combosTickets)
        console.log("Shows: ", showsTickets)
        request({
            method: 'POST',
            url: api.BUY_TICKETS,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'JWT '+this.props.jwt_token
            },
            body: {
                'individual': showsTickets,
                'combos': combosTickets
            }
        }, (error, response, body) => {
            handleResponse(error, response, body, () => {
                try {
                    body = JSON.parse(body)
                    this.setState({ comboTicketCounter: [], showsTicketCounter: [] });
                    this.props.closeTransaction();
                    
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
                    <QRCode value={ this.props.qrCode } bgColor="#ffffff" fgColor="#000000" size={225} />
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
        if (this.props.isReferralOpen) {
            dialogBox = (
                <Aux>
                    <div className='DialogBoxHeading'>Referral Code</div>
                    <div className='ShowName'>{ this.props.referralCode }</div>
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
                        <AddButton click={ () => this.changeComboTicketCounter(combo.id, combo.price) } />
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
                        <div className='totalTicketPrice'>&#8377; { this.state.ticketPrice }</div>
                        <Button style={{ margin: '0', padding: '8px 16px', fontSize: '0.95rem', marginTop: '12px' }} click={ () => this.buyTickets() }>Buy</Button>
                    </div>
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
        jwt_token: state.auth.jwt_token,
        isQRcodeOpen: state.transaction.isQRcodeOpen,
        isAddMoneyOpen: state.transaction.isAddMoneyOpen,
        isSendMoneyOpen: state.transaction.isSendMoneyOpen,
        isBuyTicketOpen: state.transaction.isBuyTicketOpen,
        isReferralOpen: state.transaction.isReferralOpen,
        qrCode: state.auth.qrCode,
        bitsianId: state.auth.bitsianId,
        referralCode: state.auth.referralCode
    };
};

const mapDispatchToProp = dispatch => {
    return {
        closeTransaction: () => dispatch({ type: 'CLOSE_TRANSACTION' })
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(DialogBoxContainer);