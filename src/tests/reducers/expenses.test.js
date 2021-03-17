import moment from "moment";
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

const expensesDefaultReducer = []

test('should have default state value', () => {
    const state = expensesReducer(expensesDefaultReducer, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should add expense to expenses', () => {
    const state = expensesReducer(expensesReducer, {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'Water bill',
            note: '',
            amount: 15000,
            createdAt: moment()
        }
    })
    expect(state).toEqual([
        {
            description: 'Water bill',
            note: '',
            amount: 15000,
            createdAt: moment()
        }
    ])
})

test('should remove expense from expenses if an id is found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 13471
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0] ])
})

test('should not remove an expense from expenses if an id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should edit an expense within expenses if an id is found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 13471,
        updates: {
            description: 'Modelo Beer'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([
        expenses[0],
        {
            id: 13471,
            description: 'Modelo Beer',
            amount: 1000,
            note: 'Modelo',
            createdAt: 15
        }
    ])
})

test('should not edit an expense if an id is not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            description: 'Nada'
        }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})