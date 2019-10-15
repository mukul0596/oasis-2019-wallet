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
    else if(type === stall.SET_VENDOR_MENU){
        return{
            ...state,
            activeVendor: action.vendor,
            menu: action.menu
        }
    }
    else return state;
}

export default stalls;
