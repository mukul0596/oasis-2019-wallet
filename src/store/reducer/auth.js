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

    if (type === login.LOGIN_USER) {
        let body = {};
        if (action.id_token) {
            let id_token = action.id_token;
            body.id_token = id_token;
        } else {
            if (action.username && action.password) {
                let username = action.username;
                let password = action.password;
                body.username = username;
                body.password = password;


                // JUST FOR TESTING
                if ( username === "mukul" && password === "12345") {
                    return {
                        ...state,
                        loggedIn: true,
                        errorMessage: null
                    }
                }
                // -----------------


            } else {
                return {
                    ...state,
                    errorMessage: "Please, enter the username and password or login through BITS Mail"
                };
            }
        }
        
    }
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