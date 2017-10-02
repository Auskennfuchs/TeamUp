import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { SET_CURRENT_USER } from './actiontypes'

function setCurrentUser(user) {
  console.log(user)
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function login(data) {
  return dispatch => {
    return axios.post('http://localhost:4000/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      //        setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

/*export function logout(data) {
  return dispatch => {
    localStorage.setItem('jwtToken', null)
  }
}*/