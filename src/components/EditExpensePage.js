import React from 'react';
import {connect} from 'react-redux'
import ExpenseForm from "./ExpenseForm";
import {editExpense, removeExpense} from "../actions/expenses";

// A page where the user can edit a specific expense in their expense list

export class EditExpensePage extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense)
        this.props.history.push("/")
    }

    onClick = () => {
        this.props.removeExpense({ id: this.props.expense.id })
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
    editExpense: (id, updates) => dispatch(editExpense(id, updates)),
    removeExpense: ({ id }) => dispatch(removeExpense({ id }))
})

// Connects this component to the redux store with the redux state passed in as props
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
