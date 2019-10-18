import * as message from '../actions/message';

const initailState = {
    message: null
};

const messages = (state = initailState, action) => {
    const { type } = action;
    console.log(action)
    if(type === message.UPDATE_MESSAGE){
        return {
            ...state,
            message: action.message,
        }
    }
    if(type === message.CLOSE_MESSAGE){
        return {
            message: null
        }
    }
    return state;
}

export default messages;
