import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as kindStores from '../store/actions/kindStore';
import * as loader from './loader';

export const getKindStoreItems = () => (dispatch, getState) =>{
    dispatch(loader.showLoader());
    request({
        method: 'GET',
        url: api.GET_KIND_STORE_ITEMS,
        headers: {
            'Content-Type': 'application/json',
            'X-Wallet-Token': api.WALLET_TOKEN,
            'Access-Control-Allow-Origin': '*',
            'Authorization': `JWT ${getState().auth.jwt_token}`,
        },
    }, (error, response, body) => {
        handleResponse(error, response, body, () => {
            try {
                body = JSON.parse(body);
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