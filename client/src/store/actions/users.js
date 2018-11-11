import * as actionTypes from './actionTypes';
import axios from 'axios';

export const firstFetchUserData = (token, userId, isMainUser) => {
    return dispatch => {
        let numberOfPostFetched = 0;
        const promises = [
            new Promise(resolve => dispatch(resetUserFeed())) ,
            new Promise(resolve => dispatch(setIsMainUser(isMainUser))) ,
            new Promise(resolve => dispatch(fetchUserData(token, userId))) ,
            new Promise(resolve => dispatch(fetchUserPosts(token, {userId, numberOfPostFetched} )))
            ];
        Promise.all(promises)
    }
}
export const setIsMainUser = (isMainUser) => {
    return {
        type: actionTypes.SET_IS_MAIN_USER,
        isMainUser: isMainUser
    };
}
export const fetchUserDataStart = () => {
    return {
        type: actionTypes.FETCH_USER_DATA_START,
    };
}
export const fetchUserDataFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_DATA_FAIL,
        error: error
    };
}
export const fetchUserDataSuccess = (data, userId) => {
    return {
        type: actionTypes.FETCH_USER_DATA_SUCCESS,
        userId: userId,
        userData: data,
    };
}
export const fetchUserFollowingArr = (followingArr) => {
    return {
        type: actionTypes.FETCH_USER_FOLLOWING_ARR,
        followingArr: followingArr
    };
}

export const fetchUserData = (token, userId) => {
    return dispatch => {
        dispatch(fetchUserDataStart());
        let url = 'api/userData/getUserData?id=' + userId;
        axios.get(url, {'headers': { 'token': token}})
            .then(response => {
                dispatch(fetchUserDataSuccess(response.data, userId))
            })
            .catch(error => {
                dispatch(fetchUserDataFail(error));
            })
    }
}

export const fetchUserPostsStart = () => {
    return {
        type: actionTypes.FETCH_USER_POSTS_START,
    };
}
export const fetchUserPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_POSTS_FAIL,
        error: error
    };
}
export const fetchUserPostsSuccess = (data) => {

    return {
        type: actionTypes.FETCH_USER_POSTS_SUCCESS,
        userPosts: data.posts,
        numberOfPostFetched: data.numberOfPostToFetch
    };
}
export const fetchUserPostsEmpty = (data) => {
    return {
        type: actionTypes.FETCH_USER_POSTS_EMPTY
    };
}

export const fetchUserPosts = (token, body) => {
    return dispatch => {
        dispatch(fetchUserPostsStart());

        let url = 'api/userData/getUserPosts';
        axios.post(url, body, {'headers': { 'token': token}})
            .then(response => {
                if(response.data.posts.length !== 0){
                    dispatch(fetchUserPostsSuccess(response.data));
                }else{
                    dispatch(fetchUserPostsEmpty());
                }
                
            })
            .catch(error => {
                dispatch(fetchUserPostsFail(error));
            })
    }
}

export const toggleFollowUserStart = () => {
    return {
        type: actionTypes.TOGGLE_FOLLOW_USER_START,
    };
}
export const toggleFollowUserFail = (error) => {
    return {
        type: actionTypes.TOGGLE_FOLLOW_USER_FAIL,
        error: error
    };
}

export const toggleFollowUserSuccess = (data) => {
    return {
        type: actionTypes.TOGGLE_FOLLOW_USER_SUCCESS,
        followersArr: data.followersArr
    };
}

export const toggleFollowUser = (token, data) => {
    return dispatch => {
        dispatch(toggleFollowUserStart());

        let url = '/api/userData/toggleFollowUser'

        axios.post(url, data ,{'headers': { 'token': token}})
            .then(response => {
                dispatch(toggleFollowUserSuccess(response.data));
            })
            .catch(error => {
                dispatch(toggleFollowUserFail(error));
            })
    }
}

export const searchUsersStart = () => {
    return {
        type: actionTypes.SEARCH_USERS_START,
    };
}
export const searchUsersFail = (error) => {
    return {
        type: actionTypes.SEARCH_USERS_FAIL,
        error: error
    };
}
export const searchUsersSuccess = (data) => {
    
    return {
        type: actionTypes.SEARCH_USERS_SUCCESS,
        usersList: data,
    };
}
export const searchUsersEmpty = () => {
    
    return {
        type: actionTypes.SEARCH_USERS_EMPTY,
    };
}

export const searchUsers = (token, input, userId) => {
    return dispatch => {
        dispatch(searchUsersStart());
        if(input === ''){
            return dispatch(searchUsersEmpty());
        }
        let url = '/api/public/search'
        let body = {
            'searchInput': input,
            'userId': userId
        }
        axios.post(url, body ,{'headers': { 'token': token}})
            .then(response => {
                dispatch(searchUsersSuccess(response.data));
            })
            .catch(error => {
                dispatch(searchUsersFail(error));
            })
    }
}

export const resetUserFeed = () => {
    return {
        type: actionTypes.RESET_USER_FEED
    };
}