import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START,
    };
}

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    };
}

export const fetchPostsSuccess = (data) => {

    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: data.posts,
        postFetched: data.numberOfPostToFetch
    };
}
export const fetchPostsEmpty = (data) => {

    return {
        type: actionTypes.FETCH_POSTS_EMPTY
    };
}

export const fetchPosts = (token, data) => {
    return dispatch => {
        dispatch(fetchPostsStart());
        let url = 'api/public/getFeedPosts';
        
        axios.post(url, data, {'headers': { 'token': token}})
            .then(response => {
                if(response.data.posts.length !== 0){
                    dispatch(fetchPostsSuccess(response.data));
                }else{
                    dispatch(fetchPostsEmpty());
                }
                
            })
            .catch(error => {
                dispatch(fetchPostsFail(error));
            })
    }
}

export const toggleLikeStart = () => {
    return {
        type: actionTypes.TOGGLE_LIKE_START,
    };
}

export const toggleLikeFail = (error) => {
    return {
        type: actionTypes.TOGGLE_LIKE_FAIL,
        error: error
    };
}

export const toggleLikeSuccess = (data, index) => {
    
    return {
        type: actionTypes.TOGGLE_LIKE_SUCCESS,
        post: data,
        index: index
    };
}

export const toggleLike = (token, index, data, ) => {
    return dispatch => {
        dispatch(toggleLikeStart());
        let url = 'api/public/toggleLike';
        axios.post(url, data, {'headers': { 'token': token}})
            .then(response => {
                
                dispatch(toggleLikeSuccess(response.data, index));
            })
            .catch(error => {
                dispatch(toggleLikeFail(error));
            })
    }
}

export const resetFeed = () => {
    return {
        type: actionTypes.RESET_FEED
    };
}