import {combineReducers} from 'redux';
import feedReducer from './store/reducers/feed';
import userDataReducer from './store/reducers/userData';
import usersDataReducer from './store/reducers/users';
import authReducer from './store/reducers/auth';
import * as actionTypes from './store/actions/actionTypes';

let appReducer = combineReducers({
    auth: authReducer,
    feed: feedReducer,
    userData: userDataReducer,
    users: usersDataReducer
});

let rootReducer = (state, action) => {
  if (action.type === actionTypes.AUTH_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;