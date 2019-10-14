import carts from './cart';
import loginReducer from './auth';
import activeTab from './activeTab';

import { combineReducers } from 'redux';

export default combineReducers({
    carts,
    auth: loginReducer,
    activeTab
})