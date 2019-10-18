import * as transaction from '../actions/transaction';

const initialState = {
    isQRcodeOpen: false,
    isAddMoneyOpen: false,
    isSendMoneyOpen: false,
    isBuyTicketOpen: false,
    isReferralOpen: false
}

const transactions = (state = initialState, action) => {
    const { type } = action;
    console.log(action)
    switch (type) {
        case transaction.OPEN_ADD_MONEY:
            return {
                ...initialState,
                isAddMoneyOpen: true
            }
        case transaction.OPEN_SEND_MONEY:
            return {
                ...initialState,
                isSendMoneyOpen: true
            }
        case transaction.OPEN_BUY_TICKET:
            return {
                ...initialState,
                isBuyTicketOpen: true
            }
        case transaction.OPEN_QRCODE:
            return {
                ...initialState,
                isQRcodeOpen: true
            }
        case transaction.CLOSE_TRANSACTION:
            return {
                ...initialState,
            }
        default:
            return state;
    }
}

export default transactions;