import * as cart from '../actions/cart';

const initialState = {}

const carts = (state = initialState, action) => {
  const { type } = action;
  if (type === cart.ADD_TO_CART) {
    let newState;
    if (state.cart[action.stallId]) {
      newState = {
        ...state,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.price - action.discount,
        cart: {
          ...state.cart,
          [action.stallId]: {
            ...state.cart[action.stallId],
            items: {
              ...state.cart[action.stallId].items,
              [action.itemId]: {
                itemName: action.itemName,
                price: action.price,
                quantity: 1,
                discount: action.discount,
                isVeg: action.isVeg
              }
            }
          }
        }
      }
    }
    else {
      newState = {
        ...state,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.price - action.discount,
        cart: {
          ...state.cart,
          [action.stallId]: {
            stallName: action.stallName,
            items: {
              [action.itemId]: {
                itemName: action.itemName,
                price: action.price,
                discount: action.discount,
                quantity: 1,
                isVeg: action.isVeg
              }
            }
          }
        }
      }
    }
    return newState;
  }

  else if (type === cart.INC_QTY) {
    return {
      ...state,
      totalItems: state.totalItems + 1,
      totalPrice: state.totalPrice + state.cart[action.stallId].items[action.itemId].price - state.cart[action.stallId].items[action.itemId].discount,
      cart: {
          ...state.cart,
          [action.stallId]: {
          ...state.cart[action.stallId],
          items: {
            ...state.cart[action.stallId].items,
            [action.itemId]: {
              ...state.cart[action.stallId].items[action.itemId],
              quantity: state.cart[action.stallId].items[action.itemId].quantity + 1
            }
          }
        }
      }
    }
  }

  else if (type === cart.DEC_QTY) {

    let newState = { ...state }
    if (state.cart[action.stallId] && state.cart[action.stallId].items[action.itemId]) {
      newState = {
        ...state,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - state.cart[action.stallId].items[action.itemId].price + state.cart[action.stallId].items[action.itemId].discount,
        cart: {
          ...state.cart,
          [action.stallId]: {
            ...state.cart[action.stallId],
            items: {
              ...state.cart[action.stallId].items,
              [action.itemId]: {
                ...state.cart[action.stallId].items[action.itemId],
                quantity: state.cart[action.stallId].items[action.itemId].quantity - 1
              }
            }
          }
        }
      }
  
      if (newState.cart[action.stallId].items[action.itemId].quantity === 0) {
        delete newState.cart[action.stallId].items[action.itemId];
      }
  
      if (Object.keys(newState.cart[action.stallId].items).length <= 0) {
        delete newState.cart[action.stallId];
      }
    }

    return newState;
  }

  else if (type === cart.CART_CLEAR) {
    return {
      ...state,
      totalItems: 0,
      totalPrice: 0,
      cart: { }
    }
  }

  return {
    ...state
  }
}

export default carts;