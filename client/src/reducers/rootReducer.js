import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

import auth from './auth';

export default combineReducers({
  session : sessionReducer,
  auth: auth
});