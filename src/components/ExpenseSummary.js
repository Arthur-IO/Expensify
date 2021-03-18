import React from 'react'
import numeral from 'numeral'
import {connect} from 'react-redux'
import selectExpenses from '../selectors/expenses'
import getTotalExpenses from "../selectors/expenses-total";

export const ExpenseSummary = (props) => {
    const totalViewing = props.totalExpenses ? props.totalExpenses : 0
    const expensesWord = totalViewing === 1 ? 'expense' : 'expenses'
    const formattedPrice = numeral(props.expensesTotal / 100).format('$0,0.00')

    return (
        <div>
            <p>Viewing {totalViewing} {expensesWord} with a total of {formattedPrice}
            </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)

    return {
        totalExpenses: visibleExpenses.length,
        expensesTotal: getTotalExpenses(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary)