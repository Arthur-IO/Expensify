import React from "react";
import {shallow} from 'enzyme'
import expenses from '../fixtures/expenses'
import ExpenseForm from "../../components/ExpenseForm";
import moment from "moment";

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesForm with props', () => {
    const wrapper = shallow(
        <ExpenseForm
            expense={expenses[0]}
        />
    )
    expect(wrapper).toMatchSnapshot()
})

test('should render for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error')).toBe(true)
    expect(wrapper).toMatchSnapshot()
})

test('should test description on input change', () => {
    const value = 'new description'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', {
        target: {
            value
        }
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should test amount on valid input change', () => {
    const value = '15.99'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value
        }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should test amount on invalid input change', () => {
    const value = '123..1234'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value
        }
    })
    expect(wrapper.state('amount')).toBe('')
})

test('should test note area on text area change', () => {
    const value = 'new note'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').at(0).simulate('change', {
        target: {
            value
        }
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should call onsubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(
        <ExpenseForm
            expense={expenses[0]}
            onSubmit={onSubmitSpy}
        />
    )
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    })
    expect(wrapper.state('error')).toBe(false)
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
})

test('should test new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toBe(now)
})

test('should test calendarFocused on focused change', () => {
    const focused = true
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
    expect(wrapper.state('calendarFocused')).toBe(focused)
})