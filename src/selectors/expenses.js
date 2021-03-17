import moment from "moment";
// Retrieves all the visible expenses after filters have been applied

export default (expenses, filters) => {
    return expenses.filter(expense => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = filters.startDate ? filters.startDate.isSameOrBefore(createdAtMoment, 'day') : true
        const endDateMatch = filters.endDate ? filters.endDate.isSameOrAfter(createdAtMoment, 'day') : true
        const textMatch = expense.description.toLowerCase().includes(filters.text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (filters.sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(filters.sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}