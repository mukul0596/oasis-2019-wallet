import * as stall from '../actions/stalls';

const initailState = {};

const stall = (state = initailState, action) => {
    const type = {action};
    console.log(action);
    if(type === stall.VENDORS){
        return{
            ...state,
            vendors: action.vendors
        }
    }
}
