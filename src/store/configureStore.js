import { createStore, combineReducers } from 'redux'
import expensesReducer from '../reducers/expenses.js'
import filtersReducer from '../reducers/filters'

// Configures the redux store to be used within the application

export default () => {
    const store = createStore(
        // Combine Reducers combines many reducers together to form the store
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        // This enhancer line gives support to the react-redux developer tools in Google Chrome
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    return store
}