import request from 'request';
import handleResponse from '../utils/handleResponse';
import * as api from '../constants/api';
import * as cart from '../store/actions/cart';

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

export const addNewItemToCart = (stallName, stallId, itemName, itemId, price) => ({
    type: cart.ADD_TO_CART,
    stallName,
    stallId,
    itemName,
    itemId,
    price
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