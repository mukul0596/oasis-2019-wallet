import carts from './cart';
import loginReducer from './auth';
import { combineReducers } from 'redux';

export default combineReducers({
    carts,
    auth: loginReducer
})