import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as kindStores from '../store/actions/kindStore';

export const getKindStoreItems = () => (dispatch, getState) =>{
    console.log(username, password)
     // JUST FOR TESTING
     if ( username === "mukul" && password === "12345") {
        dispatch(changeLoginStatus(true, null))
    }
    request({
        method: 'POST',
        url: api.LOGIN,
        headers: {
            'Content-Type': 'application/json',
            'X-Wallet-Token': api.WALLET_TOKEN,
            'Access-Control-Allow-Origin': '*',
            'Authorization': `JWT ${getState().auth.jwt_token}`,
        },
        body: JSON.stringify({
            username, password
        })
    }, (error, response, body) => {
        handleResponse(error, response, body, () => {
            try {
                body = JSON.parse(body);
                console.log(body)
                dispatch(setKindStore(body));
            } catch (e) {
                throw new Error(e.message || "");
            }
        })
    });
}

export const setKindStore = (items) => (dispatch, getState) => {
    dispatch({
        type: kindStores.SET_KIND_STORE,
        items
    })
}