import React from "react";
import {shallow} from "enzyme";
import {ExpenseList} from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";
import getExpensesTotal from '../../selectors/expenses-total'
import {ExpenseListFilters} from "../../components/ExpenseListFilters";

test('should render ExpenseList with expenses', () => {
    const totalExpenses = getExpensesTotal(expenses)
    const wrapper = shallow(
        <ExpenseList
            expenses={expenses}
            totalExpenses={totalExpenses}
        />
    )
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseList with empty message', () => {
    const totalExpenses = getExpensesTotal(expenses)
    const wrapper = shallow(
        <ExpenseList
            expenses={expenses}
            totalExpenses={totalExpenses}
        />
    )
    expect(wrapper).toMatchSnapshot()
})