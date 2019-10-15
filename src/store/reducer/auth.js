import * as login from '../actions/auth';

const initialState = {
    loggedIn: false,
    jwt_token: null,
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
        console.log(action)
        return {
            ...state,
            loggedIn: action.isLoggedIn,
            jwt_token: action.JWT
        }
    }
    return {
        ...state,
        errorMessage: null
    };
}
export default logins;