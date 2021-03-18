import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startAddExpense, startEditExpense, startRemoveExpense,
    startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const middlewares = [thunk]
const createMockStore = configureMockStore(middlewares)

beforeEach((done) => {
    const expensesData = {}

    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}
    })
    database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'})
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

test('should edit expense in database and store', done => {
    const store = createMockStore({})

    const id = expenses[0].id

    const updates = {
        description: 'Oreo cookies',
        note: 'Mmm... they were yummy.'
    }

    store
        .dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            })
            return database.ref(`expenses/${id}`).once('value')
        }).then(snapshot => {
            expect(snapshot.val().description).toBe(updates.description)
            expect(snapshot.val().note).toBe(updates.note)
            done()
    })
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[0])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Gaming mouse',
        createdAt: 1000
    }

    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({})

    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }

    store
        .dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...defaultData
                }
            })
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData)
        done()
    })
})

test('should setup SET_EXPENSE action object', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should set expenses to database and store', (done) => {
    const store = createMockStore({})

    store
        .dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
        })
        done()
    })
})

test('should remove expense from database and store', (done) => {
    const store = createMockStore({})

    const id = expenses[0].id

    store
        .dispatch(startRemoveExpense({ id }))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            })
            return database.ref(`expenses/${id}`).once('value')
        }).then(snapshot => {
            expect(snapshot.val()).toBeFalsy()
            done()
    })

})