import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as cart from '../store/actions/cart';
import * as loader from './loader';
import * as message from './message';

export const increaseQty = (stallId, itemId) => ({
    type: cart.INC_QTY,
    stallId,
    itemId
  });

export const decreaseQty = (stallId, itemId) => ({
    type: cart.DEC_QTY,
    stallId,
    itemId
});

export const clearCart = () => (dispatch, getState) => {
    dispatch({
        type: cart.CART_CLEAR
    })
}

export const addNewItemToCart = (stallName, stallId, itemName, itemId, price, isVeg, discount) => ({
    type: cart.ADD_TO_CART,
    stallName,
    stallId,
    itemName,
    itemId,
    price,
    isVeg,
    discount
});
  
export const addToCart = (stallName, stallId, itemName, itemId, price) => (dispatch, getState) => {
    let cart = getState().cart;
  
    if (cart[stallId] && cart[stallId].items[itemId]) {
      dispatch(increaseQty(stallId, itemId));
    }
    else {
      dispatch(addNewItemToCart(stallName, stallId, itemName, itemId, price));
    }
}

export const placeOrder = () => (dispatch, getState) => {
    const cart = getState().carts.cart;
    const keys = Object.keys(cart)
    let order = {};
    order['orderdict'] = {};
    for(let i = 0; i < keys.length; i++) {
        order['orderdict'][keys[i]] = {}
        const newKeys = Object.keys(cart[keys[i]].items);
        for(let j = 0; j < newKeys.length; j++) {
            order['orderdict'][keys[i]][newKeys[j]] = cart[keys[i]].items[newKeys[j]].quantity;
        }
    }
    dispatch(loader.showLoader());
    request({
        method: 'POST',
        url: api.PLACE_ORDER,
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Token': api.WALLET_TOKEN,
          'Authorization': `JWT ${getState().auth.jwt_token}`,
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(order)
      }, (error, response, body) => {
        handleResponse(error, response, body, () => {
          try {
            body = JSON.parse(body);
            dispatch(message.updateMessage('Order placed successfully'))
            dispatch(clearCart())
          } catch (e) {
            throw new Error(e.message || "");
          }
        })
    });
}