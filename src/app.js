import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AppRouter from "./routers/AppRouter";
import configureStore from './store/configureStore'
import {addExpense, startSetExpenses} from "./actions/expenses";
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'
import './firebase/firebase'

// Adds the redux store to the application
const store = configureStore();

// The root of the application
const jsx = (
    <div>
        {/*Provider provides the redux-store to the entire application*/}
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});
