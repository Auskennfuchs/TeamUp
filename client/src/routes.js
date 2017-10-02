import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login, Home } from './views'


export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
    </Switch>
)