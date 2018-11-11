import {updateObject} from '../../store/utility';
import * as actionTypes from '../../store/actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    render: null,
    completedRegistration: false
}
const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const authStart = (state = initialState, action) => {
    return updateObject(state, {
        error: null, 
        loading: true
    } );
}

const authSuccess = (state, action) => {
    //let completedRegistrationBoolean = action.completedRegistration =="true" ? true : false;
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        completedRegistration: action.completedRegistration,
        error: null,
        loading: false,
        render: true
    } );
}

const authFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        loading: false
    } );
}

const authLogout = (state, action) => {

    return updateObject(state, { 
        token: null,
        userId: null,
        render: true,
        completedRegistration: false
    } );
}

const completeRegistration = (state, action) => {
    
    return updateObject(state, {
        completedRegistration: true
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);   
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action); 
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        case actionTypes.COMPLETED_REGISTRATION: return completeRegistration(state,action);
        
        default:
            return state
        }
}

export default reducer;