import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './../pages/home';
import { Detail } from './../pages/detail';

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/detail' component={Detail} />
        </Switch>
    </HashRouter>
)
export default Router;