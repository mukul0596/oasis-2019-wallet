import * as order from '../actions/orders';

const initailState = {
    orders: null,
    realtimeOrders: null
};

const orders = (state = initailState, action) => {
    const { type } = action;
    if(type === order.UPDATE_ORDERS){
        return{
            ...state,
            orders: action.orders
        }
    }
    if (type === order.UPDATE_REALTIME_ORDERS) {
        return {
            ...state,
            realtimeOrders: action.realtimeOrders
        }
    }
    if(type === order.CLEAR_ORDER) {
        return initailState;
    }
    else return state;
}

export default orders;
