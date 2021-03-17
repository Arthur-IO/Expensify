// Filters Action Objects that get dispatched to the redux store

export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER', // type is a required property
    text
})

export const sortByDate = () => ({
    type: 'SORT_BY',
    sortType: 'date'
})

export const sortByAmount = () => ({
    type: 'SORT_BY',
    sortType: 'amount'
})

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})