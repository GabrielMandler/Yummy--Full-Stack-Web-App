import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    feedPosts: [],
    loading: false,
    fetched: false,
    numberOfPostFetched: 0,
    message: null,
    currentPosts: [],
    doneFetch: false
}

const resetFeed = (state, action) => {
    return updateObject(state, {
        feedPosts: [],
        loading: false,
        fetched: false,
        numberOfPostFetched: 0,
        message: null,
        currentPosts: [],
        doneFetch: false
    })
}
const fetchPostsStart= ( state, action ) => {
    return updateObject(state, {
        loading: true,
        fetched: true
    })
}
const fetchPostsFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const fetchPostsSuccess = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        feedPosts: action.posts,
        fetched: false,
        numberOfPostFetched: state.numberOfPostFetched + action.postFetched
    })
    
}
const fetchPostsEmpty = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        message: "There are no more posts :(",
        doneFetch: true
    }) 
}
const toggleLikeStart= ( state, action ) => {
    return updateObject(state, {
        loading: true
    })
}
const toggleLikeFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const toggleLikeSuccess = ( state, action ) => {

    let updatedPosts = state.feedPosts;
    let post = updatedPosts[action.index];
    post.likes = action.post.likes;
    post.usersWhoLiked = action.post.usersWhoLiked;
    
    return updateObject(state, {
        loading: false,
        feedPosts: updatedPosts
    })
}
const fetchFromFeed = ( state, action ) => {
    return updateObject(state, {
        fetched: false
    })
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart( state, action );
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail( state, action )
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess( state, action );
        case actionTypes.FETCH_POSTS_EMPTY: return fetchPostsEmpty( state, action );

        case actionTypes.TOGGLE_LIKE_START: return toggleLikeStart( state, action );
        case actionTypes.TOGGLE_LIKE_FAIL: return toggleLikeFail( state, action )
        case actionTypes.TOGGLE_LIKE_SUCCESS: return toggleLikeSuccess( state, action );

        case actionTypes.FETCH_FROM_FEED: return fetchFromFeed( state, action );
        
        case actionTypes.RESET_FEED: return resetFeed( state, action );
        
        default: return state;
    }
};

export default reducer;