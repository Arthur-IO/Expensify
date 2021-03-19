import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import {createBrowserHistory} from 'history'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';
import LoginPage from "../components/LoginPage";
import PrivateRoute from './PrivateRoute'

export const history = createBrowserHistory()

// Adds page routers to the application

const AppRouter = () => (
  <Router history={history}>
    <div>
      {/*Allows the user to switch between certain routes*/}
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
