import carts from './cart';
import loginReducer from './auth';
import activeTab from './activeTab';
import transaction from './transaction';
import stall from './stall';
import userTickets from './userTickets';
import orders from './orders';
import loader from './loader';
import kindStore from './kindStore';
import message from './message';

import { combineReducers } from 'redux';

export default combineReducers({
    carts,
    auth: loginReducer,
    activeTab,
    transaction,
    stall,
    userTickets, 
    loader,
    kindStore,
    orders,
    message
})