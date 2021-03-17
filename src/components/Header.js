import React from 'react';
import { NavLink } from 'react-router-dom';

// Renders the 'Header' component to the head of the DOM on every page.

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>

  </header>
);

export default Header;
