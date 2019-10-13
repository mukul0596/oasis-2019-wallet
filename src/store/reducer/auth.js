import request from 'request';
import * as login from '../actions/auth';
import * as api from '../../constants/api';
import handleResponse from '../../utils/handleResponse';

const initialState = {
    loggedIn: false,
    jwt_token: null
}

const logins = (state = initialState, action) => {
  const { type } = action;

    if (type === login.LOGIN_USER) {
        let body = {};
        if (action.id_token) {
            let id_token = action.id_token;
            body.id_token = id_token;
        } else {
            if (action.username && action.password) {
                let username = action.username;
                let password = action.password;
                body.username = username;
                body.password = password;
            } else {
                alert("Please, enter the username and password or login through BITS Mail");
                return state;
            }
        }
        request({
            method: 'POST',
            url: api.LOGIN,
            headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN,
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
        }, (error, response, body) => {
            console.log(response.statusCode, body)
            handleResponse(error, response, body, () => {
                try {
                    body = JSON.parse(body);
                    return {
                        ...state,
                        loggedIn: true,
                        jwt_token: body.JWT
                    }
                } catch (e) {
                    throw new Error(e.message || "");
                }
            })
        });
    }
  return state;
}
export default logins;