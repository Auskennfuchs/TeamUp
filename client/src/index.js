import React from 'react';
import ReactDOM from 'react-dom'
import 'reset-css/reset.css'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';

import registerServiceWorker from './registerServiceWorker'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

import routes from './routes';

const store = createStore(
    rootReducer,
    undefined,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
        autoRehydrate()
    )
)

sessionService.initSessionService(store)

persistStore(store, {}, () => {
    ReactDOM.render(
        <Provider store={store}>
            {routes}
        </Provider>,
        document.getElementById('root'));
    registerServiceWorker()
})
