import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login, Home, Register, Profile, Users } from './views'

import App from './App'

export default (
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/register" component={Register} />
                <Route path="/users" component={Users} />                
            </Switch>
        </App>
    </BrowserRouter>
)