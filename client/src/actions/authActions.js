import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { sessionService } from 'redux-react-session';

import { SET_CURRENT_USER } from './actiontypes'

function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post('http://localhost:4000/auth', data).then(res => {
      const token = res.data.token;
      sessionService.saveSession({ token }).then(
        () => {
          sessionService.saveUser(jwtDecode(token))
          dispatch(setCurrentUser(jwtDecode(token)))
        }
      )
    });
  }
}

export function logout() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      sessionService.deleteSession()
      sessionService.deleteUser()
      dispatch(setCurrentUser({}))
      resolve(null)
    }
    )
  }
}