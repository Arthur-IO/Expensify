import {combineReducers, createStore} from "redux";
import { v4 as uuidv4 } from 'uuid'

const addExpense = (
    {
        description = '',
        note = '',
        amount = '',
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
})

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense =  (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// Expenses reducer
const expensesReduerDefaultState = []

const expensesReducer = (state = expensesReduerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // Add item using spread operators
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state
    }
}

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByDate = () => ({
    type: 'SORT_BY',
    sortType: 'date'
})

const sortByAmount = () => ({
    type: 'SORT_BY',
    sortType: 'amount'
})

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.sortType
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

// Get visible expenses
const getVisibleExpenses = (expenses, filters) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof filters.startDate !== 'number' || expense.createdAt >= filters.startDate
        const endDateMatch = typeof filters.endDate !== 'number' || expense.createdAt <= filters.endDate
        const textMatch = expense.description.toLowerCase().includes(filters.text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (filters.sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(filters.sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(state)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({
    description: 'This months bill',
    note: '$5,000 to March bill',
    amount: 500000,
    createdAt: 0
}))

const expenseTwo = store.dispatch(addExpense({
    description: 'bill',
    note: '$10,000 to March bill',
    amount: 1000000,
    createdAt: 16
}))

store.dispatch(sortByAmount())

/*
store.dispatch(editExpense(expenseOne.expense.id, { amount: 500 }))

store.dispatch(setTextFilter({ text: 'test' }))
store.dispatch(setTextFilter())

store.dispatch(sortByDate())
store.dispatch(sortByAmount())

store.dispatch(setStartDate(125))
store.dispatch(setEndDate(300))*/
