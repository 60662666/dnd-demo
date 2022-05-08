import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Home } from './../pages/home';
import { Detail } from './../pages/detail';
import DropOrMoveJS from './../pages/DropOrMoveJS'
// import { DropOrMoveTS } from './../pages/DorpOrMoveTS'
import OriginReduxCounter from './../pages/originReduxCounter'

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/detail' component={Detail} />
            <Route exact path='/dropandmovejs' component={DropOrMoveJS} />
            {/* <Route exact path='/dropandmovets' component={DropOrMoveTS} /> */}
            <Route exact path='/couter' component={OriginReduxCounter} />
        </Switch>
    </HashRouter>
)
export default Router;