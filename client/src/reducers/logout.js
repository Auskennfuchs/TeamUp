import isEmpty from 'lodash/isEmpty';
import { LOGOUT } from '../actions/actiontypes'

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGOUT:
            return initialState
        default: return state
    }
}