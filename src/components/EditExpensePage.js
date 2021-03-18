import React from 'react';
import {connect} from 'react-redux'
import ExpenseForm from "./ExpenseForm";
import {startEditExpense, startRemoveExpense} from "../actions/expenses";

// A page where the user can edit a specific expense in their expense list

export class EditExpensePage extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense)
        this.props.history.push("/")
    }

    onClick = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id })
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onClick}>
                    Remove
                </button>
            </div>
        )
    }

}

// Maps the redux state to the props of the individual component
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id)
    }
}

// Maps the dispatch function to the properties of this component
const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
    startRemoveExpense: ({ id }) => dispatch(startRemoveExpense({ id }))
})

// Connects this component to the redux store with the redux state passed in as props
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
