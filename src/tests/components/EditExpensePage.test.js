import React from "react";
import {shallow} from 'enzyme'
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

const expense = expenses[0]

let editExpense, removeExpense, history, wrapper

beforeEach(() => {
    editExpense = jest.fn()
    removeExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditExpensePage
            history={history}
            expense={expenses[0]}
            editExpense={editExpense}
            removeExpense={removeExpense}
        />
    )
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense)
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense)
})

test('should handle onClick', () => {
    wrapper.find('button').at(0).simulate('click', {})
    expect(history.push).toHaveBeenLastCalledWith('/')
    expect(removeExpense).toHaveBeenCalledWith({ id: expense.id })
})