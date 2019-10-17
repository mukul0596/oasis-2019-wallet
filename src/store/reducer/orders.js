import * as order from '../actions/orders';

const initailState = {
    orders: null
};

const orders = (state = initailState, action) => {
    const { type } = action;
    if(type === order.UPDATE_ORDERS){
        return{
            ...state,
            orders: action.orders
        }
    }
    else return state;
}

export default orders;
