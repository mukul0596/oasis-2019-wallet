import * as login from '../actions/auth';

const initialState = {
    loggedIn: false,
    jwt_token: null,
    userName: null,
    userId: null,
    qrCode: null,
    referralCode: null,
    bitsianId: null,
    errorMessage: null
}

const logins = (state = initialState, action) => {
  const { type } = action;
  
    if ( type === login.CLOSE_ERROR ) {
        return {
            ...state,
            errorMessage: null
        }; 
    }
    if( type === login.SET_LOGIN) {
        return {
            ...state,
            loggedIn: action.isLoggedIn,
            jwt_token: action.JWT,
            userName: action.userName,
            userId: action.userId,
            qrCode: action.qrCode,
            referralCode: action.referralCode,
            bitsianId: action.bitsianId
    }
    }
    return {
        ...state,
        errorMessage: null
    };
}
export default logins;