import * as userTickets from '../actions/userTickets';

const initailState = {
    userTickets: null
};

const userTicket = (state = initailState, action) => {
    const { type } = action;
    if(type === userTickets.GET_USER_TICKETS){
        return {
            userTickets: action.payload
        }
    }
    return state;
}

export default userTicket;