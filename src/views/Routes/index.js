import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from "../../components/Constants/appRoutes";
import MenuBar from '../Menu';
import Login from '../Auth/login';
import Profile from '../Profile'

const AppRoutes = () => (
  <React.Fragment>
    <Switch>
      <Route path={routes.LOGIN} component={Login} />
      <Route path={routes.MENUBAR} component={MenuBar} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </React.Fragment>
);

export default AppRoutes;
