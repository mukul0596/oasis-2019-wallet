import * as kindStores from '../actions/kindStore';

const initialState = { }

const kindStore = (state = initialState, action) => {
  const { type } = action;
  
    if ( type === kindStores.SET_KIND_STORE ) {
        return {
            ...state,
            kindStoreItems: action.items
        }; 
    }
    return state;
}
export default kindStore;