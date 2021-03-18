import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseSummary} from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";
import getExpensesTotal from '../../selectors/expenses-total'

test('should render ExpenseSummary correctly with no expenses', () => {
    const wrapper = shallow(
        <ExpenseSummary
            totalExpenses={[]}
            expensesTotal={0}
        />
    )
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseSummary correctly with expenses', () => {
    const expensesTotal = getExpensesTotal(expenses)
    const wrapper = shallow(
        <ExpenseSummary
            totalExpenses={expenses}
            expensesTotal={expensesTotal}
        />
    )
    expect(wrapper).toMatchSnapshot()
})