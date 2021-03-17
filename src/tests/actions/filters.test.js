import moment from "moment";
import {setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate} from "../../actions/filters";

test('should setup set text filter action object with provided text', () => {
    const action = setTextFilter('Water Bill')
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Water Bill'
    })
})

test('should setup set text filter action object with no text', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should setup sort by date action object', () => {
    const action = sortByDate()
    expect(action).toEqual({
        type: 'SORT_BY',
        sortType: 'date'
    })
})

test('should setup sort by amount action object', () => {
    const action = sortByAmount()
    expect(action).toEqual({
        type: 'SORT_BY',
        sortType: 'amount'
    })
})

test('should setup start date filter action object', () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
})

test('should setup end date filter action object', () => {
    const action = setEndDate(moment(0))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
})