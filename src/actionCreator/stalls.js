import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as stall from '../store/actions/stalls';

export const getStalls = () => (dispatch, getState) => {
    console.log('GET VENDORS')
    request({
        method: 'GET',
        url: api.GET_VENDORS,
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Token': api.WALLET_TOKEN,
          'Authorization': `JWT${getState().JWT}`,
          'Access-Control-Allow-Origin': '*'
        }
      }, (error, response, body) => {
        handleResponse(error, response, body, () => {
          try {
            body = JSON.parse(body)
            console.log(body);
            dispatch(setVendors(body))
          } catch (e) {
            throw new Error(e.message || "");
          }
        })
    });
}

export const setVendors = (vendors) => (dispatch, getState) => {
    dispatch({
        type: stall.SET_VENDORS,
        vendors
    })
}

export const getStallItem = (vendorId, vendorName) => (dispatch, getState) => {
    console.log(vendorId)
    request({
        method: 'GET',
        url: api.GET_VENDOR_MENU_BY_ID(vendorId),
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Token': api.WALLET_TOKEN,
          'Authorization': `JWT${getState().JWT}`,
          'Access-Control-Allow-Origin': '*'
        }
      }, (error, response, body) => {
        handleResponse(error, response, body, () => {
          try {
            body = JSON.parse(body)
            console.log(body);
            dispatch(setStallMenu(body,vendorId, vendorName))
            dispatch({ type: 'CHANGE_ACTIVE_TAB', activeTab: 'MenuItem' })
          } catch (e) {
            throw new Error(e.message || "");
          }
        })
    });
}

export const setStallMenu = (menu, vendorId, vendor) => (dispatch, getState) => {
    dispatch({
        type: stall.SET_VENDOR_MENU,
        menu, vendor, vendorId
    })
}