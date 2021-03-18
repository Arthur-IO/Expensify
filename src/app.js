import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore'
import {addExpense} from "./actions/expenses";
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'

// Adds the redux store to the application
const store = configureStore();

console.log(1)

// The root of the application
const jsx = (
    <div>
        {/*Provider provides the redux-store to the entire application*/}
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('app'));
