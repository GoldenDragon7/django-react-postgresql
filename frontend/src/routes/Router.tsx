import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "../components/Login/Login";
import PasswordUpdate from "../components/Login/PasswordUpdate";
import PasswordReset from "../components/Login/PasswordReset";
import PrivateRoute from './PrivateRoute'
import { AppProps } from "../App";
import { privateRoutes } from './Routes'

export default function Router(props: AppProps) {
  return (
    <Switch>
      <Route exact path="/login/"> <Login {...props} /></Route>
      <Route exact path="/password_reset/"> <PasswordReset /></Route>
      <PrivateRoute exact path="/change_password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props} /></PrivateRoute>
      {privateRoutes.map((route, index) =>
        <PrivateRoute
          key={index}
          exact
          path={route.pathname}
          isAuthenticated={props.isAuthenticated}>
          <route.component {...props} />
        </PrivateRoute>)
      }
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  )
};
