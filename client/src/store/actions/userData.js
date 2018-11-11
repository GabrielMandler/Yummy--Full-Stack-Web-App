import * as actionTypes from './actionTypes';
import axios from 'axios';
import FormData from 'form-data'

export const newPostSuccess = (postData) => {
    return{
        type: actionTypes.ADD_NEW_POST_SUCCESS,
        data: postData
    }
}

export const newPostFail = (error) => {
    return{
        type: actionTypes.ADD_NEW_POST_FAIL,
        error: error
    }
}

export const newPostStart = () => {
    return {
        type: actionTypes.ADD_NEW_POST_START
    };
};

export const addNewPost = (data, token) => {
    let newPostData = new FormData();
    newPostData.set('userId', data.userId);
    newPostData.set('username', data.username);
    newPostData.set('description', data.description);
    newPostData.append('image', data.image, data.image.fileName);
    
    return dispatch => {    
        dispatch(newPostStart());
        const url = 'api/userData/addNewPost'

        axios.post(url, newPostData, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'token': token
                }
            })
            .then(response => {
                
                dispatch(newPostSuccess(response.data));
            })
            .catch(error => {
                dispatch(newPostFail(error));
            })
    }
}

export const editUserDataStart = () => {
    return {
        type: actionTypes.EDIT_USER_DATA_START,
    };
}

export const editUserDataFail = (error) => {
    return {
        type: actionTypes.EDIT_USER_DATA_FAIL,
        error: error
    };
}

export const editUserDataSuccess = (data, isEditAfterRegistration) => {
    return {
        type: actionTypes.EDIT_USER_DATA_SUCCESS,
        userData: data,
        isEditAfterRegistration: isEditAfterRegistration
    };
}
export const completeRegistration = () =>{
    localStorage.setItem('completedRegistration', true);
    return {
        type: actionTypes.COMPLETED_REGISTRATION
    };
}
export const editUserData = (data, token, isEditAfterRegistration) => {
    let newPostData = new FormData();
    newPostData.set('userId', data.userId);
    newPostData.set('username', data.username);
    newPostData.set('bio', data.bio);
    if(!isEditAfterRegistration){
        newPostData.set('gender', data.gender);
    }
    newPostData.set('isEditAfterRegistration', isEditAfterRegistration);
    if(data.profileImage !== null){
        newPostData.append('profileImage', data.profileImage, data.profileImage.fileName);
    }else{
        newPostData.append('profileImage', null);
    }
    
    return dispatch => { 
        dispatch(editUserDataStart());
        const url = 'api/userData/editProfile'

        axios.post(url, newPostData, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'token': token
                }
            })
            .then(response => {
                if(isEditAfterRegistration){
                    dispatch(completeRegistration());
                }
                
                dispatch(editUserDataSuccess(response.data, isEditAfterRegistration));
            })
            .catch(error => {
                
                dispatch(editUserDataFail(error));
            })
    }
}



export const resetRedirect = (path) => {
    return {
        type: actionTypes.RESET_REDIRECT,
        path: path
    };
};