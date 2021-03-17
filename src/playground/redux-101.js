import { createStore } from "redux";

/*
    Action Generators are functions that return action objects
 */

const incrementCount = ({ incrementBy = 1 }) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 }) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({ count = 0 }) => ({
    type: 'SET',
    count
})

/*
    Reducers:
        1. Reducers are Pure functions
        2. Never change state or action

 */
const countReducer = (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state
    }
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

// Decr count
store.dispatch(decrementCount({ decrementBy: 5 }))

// Set count
store.dispatch(setCount({ count: 10 }))

// Increment count
store.dispatch(incrementCount({ incrementBy: 1 }))

// Reset
store.dispatch(resetCount())