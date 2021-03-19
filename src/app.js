import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import AppRouter, {history} from "./routers/AppRouter";
import configureStore from './store/configureStore'
import {startSetExpenses} from "./actions/expenses";
import {login, logout} from "./actions/auth";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'
import {firebase} from "./firebase/firebase";

// Adds the redux store to the application
const store = configureStore();

// The root of the application
const jsx = (
    <div>
        {/*Provider provides the redux-store to the entire application*/}
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    </div>
)

let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpenses()).then(() => {
            renderApp()
            if (history.location.pathname === '/') {
                history.push('/dashboard')
            }
        })
    } else {
        store.dispatch(logout())
        renderApp()
        history.push('/')
    }
})