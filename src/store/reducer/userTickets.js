import * as userTickets from '../actions/userTickets';

const initailState = {};

const userTicket = (state = initailState, action) => {
    const { type } = action;
    if(type === userTickets.GET_USER_TICKETS){
        return action.payload;
    }
    return state;
}

export default userTicket;