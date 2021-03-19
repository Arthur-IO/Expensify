import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses.js'
import filtersReducer from '../reducers/filters'
import authReducer from '../reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Configures the redux store to be used within the application
export default () => {
    const store = createStore(
        // Combine Reducers combines many reducers together to form the store
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}