import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as message from './message';
import * as loader from './loader';

export const buyProfShow = (cart, showcart) => (dispatch, getState) => {
    dispatch(loader.showLoader());
    if(!cart || (!Object.keys(cart).length && !Object.keys(showcart).length)) 
            return;
        let body = {
            'combos': cart,
            'individual': showcart
        }
        request({
            method: 'POST',
            url: api.BUY_TICKETS,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*',
                'Authorization': `JWT ${getState().auth.jwt_token}`,
            },
            body: JSON.stringify(body)
        }, (error, response, body) => {
            handleResponse(error, response, body, () => {
                try {
                    // body = JSON.parse(body)
                    dispatch(message.updateMessage('Tickets successfully bought!'))
                    dispatch(close());
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
}

export const close = () => (dispatch, getState) => {
    dispatch({ type: 'CLOSE_TRANSACTION' })
}