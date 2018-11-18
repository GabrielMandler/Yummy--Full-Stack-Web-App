import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    userPosts: [],
    username: null,
    bio: null,
    gender: null ,
    profileImage: null,
    followersArr: [],
    loading: false,
    fetched: false,
    isMainUser: false,

    usersList: [],
    isInputSearchEmpty: true,

    numberOfPostFetched: 0,
    message: null,
    currentPosts: [],
    doneFetch: false
}
const resetUserFeed = (state, action) => {
    return updateObject(state, {
        userId: null,
        userPosts: [],
        username: null,
        bio: null,
        profileImage: null,
        loading: false,
        fetched: false,
        numberOfPostFetched: 0,
        message: null,
        currentPosts: [],
        doneFetch: false,
        isInputSearchEmpty: true
    })
}
const isMainUser = (state, action) => {
    return updateObject(state, {
        isMainUser: action.isMainUser
    })
}
const fetchUserDataStart= ( state, action ) => {
    return updateObject(state, {
        loading: true
    })
}
const fetchUserDataFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const fetchUserDataSuccess = ( state, action ) => {
    return updateObject(state, {
        userId: action.userId,
        username: action.userData.username,
        bio: action.userData.bio,
        gender: action.userData.gender,
        profileImage: action.userData.profileImage,
        followersArr: action.userData.followersArr,
        loading: false,
        fetched: true
    })
}


const fetchUserPostsStart= ( state, action ) => {
    return updateObject(state, {
        loading: true,
        fetched: true
    })
}
const fetchUserPostsFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const fetchUserPostsSuccess = ( state, action ) => {
    return updateObject(state, {
        userPosts: action.userPosts,
        numberOfPostFetched: state.numberOfPostFetched + action.numberOfPostFetched,
        loading: false,
        fetched: false,
    })
}
const fetchUserPostsEmpty = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        message: "There are no more posts :(",
        doneFetch: true
    }) 
}

const toggleFollowUserStart = ( state, action ) => {
    return updateObject(state, {
        loading: true
    })
}
const toggleFollowUserFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const toggleFollowUserSuccess = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        followersArr: action.followersArr
    })
}

const searchUsersStart= ( state, action ) => {
    return updateObject(state, {
        loading: true
    })
}
const searchUsersFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const searchUsersSuccess = ( state, action ) => {
    return updateObject(state, {
        usersList: action.usersList,
        isInputSearchEmpty: false,
        loading: false,
    })
}
const searchUsersEmpty = ( state, action ) => {
    return updateObject(state, {
        usersList: [],
        isInputSearchEmpty: true,
        loading: false,
    })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_IS_MAIN_USER: return isMainUser( state, action );

        case actionTypes.FETCH_USER_DATA_START: return fetchUserDataStart( state, action );
        case actionTypes.FETCH_USER_DATA_FAIL: return fetchUserDataFail( state, action )
        case actionTypes.FETCH_USER_DATA_SUCCESS: return fetchUserDataSuccess( state, action );
        
        case actionTypes.FETCH_USER_POSTS_START: return fetchUserPostsStart( state, action );
        case actionTypes.FETCH_USER_POSTS_FAIL: return fetchUserPostsFail( state, action )
        case actionTypes.FETCH_USER_POSTS_SUCCESS: return fetchUserPostsSuccess( state, action );
        case actionTypes.FETCH_USER_POSTS_EMPTY: return fetchUserPostsEmpty( state, action );

        case actionTypes.TOGGLE_FOLLOW_USER_START: return toggleFollowUserStart( state, action );
        case actionTypes.TOGGLE_FOLLOW_USER_FAIL: return toggleFollowUserFail( state, action )
        case actionTypes.TOGGLE_FOLLOW_USER_SUCCESS: return toggleFollowUserSuccess( state, action );

        case actionTypes.SEARCH_USERS_START: return searchUsersStart( state, action );
        case actionTypes.SEARCH_USERS_FAIL: return searchUsersFail( state, action )
        case actionTypes.SEARCH_USERS_SUCCESS: return searchUsersSuccess( state, action );
        case actionTypes.SEARCH_USERS_EMPTY: return searchUsersEmpty( state, action );
        
        case actionTypes.RESET_USER_FEED: return resetUserFeed( state, action );

        default: return state;
    }
};

export default reducer;