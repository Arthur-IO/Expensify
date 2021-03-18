import React from "react";
import {shallow} from 'enzyme'
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

const expense = expenses[0]

let startEditExpense, startRemoveExpense, history, wrapper

beforeEach(() => {
    startEditExpense = jest.fn()
    startRemoveExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage
            history={history}
            expense={expenses[0]}
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
        />
    )
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense)
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense)
})

test('should handle onClick', () => {
    wrapper.find('button').at(0).simulate('click', {})
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(startRemoveExpense).toHaveBeenCalledWith({ id: expense.id })
})