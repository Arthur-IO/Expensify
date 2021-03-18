import { v4 as uuidv4 } from 'uuid'
import database from '../firebase/firebase'

// Expenses Action Objects that get dispatched to the redux store

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

export const startAddExpense = (expenseData = {}) => {

    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }

        return database
            .ref('expenses')
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }))
            }).catch(e => console.log(e))
    }
}

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense({ id }))
            }).catch(e => console.log(e))
    }
}

// EDIT_EXPENSE
export const editExpense =  (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editExpense(id, updates))
            }).catch(e => console.log(e))
    }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch) => {

        return database
            .ref('expenses')
            .once('value')
            .then(snapshot => {
                const expenses = []
                snapshot.forEach(expenseSnapshot => {
                    expenses.push({
                        id: expenseSnapshot.key,
                        ...expenseSnapshot.val()
                    })
                })
                return expenses
            }).then(expenses => {
                dispatch(setExpenses(expenses))
        }).catch(e => console.log(e))
    }
}