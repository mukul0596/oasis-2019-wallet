import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';


export const buyProfShow = (cart) => (dispatch, getState) => {
    if(!cart || !Object.keys(cart).length) 
            return;
        let body = {
            'combos': cart,
            'individual': {}
        }
        console.log(body)
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
                    dispatch(close());
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
}

export const close = () => (dispatch, getState) => {
    console.log("CLOSE")
    dispatch({ type: 'CLOSE_TRANSACTION' })
}