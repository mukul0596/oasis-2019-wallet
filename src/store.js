import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk'

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
  )

export default store;