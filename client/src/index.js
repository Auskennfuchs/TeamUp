import React from 'react';
import ReactDOM from 'react-dom'
import 'reset-css/reset.css'
import 'normalize.css'
import './index.css';

import App from './App'

import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
//import { persistStore, autoRehydrate } from 'redux-persist'
import { createSession } from 'redux-session'
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

const session = createSession({
    ns: 'teamup',
    onLoad(storedState, dispatch) {
        dispatch({ type: 'HYDRATE_STATE', storedState })
    },
    clearStorage(action) {
        return action.type === 'DROP_SESSION_DATA'
    }
})
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(session),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
)

store.dispatch({type:'DROP_SESSION_DATA'})

//persistStore(store, {}, () => {
ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'));
    registerServiceWorker()
//})
