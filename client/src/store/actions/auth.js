import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId, completedRegistration) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        completedRegistration: completedRegistration
    };
}

export const authFail = (error) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('completedRegistration');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (authData, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        let url = 'api/auth/register';
        if(!parseInt(isSignup, 10)){
            url = 'api/auth/login';
        }
        
        axios.post(url, authData)
            .then(response => {
                var expiresIn = parseInt(response.headers.expiresin, 10);
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('token', response.headers.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data._id);
                localStorage.setItem('completedRegistration', response.data.completedRegistration);
                dispatch(authSuccess(response.headers.token, response.data._id, response.data.completedRegistration));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.data.error.message));
            });
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const completedRegistration = localStorage.getItem('completedRegistration');
                dispatch(authSuccess(token, userId, completedRegistration));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};