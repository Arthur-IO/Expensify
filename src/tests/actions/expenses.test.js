import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense(12, {
        createdAt: 59,
        note: 'test note',
        description: 'a test edit'
    })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 12,
        updates: {
            createdAt: 59,
            note: 'test note',
            description: 'a test edit'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const expenseDate = {
        description: 'rent',
        amount: '109500',
        createdAt: '1000',
        note: 'this was last months rent'
    }
    const action = addExpense(expenseDate)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseDate,
            id: expect.any(String)
        }
    })
})

test('should setup add expense action object with no provided values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: '',
            createdAt: 0,
            id: expect.any(String)
        }
    })
})