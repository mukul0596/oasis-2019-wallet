import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as auth from '../store/actions/auth';

export const changeLoginStatus = (isLoggedIn, JWT) => (dispatch, getState) => {

    if (isLoggedIn) {
      
    }
    console.log(isLoggedIn)
    dispatch({
      type: auth.SET_LOGIN,
      isLoggedIn, JWT
    });
}

export const googleLogin = id => (dispatch, getState) => {
    console.log(id);
    request({
      method: 'POST',
      url: api.LOGIN,
      headers: {
        'Content-Type': 'application/json',
        'X-Wallet-Token': api.WALLET_TOKEN,
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        id_token: id
      })
    }, (error, response, body) => {
      handleResponse(error, response, body, () => {
        try {
          body = JSON.parse(body)
          const { JWT } = body
          dispatch(changeLoginStatus(true, JWT))
        } catch (e) {
          throw new Error(e.message || "");
        }
      })
    });
}


export const login = (username, password) => (dispatch, getState) =>{
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
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            username, password
        })
    }, (error, response, body) => {
        handleResponse(error, response, body, () => {
            try {
                body = JSON.parse(body);
                console.log(body)
                dispatch(changeLoginStatus(true, body.JWT))
            } catch (e) {
                throw new Error(e.message || "");
            }
        })
    });
}