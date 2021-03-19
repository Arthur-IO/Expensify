import React from 'react';
import {connect} from 'react-redux'

import ExpenseForm from "./ExpenseForm";
import {startAddExpense} from "../actions/expenses";

// Adds an expense to the expenses list

export class AddExpensePage extends React.Component {

    onSubmit = (expense) => {
        // Dispatches an event to the redux store
        this.props.startAddExpense(expense)

        // Redirects the user back to the home-page
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className={"page-header"}>
                    <div className={"content-container"}>
                        <h1 className={"page-header__title"}>Add Expense</h1>
                    </div>
                </div>
                <div className={"content-container"}>
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        )
    }

}

// Maps dispatch to the properties of this component
const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

// Connects this component to the redux store with no props
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
