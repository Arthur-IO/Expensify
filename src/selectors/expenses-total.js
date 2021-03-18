// Generates a total sum for an array of expenses

export default (expenses) => {
    return expenses
        .map(expense => expense.amount)
        .reduce((sum, curr) => sum + curr, 0)
}