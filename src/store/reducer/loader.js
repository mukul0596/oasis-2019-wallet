import * as loader from '../actions/loader';

const initailState = { };

const stalls = (state = initailState, action) => {
    const { type } = action;
    if(type === loader.SHOW_LOADER){
        return{
            ...state,
            isLoading: true,
        }
    }
    else if(type === loader.HIDE_LOADER){
        return{
            ...state,
            isLoading: false
        }
    }
    else return state;
}

export default stalls;
