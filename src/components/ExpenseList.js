import React from "react";
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from '../selectors/expenses'

// A list of expense items

export const ExpenseList = (props) => (
    <div className={"content-container"}>
        <div className={"list-header"}>
            <div className={"show-for-mobile"}>Expenses</div>
            <div className={"show-for-desktop"}>Expense</div>
            <div className={"show-for-desktop"}>Amount</div>
        </div>
        <div className={"list-body"}>
            {
                // Display 'no expenses' message when there are no expenses
                props.expenses.length === 0 ? (
                    <div className={"list-item list-item--message"}>
                        <span>No expenses</span>
                    </div>
                ) : (
                    // The individual expense list items rendered
                    props.expenses.map(expense => {
                        return <ExpenseListItem key={expense.id} {...expense} />
                    })
                )
            }
        </div>
    </div>
)

// Maps redux state to the props of this component
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

// Connects this component to the redux store and passes in redux state to the component props
export default connect(mapStateToProps)(ExpenseList)