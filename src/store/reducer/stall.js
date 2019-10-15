import * as stall from '../actions/stalls';

const initailState = {
    vendors: null
};

const stalls = (state = initailState, action) => {
    const { type } = action;
    if(type === stall.SET_VENDORS){
        console.log(action)
        return{
            ...state,
            vendors: action.vendors
        }
    }
    else return state;
}

export default stalls;
