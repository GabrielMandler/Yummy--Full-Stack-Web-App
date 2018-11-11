import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    userPosts: [],
    username: null,
    bio: null,
    gender: null,
    profileImage: null,
    followingArr: [],

    loading: false,
    fetched: false,
    profileUpdated: false,
    newPostAdded: false,
    editProfileRedirectPath: null
}

const newPostStart= ( state, action ) => {
    return updateObject(state, {
        loading: true
    })
}
const newPostFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const newPostSuccess = ( state, action ) => {
    return updateObject(state, {
        loading: false,
        userPosts: state.userPosts.concat( action.data ),
        newPostAdded: true
    })
}

const editUserDataStart= ( state, action ) => {
    return updateObject(state, {
        loading: true
    })
}
const editUserDataFail = ( state, action ) => {
    return updateObject(state, {
        loading: false
    })
}
const editUserDataSuccess = ( state, action ) => {
    if(action.userData.profileImage !== null){
        updateObject(state, {
            profileImage: action.userData.profileImage
        })  
    }
    if(!action.isEditAfterRegistration){
        updateObject(state, {
            gender: action.userData.gender,
        })  
    }
    return updateObject(state, {
        username: action.userData.username,
        bio: action.userData.bio,
        loading: false,
        profileUpdated: true
    })
}

const fetchUserFollowingArr = (state, action) => {
    return updateObject(state, {
        loading: false,
        followingArr: action.followingArr
    })

    
}
const resetRedirect = (state, action) => {
    return updateObject(state, { editProfileRedirectPath: action.path, profileUpdated: false, newPostAdded: false })
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_NEW_POST_START: return newPostStart( state, action );
        case actionTypes.ADD_NEW_POST_SUCCESS: return newPostSuccess( state, action )
        case actionTypes.ADD_NEW_POST_FAIL: return newPostFail( state, action );

        case actionTypes.FETCH_USER_FOLLOWING_ARR: return fetchUserFollowingArr( state, action );
                        
        case actionTypes.EDIT_USER_DATA_START: return editUserDataStart( state, action );
        case actionTypes.EDIT_USER_DATA_FAIL: return editUserDataFail( state, action )
        case actionTypes.EDIT_USER_DATA_SUCCESS: return editUserDataSuccess( state, action );
        
        case actionTypes.RESET_REDIRECT: return resetRedirect( state, action );
        default: return state;
    }
};

export default reducer;