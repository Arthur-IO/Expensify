import React from 'react';
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";

// The home-page for this application

const ExpenseDashboardPage = () => (
  <div>
      <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
