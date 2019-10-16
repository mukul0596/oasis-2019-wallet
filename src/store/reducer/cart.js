import * as cart from '../actions/cart';

const initialState = {}

const carts = (state = initialState, action) => {
  const { type } = action;

  if (type === cart.ADD_TO_CART) {
    let newState;
    console.log(state)
    if (state.cart[action.stallId]) {
      newState = {
        ...state,
        cart: {
          ...state.cart,
          [action.stallId]: {
            ...state.cart[action.stallId],
            items: {
              ...state.cart[action.stallId].items,
              [action.itemId]: {
                itemName: action.itemName,
                price: action.price,
                quantity: 1
              }
            }
          }
        }
      }
    }
    else {
      newState = {
        ...state,
        cart: {
          ...state.cart,
          [action.stallId]: {
            stallName: action.stallName,
            items: {
              [action.itemId]: {
                itemName: action.itemName,
                price: action.price,
                quantity: 1
              }
            }
          }
        }
      }
    }
    console.log(newState, state)
    return newState;
  }

  else if (type === cart.INC_QTY) {
    console.log(state)
    return {
      ...state,
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
    console.log(action)
    return {
      ...state,
      cart: {}
    }
  }

  return {
    ...state
  }
}

export default carts;