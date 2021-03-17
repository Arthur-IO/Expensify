import { v4 as uuidv4 } from 'uuid'

// Expenses Action Objects that get dispatched to the redux store

// ADD_EXPENSE
export const addExpense = (
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

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
export const editExpense =  (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})